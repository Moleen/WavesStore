$(document).ready(function(){
    $("#testi").owlCarousel();
  });


  $('#testi').owlCarousel({
    loop:false,
    margin:10,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
    
})
