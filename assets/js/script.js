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

    // sell trade page code starts here
    $(".sellFaqQuestionHeader").on("click", function(){
        $(this).find(".sellFaqIcon").toggleClass("rotateSellFaq")
        $(this).next(".sellFaqAnswer").slideToggle()
    })
    // sell trade page code ends here

    // lineup tab and navigation handling
    if ($('.lineUplistings').length && $('.lineUpModelContainer').length) {
        var $tabs = $('.lineUplistings .lineUpListingTab');
        var $slides = $('.lineUpModelContainer');
        var $prevButton = $('.lineUpModelPrevButton');
        var $nextButton = $('.lineUpModelNextButton');
        var currentSlide = 0;
        var slideCount = Math.min($tabs.length, $slides.length);
        var $slideWrapper = $slides.parent();

        function updateWrapperHeight(index) {
            var height = $slides.eq(index).outerHeight();
            $slideWrapper.height(height);
        }

        function updateLineupState(index) {
            if (slideCount === 0) {
                return;
            }

            if (index < 0) {
                index = slideCount - 1;
            } else if (index >= slideCount) {
                index = 0;
            }

            currentSlide = index;
            $tabs.removeClass('activeTab');
            $tabs.eq(index).addClass('activeTab');
            $slides.removeClass('activeSlide');
            $slides.eq(index).addClass('activeSlide');
            updateWrapperHeight(index);
        }

        $tabs.each(function(tabIndex) {
            $(this).attr('data-lineup-index', tabIndex)
        });

        $tabs.on('click', function(event) {
            event.preventDefault();
            var targetIndex = parseInt($(this).attr('data-lineup-index'), 10);
            if (!isNaN(targetIndex) && targetIndex < slideCount) {
                updateLineupState(targetIndex);
            }
        });

        $prevButton.on('click', function() {
            updateLineupState(currentSlide - 1);
        });

        $nextButton.on('click', function() {
            updateLineupState(currentSlide + 1);
        });

        $slides.css('position', 'absolute');
        $slideWrapper.css('position', 'relative');

        updateLineupState(0);
    }

    // brand page sticky CTA fallback
    if ($('.brandCtaBar').length) {
        var $brandCtaBar = $('.brandCtaBar');
        var $placeholder = $('<div class="brandCtaBarPlaceholder"></div>');
        $brandCtaBar.after($placeholder);
        var ticking = false;
        var initialTriggerPoint = null;

        function updateBrandCtaSticky() {
            var $header = $('.desktopHeader:visible, .mobileHeader:visible').first();
            var headerHeight = $header.length ? $header.outerHeight() : 0;

            if (initialTriggerPoint === null || !$brandCtaBar.hasClass('is-fixed')) {
                initialTriggerPoint = $brandCtaBar.offset().top;
            }

            var triggerPoint = initialTriggerPoint - headerHeight;

            if ($(window).scrollTop() >= triggerPoint) {
                $brandCtaBar.addClass('is-fixed');
                $placeholder.height($brandCtaBar.outerHeight());
            } else {
                $brandCtaBar.removeClass('is-fixed');
                $placeholder.height(0);
            }
            ticking = false;
        }

        updateBrandCtaSticky();
        $(window).on('scroll resize', function() {
            if (!ticking) {
                requestAnimationFrame(updateBrandCtaSticky);
                ticking = true;
            }
        });
    }
})