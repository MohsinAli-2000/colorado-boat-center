$(document).ready(function(){
    // pro shop page code starts here
    if ($('.proshopStripSlider').length) {
        $('.proshopStripSlider').owlCarousel({
            loop: true,
            margin: 80,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            center: true,
            responsive: {
                0: {
                    items: 1,
                    margin: 20
                },
                576: {
                    items: 1,
                    margin: 40
                },
                768: {
                    items: 1.2,
                    margin: 60
                },
                992: {
                    items: 1.3,
                    margin: 80
                }
            }
        });
    }
    // pro shop page code ends here
})