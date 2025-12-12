<script>
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  menu.classList.toggle('open');
  document.body.classList.toggle('no-scroll');
});
</script>

</body>
</html>
