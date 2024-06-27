/*!
 * Template Functions
*/

(function ($) {

    "use strict";

    let isMobileView = false;
    let isTop = true;
    let currentLogoKind = 1; // 0 = original, 1 = white

    /* ---------------------------------------------- /*
     * Preloader
    /* ---------------------------------------------- */

    if ($('div').is('.page-loader')) {
        $('.page-loader').delay(1500).fadeOut(800);
    }

    function chageLangSelect() {
        var langSelect = document.getElementById("id-lang");

        // select element에서 선택된 option의 value가 저장된다.  
        var selectValue = langSelect.options[langSelect.selectedIndex].value;

        // select element에서 선택된 option의 text가 저장된다.  
        var selectText = langSelect.options[langSelect.selectedIndex].text;
    }

    $(document).ready(function () {

        var header = $('.header'),
            one_page_nav = $('.onepage-nav'),
            parallax = $('.parallax'),
            bloggrid = $('.row-post-masonry'),
            background = $('[data-background]'),
            module_slides = $('.module-cover-slides'),
            margin_y = $('[data-mY]'),
            progress = $('.progress-item'),
            counter_timer = $('.counter-timer'),
            pie_chart = $('.chart'),
            twitter_feed = $('.twitter-feed'),
            stiky_sidebar = $('.sticky-sidebar'),
            map = $('.map'),
            smoothscroll = $('.smoothscroll'),
            play_btn = $('.play-button'),
            gallery = $('.gallery'),
            shop_gallery = $('.shop-single-item-popup'),
            portfolio_carousel = $('.portfolio-carousel'),
            shop_carousel = $('.shop-carousel'),
            clients_carousel = $('.clients-carousel'),
            review_slides = $('.review-slides'),
            review_carousel = $('.review-carousel'),
            image_slider = $('.image-slider'),
            contact_form = $('#contact-form');

        /* ---------------------------------------------- /*
         * Collapse navbar on click
        /* ---------------------------------------------- */

        $(document).on('click', '.inner-navigation.show', function (e) {
            if ($(e.target).is('span') && !$(e.target).parent().parent().hasClass('menu-item-has-children')) {
                $(this).collapse('hide');
            }
        });

        /* ---------------------------------------------- /*
         * One Page Nav
        /* ---------------------------------------------- */

        $('a', one_page_nav).filter(function () {
            if ($(this).is(':not([href^="#"])')) {
                $(this).addClass('external');
            }
        });

        one_page_nav.singlePageNav({
            filter: ':not(.external)',
            currentClass: 'active',
            offset: '58',
        });

        /* ---------------------------------------------- /*
         * Header animation
        /* ---------------------------------------------- */

        $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            if (scroll >= 5) {
                header.addClass('header-small');
                header.addClass('header-shadow');
            } else {
                header.removeClass('header-small');
                header.removeClass('header-shadow');
            }
        }).scroll();

        module_slides.each(function () {
            $(this).superslides($.extend({
                play: 10000,
                animation: 'slide',
                animation_speed: 800,
                pagination: true,
                scrollable: true,
            }, $(this).data('module-cover-slides-options')));
        });

        /* ---------------------------------------------- /*
         * Setting background of modules
        /* ---------------------------------------------- */

        parallax.each(function () {
            if ($(this).attr('data-gradient') == 1) {
                $(this).append('<div class="overlay-background overlay-gradient"></div>');
                $(this).find('.overlay-background').css('opacity', $(this).attr('data-overlay'));
            } else if ($(this).attr('data-overlay') > 0) {
                $(this).append('<div class="overlay-background"></div>');
                $(this).find('.overlay-background').css('opacity', $(this).attr('data-overlay'));
            }
        });

        background.each(function () {
            $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
        });

        margin_y.each(function () {
            $(this).css('margin-top', $(this).attr('data-mY'));
        });

        /* ---------------------------------------------- /*
         * Off-canvas
        /* ---------------------------------------------- */

        $('.off-canvas-open, .off-canvas-close').on('click', function () {
            $('body').toggleClass('off-canvas-sidebar-open');
            return false;
        }).resize();

        $(document).on('click', function (e) {
            var container = $('.off-canvas-sidebar');
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('body').removeClass('off-canvas-sidebar-open');
            }
        }).resize();

        function getScrollBarWidth() {
            var inner = document.createElement('p');
            inner.style.width = "100%";
            inner.style.height = "200px";
            var outer = document.createElement('div');
            outer.style.position = "absolute";
            outer.style.top = "0px";
            outer.style.left = "0px";
            outer.style.visibility = "hidden";
            outer.style.width = "200px";
            outer.style.height = "150px";
            outer.style.overflow = "hidden";
            outer.appendChild(inner);
            document.body.appendChild(outer);
            var w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            var w2 = inner.offsetWidth;
            if (w1 == w2) w2 = outer.clientWidth;
            document.body.removeChild(outer);
            return (w1 - w2);
        };

        $('.off-canvas-sidebar-wrapper').css('margin-right', '-' + getScrollBarWidth() + 'px');

        $(window).on('resize', function () {
            var width = Math.max($(window).width(), window.innerWidth);

            if (width <= 991) {
                isMobileView = true;
                $('body').removeClass('off-canvas-sidebar-open');

                if (currentLogoKind == 0) return;
                $('#top_logo').attr("src", "/assets/images/logo.png");
                currentLogoKind = 0;
            }
            else {
                isMobileView = false;

                if (isTop) {
                    if (currentLogoKind == 0) {
                        $('#top_logo').attr("src", "/assets/images/logo_white.png");
                        currentLogoKind = 1;
                    }
                }
            }
        });

        /* ---------------------------------------------- /*
         * Portfolio masonry
        /* ---------------------------------------------- */

        var filters = $('.filters'),
            worksgrid = $('.row-portfolio');

        $('a', filters).on('click', function () {
            var selector = $(this).attr('data-filter');
            $('.current', filters).removeClass('current');
            $(this).addClass('current');
            worksgrid.isotope({
                filter: selector
            });
            return false;
        });

        $(window).on('resize', function () {
            worksgrid.imagesLoaded(function () {
                worksgrid.isotope({
                    layoutMode: 'masonry',
                    itemSelector: '.portfolio-item',
                    transitionDuration: '0.4s',
                    masonry: {
                        columnWidth: '.grid-sizer',
                    },
                });
            });
        });

        /* ---------------------------------------------- /*
         * Blog masonry
        /* ---------------------------------------------- */

        $(window).on('resize', function () {
            setTimeout(function () {
                bloggrid.isotope({
                    layoutMode: 'masonry',
                    transitionDuration: '0.5s',
                });
            }, 1000);
        }).resize();

        /* ---------------------------------------------- /*
         * Carousel/Sliders
        /* ---------------------------------------------- */

        image_slider.each(function () {
            $(this).owlCarousel($.extend({
                dots: 1,
                nav: 1,
                center: 1,
                items: 1,
                loop: 1,
                autoHeight: 0,
                margin: 0,
                navText: [
                    '<span class="ti-arrow-left"></span>',
                    '<span class="ti-arrow-right"></span>'
                ],
            }, $(this).data('carousel-options')));
        });

        review_slides.each(function () {
            $(this).owlCarousel($.extend({
                autoplay: 5000,
                nav: 1,
                items: 1,
                loop: 1,
                navText: [
                    '<span class="ti-arrow-left"></span>',
                    '<span class="ti-arrow-right"></span>'
                ],
            }, $(this).data('carousel-options')));
        });

        review_carousel.each(function () {
            $(this).owlCarousel($.extend({
                nav: 0,
                dots: 1,
                autoplay: 1,
                items: 1,
                loop: 1,
                margin: 30,
                responsive: {
                    768: {
                        items: 2
                    },
                    1025: {
                        items: 3
                    }
                },
                navText: [
                    '<span class="ti-angle-left"></span>',
                    '<span class="ti-angle-right"></span>'
                ],
            }, $(this).data('carousel-options')));
        });

        clients_carousel.each(function () {
            $(this).owlCarousel($.extend({
                nav: 0,
                dots: 1,
                autoplay: 1,
                items: 2,
                loop: 1,
                responsive: {
                    768: {
                        items: 4
                    }
                },
                navText: [
                    '<span class="ti-arrow-left"></span>',
                    '<span class="ti-arrow-right"></span>'
                ],
            }, $(this).data('carousel-options')));
        });

        shop_carousel.each(function () {
            $(this).owlCarousel($.extend({
                nav: 0,
                dots: 1,
                autoplay: 1,
                items: 1,
                loop: 1,
                margin: 30,
                responsive: {
                    768: {
                        items: 2
                    },
                    1025: {
                        items: 4
                    }
                },
                navText: [
                    '<span class="ti-angle-left"></span>',
                    '<span class="ti-angle-right"></span>'
                ],
            }, $(this).data('carousel-options')));
        });

        portfolio_carousel.each(function () {
            $(this).owlCarousel($.extend({
                nav: 1,
                dots: 0,
                autoplay: 1,
                items: 1,
                loop: 1,
                margin: 30,
                responsive: {
                    768: {
                        items: 2
                    },
                    1025: {
                        items: 4
                    }
                },
                navText: [
                    '<span class="ti-angle-left"></span>',
                    '<span class="ti-angle-right"></span>'
                ],
            }, $(this).data('carousel-options')));
        });

        /* ---------------------------------------------- /*
         * Popup
        /* ---------------------------------------------- */

        play_btn.magnificPopup({
            type: 'iframe',
        });

        gallery.magnificPopup({
            type: 'image',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
            image: {
                titleSrc: 'title',
                tError: 'The image could not be loaded.',
            }
        });

        shop_gallery.magnificPopup({
            type: 'image',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
            image: {
                titleSrc: 'title',
                tError: 'The image could not be loaded.',
            }
        });

        /* ---------------------------------------------- /*
         * Progress bars, counters, pie charts animations
        /* ---------------------------------------------- */

        progress.each(function () {
            $(this).appear(function () {
                var percent = $(this).find('.progress-bar').attr('aria-valuenow');
                $(this).find('.progress-bar').animate({ 'width': percent + '%' });
                $(this).find('.progress-number').countTo({
                    from: 0,
                    to: percent,
                    speed: 900,
                    refreshInterval: 30
                });
            });
        });

        counter_timer.each(function () {
            $(this).appear(function () {
                var number = $(this).find('strong').attr('data-to');
                $(this).countTo({
                    from: 0,
                    to: number,
                    speed: 1500,
                    refreshInterval: 10,
                    formatter: function (number, options) {
                        number = number.toFixed(options.decimals);
                        number = number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        return number;
                    }
                });
            });
        });

        pie_chart.each(function () {
            $(this).appear(function () {
                $(this).easyPieChart($.extend({
                    barColor: '#000000',
                    trackColor: '#eeeeee',
                    scaleColor: false,
                    lineCap: 'round',
                    lineWidth: 3,
                    size: 150,
                }, $(this).data('chart-options')));
            });
        });

        /* ---------------------------------------------- /*
         * Twitter
        /* ---------------------------------------------- */

        twitter_feed.each(function (index) {
            $(this).attr('id', 'twitter-' + index);
            var twitterID = $(this).data('twitter');
            var twitterMax = $(this).data('number');
            var twitter_config = {
                'id': twitterID,
                'domId': 'twitter-' + index,
                'maxTweets': twitterMax,
                'enableLinks': true,
                'showPermalinks': false
            };
            twitterFetcher.fetch(twitter_config);
        });

        /* ---------------------------------------------- /*
         * Sticky Sidebar
        /* ---------------------------------------------- */

        stiky_sidebar.imagesLoaded(function () {
            stiky_sidebar.stick_in_parent({
                offset_top: 80,
                recalc_every: 1
            })
                .on('sticky_kit:bottom', function (e) {
                    $(this).parent().css('position', 'relative');
                })
                .on('sticky_kit:unbottom', function (e) {
                    $(this).parent().css('position', 'relative');
                }).scroll();
        });

        /* ---------------------------------------------- /*
         * Tooltip
        /* ---------------------------------------------- */

        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })

        /* ---------------------------------------------- /*
         * A jQuery plugin for fluid width video embeds
        /* ---------------------------------------------- */

        $('body').fitVids();

        /* ---------------------------------------------- /*
         * Contact form ajax
        /* ---------------------------------------------- */

        contact_form.find('input,textarea').jqBootstrapValidation({
            preventSubmit: true,
            submitError: function ($form, event, errors) {
                // additional error messages or events
            },
            submitSuccess: function ($form, event) {
                event.preventDefault();

                var submit = $('submit', contact_form);
                var ajaxResponse = $('#contact-response');
                var name = $('[name="name"]', contact_form).val();
                var email = $('[name="email"]', contact_form).val();
                var subject = $('[name="subject"]', contact_form).val();
                var message = $('[name="message"]', contact_form).val();

                $.ajax({
                    type: 'POST',
                    url: 'assets/php/contact.php',
                    dataType: 'json',
                    data: {
                        name: name,
                        email: email,
                        subject: subject,
                        message: message,
                    },
                    cache: false,
                    beforeSend: function (result) {
                        submit.empty();
                        submit.append('<i class="fa fa-cog fa-spin"></i> Wait...');
                    },
                    success: function (result) {
                        if (result.sendstatus == 1) {
                            ajaxResponse.html(result.message);
                            $form.fadeOut(500);
                        } else {
                            ajaxResponse.html(result.message);
                        }
                    }
                });
            }
        });

        /* ---------------------------------------------- /*
         * Google Map
        /* ---------------------------------------------- */

        map.each(function () {

            var reg_exp = /\[[^(\]\[)]*\]/g;

            var map_div = $(this);
            var is_draggable = Math.max($(window).width(), window.innerWidth) > 736 ? true : false;
            var is_street_view = (map_div.data('street-view')) ? true : false;

            if (map_div.length > 0) {

                var markers_addresses = map_div[0].getAttribute('data-addresses').match(reg_exp),
                    markers_info = map_div[0].getAttribute('data-info').match(reg_exp),
                    markers_icon = map_div.data('icon'),
                    map_zoom = map_div.data('zoom');

                var markers_values = [], map_center;

                markers_addresses.forEach(function (marker_address, index) {
                    var marker_value = '{'
                    marker_value += '"latLng":' + marker_address;
                    if (index == 0) {
                        map_center = JSON.parse(marker_address);
                    };
                    if (markers_info[index]) {
                        var marker_data = markers_info[index].replace(/\[|\]/g, '');
                        marker_value += ', "data":"' + marker_data + '"';
                    };
                    marker_value += '}';
                    markers_values.push(JSON.parse(marker_value));
                });

                var map_options = {
                    scrollwheel: false,
                    styles: [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }] }]
                };

                map_options.center = map_center;
                map_options.zoom = map_zoom;
                map_options.draggable = is_draggable;

                var markers_options = {
                    icon: markers_icon,
                };

                var map_config = {
                    map: {
                        options: map_options,
                    },
                    streetviewpanorama: {
                        options: {
                            container: $(this),
                            opts: {
                                visible: is_street_view,
                                position: map_center,
                                enableCloseButton: true,
                                scrollwheel: false,
                            }
                        }
                    },
                    marker: {
                        values: markers_values,
                        options: markers_options,
                        events: {
                            click: function (marker, event, context) {
                                if (context.data) {
                                    var map = $(this).gmap3("get"),
                                        infowindow = $(this).gmap3({ get: { name: "infowindow" } });
                                    if (infowindow) {
                                        infowindow.open(map, marker);
                                        infowindow.setContent(context.data);
                                    } else {
                                        $(this).gmap3({
                                            infowindow: {
                                                anchor: marker,
                                                options: { content: context.data }
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                };
                map_div.gmap3(map_config);
            };
        });

        /* ---------------------------------------------- /*
         * Scroll Animation
        /* ---------------------------------------------- */

        smoothscroll.on('click', function (e) {
            var target = this.hash;
            var $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 58
            }, 600, 'swing');
            e.preventDefault();
        });

        /* ---------------------------------------------- /*
         * Scroll top
        /* ---------------------------------------------- */

        $(window).scroll(function () {
            if ($(this).scrollTop() > 74) {
                isTop = false;
                $('.scroll-top').addClass('scroll-top-visible');

                if (currentLogoKind == 1) {
                    $('#top_logo').attr("src", "/assets/images/logo.png");
                    currentLogoKind = 0;
                }
            } else {
                isTop = true;
                $('.scroll-top').removeClass('scroll-top-visible');

                if (isMobileView) {
                    if (currentLogoKind == 1) {
                        $('#top_logo').attr("src", "/assets/images/logo.png");
                        currentLogoKind = 0;
                    }
                }
                else {
                    if (currentLogoKind == 0) {
                        $('#top_logo').attr("src", "/assets/images/logo_white.png");
                        currentLogoKind = 1;
                    }
                }
            }
        });

        $('a[href="#top"]').on('click', function () {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            return false;
        });

        /* ---------------------------------------------- /*
         * Parallax
        /* ---------------------------------------------- */

        parallax.jarallax({
            speed: 0.4,
        });

        class TextScramble {
            constructor(el) {
                this.el = el;
                this.chars = '!<>-_\\/[]{}—=+*^?#________';
                this.update = this.update.bind(this);
            }

            setText(newText) {
                const oldText = this.el.innerText;
                const length = Math.max(oldText.length, newText.length);
                const promise = new Promise((resolve) => this.resolve = resolve);
                this.queue = [];
                for (let i = 0; i < length; i++) {
                    const from = oldText[i] || '';
                    const to = newText[i] || '';
                    const start = Math.floor(Math.random() * 40);
                    const end = start + Math.floor(Math.random() * 40);
                    this.queue.push({ from, to, start, end });
                }
                cancelAnimationFrame(this.frameRequest);
                this.frame = 0;
                this.update();
                return promise;
            }

            update() {
                let output = ''
                let complete = 0
                for (let i = 0, n = this.queue.length; i < n; i++) {
                    let { from, to, start, end, char } = this.queue[i]
                    if (this.frame >= end) {
                        complete++
                        output += to
                    } else if (this.frame >= start) {
                        if (!char || Math.random() < 0.28) {
                            char = this.randomChar()
                            this.queue[i].char = char
                        }
                        output += `<span class="dud">${char}</span>`
                    } else {
                        output += from
                    }
                }
                this.el.innerHTML = output
                if (complete === this.queue.length) {
                    this.resolve()
                } else {
                    this.frameRequest = requestAnimationFrame(this.update)
                    this.frame++
                }
            }
            randomChar() {
                return this.chars[Math.floor(Math.random() * this.chars.length)]
            }
        }

        // ——————————————————————————————————————————————————
        // Example
        // ——————————————————————————————————————————————————


        function detectMob() {
            return !(Math.max($(window).width(), window.innerWidth) > 736);
        }

        /*
        if (detectMob()) {
            $("#ytbg2").attr("data-youtube", "https://www.youtube.com/watch?v=L6NgEkfEqHA");
            isMobileView = true;
            $('#top_logo').attr("src", "/assets/images/logo.png");
            currentLogoKind = 0;
        }
        */


        function setExtendAni() {
            let once_data_t = true;
            let once_drone_t = true;
            let once_comm_t = true;

            $(window).scroll(function () {
                let once_data_t = true;
                let once_drone_t = true;
                let once_comm_t = true;
                let oTop;

                if (once_data_t == true) {
                    oTop = $('#data_t').offset().top - window.innerHeight;
                    oTop += 500;

                    if ($(window).scrollTop() > oTop) {                    
                        once_data_t = false;
                        $("#collapse-2").collapse('show');
                    }
                }

                if (once_drone_t == true) {
                    oTop = $('#drone_t').offset().top - window.innerHeight;
                    oTop += 500;

                    if ($(window).scrollTop() > oTop) {                    
                        once_drone_t = false;
                        $("#collapse-1").collapse('show');
                    }
                }

                if (once_comm_t == true) {
                    oTop = $('#comm_t').offset().top - window.innerHeight;
                    oTop += 500;

                    if ($(window).scrollTop() > oTop) {                    
                        once_comm_t = false;
                        $("#collapse-3").collapse('show');
                    }
                }
            });
        }        

        $('[data-youtube]').youtube_background();
    });
})(jQuery);
