document.addEventListener('DOMContentLoaded', function () {
  new Splide('.splide', {
    type   : 'loop',
    drag   : 'free',
    focus  : 'center',
    perPage: 5,
    autoScroll: {
      speed: 2,
    },
    gap: 20,
    arrows: false, 
    pagination: false, 
  }).mount( window.splide.Extensions );
});