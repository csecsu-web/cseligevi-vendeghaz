<script type="module">
import { Renderer, Camera, Transform, Plane, Program, Texture } from './ogl.module.js';

const container = document.getElementById('circular-gallery');
const renderer = new Renderer({ alpha:true, antialias:true });
container.appendChild(renderer.gl.canvas);
const gl = renderer.gl;
gl.clearColor(0,0,0,0);

const camera = new Camera(gl, { fov:45 });
camera.position.z = 20;

const scene = new Transform();
const planeGeometry = new Plane(gl);

const items = [
  { image:"images/1.jpg", text:"Belső terek" },
  { image:"images/2.jpg", text:"Kültéri élmények" },
  { image:"images/3.jpg", text:"Wellness" },
  { image:"images/4.jpg", text:"Terasz" },
  { image:"images/5.jpg", text:"Kert" },
  { image:"images/6.jpg", text:"Panoráma" }
];

const planes = [];

function createTextTexture(text,color='#ffffff',font='bold 30px sans-serif'){
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = font;
  const width = Math.ceil(ctx.measureText(text).width)+20;
  const height = Math.ceil(parseInt(font)*1.2)+20;
  canvas.width = width;
  canvas.height = height;
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.clearRect(0,0,width,height);
  ctx.fillText(text,width/2,height/2);
  const texture = new Texture(gl,{generateMipmaps:false});
  texture.image = canvas;
  return {texture,width,height};
}

items.forEach((item,i)=>{
  // Kép
  const texture = new Texture(gl,{generateMipmaps:true});
  const img = new Image();
  img.src = item.image;
  img.onload = ()=> texture.image = img;

  const program = new Program(gl,{
    vertex:`
      attribute vec3 position;
      attribute vec2 uv;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      varying vec2 vUv;
      void main() { vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}
    `,
    fragment:`
      precision highp float;
      uniform sampler2D tMap;
      varying vec2 vUv;
      void main(){ vec4 c = texture2D(tMap,vUv); if(c.a<0.1) discard; gl_FragColor=c;}
    `,
    uniforms:{ tMap:{value:texture} },
    transparent:true
  });

  const mesh = new Plane(gl,{geometry: planeGeometry, program});
  mesh.setParent(scene);

  // Szöveg
  const {texture:textTex,width:w,height:h} = createTextTexture(item.text,'#ffffff','bold 24px sans-serif');
  const textProgram = new Program(gl,{
    vertex:`
      attribute vec3 position;
      attribute vec2 uv;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      varying vec2 vUv;
      void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}
    `,
    fragment:`
      precision highp float;
      uniform sampler2D tMap;
      varying vec2 vUv;
      void main(){ vec4 c=texture2D(tMap,vUv); if(c.a<0.1) discard; gl_FragColor=c;}
    `,
    uniforms:{ tMap:{value:textTex} },
    transparent:true
  });
  const textMesh = new Plane(gl,{geometry:planeGeometry,program:textProgram});
  textMesh.scale.set(w/200,h/200,1);
  textMesh.position.y = -1.2; // a kép alá
  textMesh.setParent(mesh);

  planes.push({mesh,textMesh});
});

// Scroll & drag
let scroll=0, isDown=false, startX=0, scrollPos=0;
container.addEventListener('mousedown', e=>{isDown=true; startX=e.clientX; scrollPos=scroll;});
container.addEventListener('mousemove', e=>{ if(!isDown) return; scroll = scrollPos + (e.clientX-startX)*0.02; });
container.addEventListener('mouseup', ()=>{isDown=false;});
container.addEventListener('mouseleave', ()=>{isDown=false;});
container.addEventListener('wheel', e=>{ scroll += e.deltaY*0.002; });

// Animate loop
function animate(){
  scroll += 0.002;
  planes.forEach((p,i)=>{
    const angle = ((i/items.length)*Math.PI*2) + scroll;
    p.mesh.position.x = Math.sin(angle)*10;
    p.mesh.position.z = Math.cos(angle)*10;
    p.mesh.rotation.y = angle;

    // Szöveg mindig a kamera felé
    p.textMesh.rotation.y = -angle;
  });
  renderer.render({scene,camera});
  requestAnimationFrame(animate);
}
animate();
</script>
