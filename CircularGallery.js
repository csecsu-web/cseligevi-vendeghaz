import { Renderer, Camera, Transform, Plane, Mesh, Program, Texture } from 'ogl';

// Lineáris interpoláció
function lerp(a, b, t) { return a + (b - a) * t; }

// Debounce függvény
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

class Media {
  constructor({ gl, scene, image, index, length, bend = 3, textColor = '#fff', borderRadius = 0.05, viewport }) {
    this.gl = gl;
    this.scene = scene;
    this.image = image;
    this.index = index;
    this.length = length;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.viewport = viewport;

    this.createTexture();
    this.createPlane();
  }

  createTexture() {
    this.texture = new Texture(this.gl, { generateMipmaps: true });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      this.texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createPlane() {
    const geometry = new Plane(this.gl);
    this.program = new Program(this.gl, {
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = sin(p.x * 4.0 + uTime) * 0.1;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        float roundedBoxSDF(vec2 p, vec2 b, float r){
          vec2 d = abs(p)-b;
          return length(max(d, vec2(0.0))) + min(max(d.x,d.y),0.0)-r;
        }
        void main(){
          vec2 uv = vUv;
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv-0.5, vec2(0.5-uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: this.texture },
        uBorderRadius: { value: this.borderRadius },
        uTime: { value: Math.random() * 1000 },
        uSpeed: { value: 0 }
      },
      transparent: true
    });

    this.plane = new Mesh(this.gl, { geometry, program: this.program });
    this.plane.setParent(this.scene);
  }

  update(scroll, direction) {
    const x = this.index * 2.5 - scroll.current;
    this.plane.position.x = x;
    const H = this.viewport.width / 2;
    const R = (H*H + this.bend*this.bend)/(2*this.bend);
    const effectiveX = Math.min(Math.abs(x), H);
    this.plane.position.y = -R + Math.sqrt(R*R - effectiveX*effectiveX);
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = scroll.current - scroll.last;
  }

  onResize(viewport) {
    this.viewport = viewport;
    // Increased scale factor (smaller divisor = larger images)
    const scale = viewport.height / 600; 
    this.plane.scale.set(scale * 2, scale * 1.5, 1);
  }
}

export default class CircularGallery {
  constructor({ container, items = [], bend = 3, textColor = '#fff', borderRadius = 0.05, scrollEase = 0.05 }) {
    this.container = container;
    this.items = items.length ? items : [
      { image: 'images/nappali.webp', text: 'Nappali' },
      { image: 'images/konyha.webp', text: 'Konyha' },
      { image: 'images/haloszoba.webp', text: 'Hálószoba' }
    ];
    this.scroll = { current: 0, target: 0, last: 0, ease: scrollEase };
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;

    this.init();
  }

  init() {
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio, 2) });
    this.gl = this.renderer.gl;
    this.container.appendChild(this.gl.canvas);

    this.camera = new Camera(this.gl);
    this.camera.position.z = 15;
    this.scene = new Transform();

    this.onResize();
    window.addEventListener('resize', () => this.onResize());

    this.medias = this.items.map((item, index) => new Media({
      gl: this.gl,
      scene: this.scene,
      image: item.image,
      index,
      length: this.items.length,
      bend: this.bend,
      textColor: this.textColor,
      borderRadius: this.borderRadius,
      viewport: this.viewport
    }));

    this.addListeners();
    this.update();
  }

  addListeners() {
    let isDown = false;
    let startX = 0;
    
    // Mouse events
    this.container.addEventListener('mousedown', e => { isDown = true; startX = e.clientX; });
    this.container.addEventListener('mousemove', e => {
      if(!isDown) return;
      const delta = startX - e.clientX;
      this.scroll.target += delta * 0.01;
      startX = e.clientX;
    });
    this.container.addEventListener('mouseup', () => isDown = false);
    this.container.addEventListener('mouseleave', () => isDown = false);
    
    // Touch events for mobile
    this.container.addEventListener('touchstart', e => { isDown = true; startX = e.touches[0].clientX; }, {passive: true});
    this.container.addEventListener('touchmove', e => {
      if(!isDown) return;
      const x = e.touches[0].clientX;
      const delta = startX - x;
      this.scroll.target += delta * 0.03; // Higher sensitivity for touch
      startX = x;
    }, {passive: true});
    this.container.addEventListener('touchend', () => isDown = false);

    this.container.addEventListener('wheel', e => this.scroll.target += e.deltaY * 0.01);
  }

  onResize() {
    this.viewport = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
    this.renderer.setSize(this.viewport.width, this.viewport.height);
    this.camera.perspective({ aspect: this.viewport.width / this.viewport.height });
    if(this.medias) this.medias.forEach(m => m.onResize(this.viewport));
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    this.medias.forEach(m => m.update(this.scroll, direction));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    requestAnimationFrame(() => this.update());
  }
}
