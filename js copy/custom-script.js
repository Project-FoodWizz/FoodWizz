/*--------------------- Copyright 2024 -----------------------
[Master Javascript]
Project: LensLux
Version: 1.0.0
-------------------------------------------------------------------*/
(function($) {
    "use strict";
    /*-----------------------------------------------------
    	Function  Start
    -----------------------------------------------------*/
    var control = {
        initialised: false,
        version: 1.0,
        init: function() {
            if (!this.initialised) {
                this.initialised = true;
            } else {
                return;
            }
            /*-----------------------------------------------------
            	Function Calling
            -----------------------------------------------------*/
            this.preLoader();
            this.navMenu();
            this.focusText();
            this.topButton();
            this.popupVideo();
            this.countDonw();
            this.thumbProduct();
            this.popupGallery();
            this.swiperSliders();
            this.shipAddress();
            this.paymentOption();
            this.productFilter();
            this.quantity();
            this.niceSlection();
        },

        /*-----------------------------------------------------
        	Fix PreLoader
        -----------------------------------------------------*/
        preLoader: function() {
            jQuery(window).on('load', function() {
                jQuery(".status").fadeOut();
                jQuery(".preloader").delay(350).fadeOut("slow");
            });
        },

        /*-----------------------------------------------------
            Fix Go To Top Button
        -----------------------------------------------------*/
        topButton: function() {
            var scrollTop = $(".scroll-to-topp");
            $(window).on('scroll', function() {
                if ($(this).scrollTop() < 500) {
                    scrollTop.removeClass("active");
                } else {
                    scrollTop.addClass("active");
                }
            });
            $('.scroll-to-topp').click(function() {
                $("html, body").animate({
                    scrollTop: 0
                }, "slow");
                return false;
            });


            /** Scroll Down Banner **/
            $(function() {
                $('.scroll-down-section').click(function() {
                    $('html, body').animate({ scrollTop: $('#scroll-down-section').offset().top }, 'fast');
                    return false;
                });
            });
        },


        /*-----------------------------------------------------
        	Fix Mobile Menu 
        -----------------------------------------------------*/
        navMenu: function() {
            /* Menu Toggle */
            $(".menu-btn").on('click', function(event) {
                $(".main-menu, .menu-btn").toggleClass("open-menu");
            });
            $("body").on('click', function() {
                $(".main-menu, .menu-btn").removeClass("open-menu");
            });
            $(".menu-btn, .main-menu").on('click', function(event) {
                event.stopPropagation();
            });

            /* Submenu */

            var w = window.innerWidth;
            if (w <= 1199) {
                $(".main-menu > ul > li").on('click', function(e) {
                    $('.main-menu > ul > li').not($(this)).closest('li').find('.sub-menu').slideUp();
                    $('.main-menu > ul > li').not($(this)).closest('li').removeClass('open');
                    $(this).closest('li').find('.sub-menu').slideToggle();
                    $(this).toggleClass("open");
                });
                $(".sub-menu").on('click', function(event) {
                    event.stopPropagation();
                });
            }

            /* Linking */
            $(function() {
                for (var a = window.location, counting = $(".main-menu > ul > li > a").filter(function() {
                        return this.href == a;
                    }).addClass("active");;) {
                    if (!counting.is(".has-sub-menu")) break;
                    counting = counting.parent().addClass("active");
                }
                // Submenu
                for (var a = window.location, counting = $(".sub-menu a").filter(function() {
                        return this.href == a;
                    }).parent().parent().parent().addClass("active");;) {
                    if (!counting.is(".has-sub-menu")) break;
                    counting = counting.parent().addClass("active");
                }
            });
        },

        /*-----------------------------------------------------
        	Fix  On focus Placeholder
        -----------------------------------------------------*/
        focusText: function() {
            var place = '';
            $('input,textarea').focus(function() {
                place = $(this).attr('placeholder');
                $(this).attr('placeholder', '');
            }).blur(function() {
                $(this).attr('placeholder', place);
            });
        },

        /*-----------------------------------------------------
				Fix Video Popup
		----------------------------------------------------*/
        popupVideo: function() {
            if ($(".popup-youtube").length > 0) {
                $(".popup-youtube").magnificPopup({
                    type: "iframe",
                });
            }
        },

        /*-----------------------------------------------------
			Fix  CountDown
		-----------------------------------------------------*/
        countDonw: function() {
            if ($('.lens-countdown').length > 0) {
                (function() {
                    const second = 1000,
                        minute = second * 60,
                        hour = minute * 60,
                        day = hour * 24;

                    let offer = "june 28, 2024 11:53:00",
                        countDown = new Date(offer).getTime(),
                        x = setInterval(function() {

                            let now = new Date().getTime(),
                                distance = countDown - now;

                            document.getElementById("days").innerText = Math.floor(distance / (day)),
                                document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
                                document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
                                document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

                            //do something later when date is reached
                            if (distance < 0) {
                                let headline = document.getElementById("headline"),
                                    countdown = document.getElementById("countdown");

                                headline.innerText = "Offer is End!";
                                countdown.style.display = "none";

                                clearInterval(x);
                            }
                            //seconds
                        }, 0)
                }());
            }


            $(".timer-close-btn").click(function() {
                $(".lens-counter-wrapper").delay(400).fadeOut();
            });

        },


        /*-----------------------------------------------------
			Fix  Product Thumb
		-----------------------------------------------------*/
        thumbProduct: function() {
            if ($('.lens-product-single-wrap').length > 0) {
                $(document).on('click', '.lens-product-img-thumb ul li img', function() {
                    $('.lens-main-img').find('img').attr('src', $(this).data('source'));
                    $('.lens-main-img').find('a').attr('href', $(this).data('source'));
                    $('.lens-product-img-thumb >ul > li').not($(this)).closest('li').removeClass('active');
                    $(this).closest('li').addClass('active');
                });
            }
        },

        /*-----------------------------------------------------
        	Fix Gallery Magnific Popup
        -----------------------------------------------------*/
        popupGallery: function() {
            $('.popup-gallery').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        },

        //Nice Select 
        niceSlection: function() {
            if ($('.nice-selection').length > 0) {
                $(document).ready(function() {
                    $('.nice-selection').niceSelect();
                });
            }
        },

        /*-----------------------------------------------------
        	Fix Swiper slider
        -----------------------------------------------------*/
        swiperSliders: function() {

           
            $(document).ready(function() {

                 // Tranding Products
                if ($(".trending-slider").length > 0) {
                    new Swiper('.trending-slider', {
                        pagination: {
                            el: '.pagination-trending-swiper',
                            clickable: true,
                        },
                        paginationClickable: false,
                        direction: 'horizontal',
                        spaceBetween: 30,
                        nested: true,
                        slidesPerView: 4,
                        allowTouchMove: true,
                        breakpoints: {
                            0: {
                                slidesPerView: 1,
                            },
                            575: {
                                slidesPerView: 2,
                            },
                            767: {
                                slidesPerView: 2,
                            },
                            992: {
                                slidesPerView: 3,
                            },
                            1200: {
                                slidesPerView: 4,
                            },
                            1400: {
                                slidesPerView: 4,
                            },
                        },
                    });
                }


                // Testimonial slider
                if ($(".testimonial-slider").length > 0) {
                    new Swiper('.testimonial-slider', {
                        pagination: {
                            el: '.pagination-testimonial-swiper',
                            clickable: true,
                        },
                        paginationClickable: false,
                        direction: 'horizontal',
                        spaceBetween: 30,
                        nested: true,
                        slidesPerView: 2,
                        allowTouchMove: true,
                        breakpoints: {
                            0: {
                                slidesPerView: 1,
                            },
                            575: {
                                slidesPerView: 1,
                            },
                            767: {
                                slidesPerView: 1,
                            },
                            992: {
                                slidesPerView: 1,
                            },
                            1200: {
                                slidesPerView: 2,
                            }
                        },
                    });
                }


            });

        },

        /*-----------------------------------------------------
               Product Filter js
        -----------------------------------------------------*/
        productFilter: function() {
            $(function() {
                $('.lens-filter').mixItUp();
            });
        },

        /*-----------------------------------------------------
            Fix Diffrent Ship Add
        -----------------------------------------------------*/
        shipAddress: function() {
            /** Coupn Code **/
            $('.lens-coupn-code').slideUp();
            $(".lens-coupn-code-btn").on('click', function() {
                $(".coupon_code_form").slideToggle("fast");
            });
        },

        /*-----------------------------------------------------
            Fix Checkout Radio Button
        -----------------------------------------------------*/

        paymentOption: function() {
            $('.radio-inner').on('click', function() {
                var counter = 0;
                if (counter == '0') {
                    $(this).find('input').prop('checked', true);
                    counter++;
                } else {
                    $(this).find('input').prop('checked', false);
                    counter--;
                }
            });
        },

        /*-----------------------------------------------------
			Fix  Quantity Up Down
		-----------------------------------------------------*/
        quantity: function() {
            var quantity = 0;
            $('.quantity-plus').on('click', function(e) {
                e.preventDefault();
                var quantity = parseInt($(this).siblings('.quantity').val(), 10);
                $(this).siblings('.quantity').val(quantity + 1);

            });
            $('.quantity-minus').on('click', function(e) {
                e.preventDefault();
                var quantity = parseInt($(this).siblings('.quantity').val(), 10);
                if (quantity > 0) {
                    $(this).siblings('.quantity').val(quantity - 1);
                }
            });
        },


    };

    control.init();



    /*-----------------------------------------------------
        Fix Contact Form Submission
    -----------------------------------------------------*/
    // Contact Form Submission
    function checkRequire(formId, targetResp) {
        targetResp.html('');
        var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
        var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
        var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
        var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
        var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
        var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
        var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
        var check = 0;
        $('#er_msg').remove();
        var target = (typeof formId == 'object') ? $(formId) : $('#' + formId);
        target.find('input , textarea , select').each(function() {
            if ($(this).hasClass('require')) {
                if ($(this).val().trim() == '') {
                    check = 1;
                    $(this).focus();
                    $(this).parent('div').addClass('form_error');
                    targetResp.html('You missed out some fields.');
                    $(this).addClass('error');
                    return false;
                } else {
                    $(this).removeClass('error');
                    $(this).parent('div').removeClass('form_error');
                }
            }
            if ($(this).val().trim() != '') {
                var valid = $(this).attr('data-valid');
                if (typeof valid != 'undefined') {
                    if (!eval(valid).test($(this).val().trim())) {
                        $(this).addClass('error');
                        $(this).focus();
                        check = 1;
                        targetResp.html($(this).attr('data-error'));
                        return false;
                    } else {
                        $(this).removeClass('error');
                    }
                }
            }
        });
        return check;
    }
    $(".submitForm").on('click', function() {
        var _this = $(this);
        var targetForm = _this.closest('form');
        var errroTarget = targetForm.find('.response');
        var check = checkRequire(targetForm, errroTarget);

        if (check == 0) {
            var formDetail = new FormData(targetForm[0]);
            formDetail.append('form_type', _this.attr('form-type'));
            $.ajax({
                method: 'post',
                url: '../ajaxmail.php',
                data: formDetail,
                cache: false,
                contentType: false,
                processData: false
            }).done(function(resp) {
                console.log(resp);
                if (resp == 1) {
                    targetForm.find('input').val('');
                    targetForm.find('textarea').val('');
                    errroTarget.html('<p style="color:green;">Mail has been sent successfully.</p>');
                } else {
                    errroTarget.html('<p style="color:red;">Something went wrong please try again latter.</p>');
                }
            });
        }
    });

    /*-----------------------------------------------------
        Fix  CountDown SCREIPT
    -----------------------------------------------------*/

    if ($(".clockdiv").length > 0) {

        var Countdown = function(options) {
            this.options = {
                $elem: options.$elem || undefined,
                elemSelector: options.elemSelector || 'data-countdown',
                startDate: options.startDate || new Date(),
                endDate: options.endDate || new Date(new Date().getTime() + 60000),
                leadingZero: options.leadingZero !== undefined ? options.leadingZero : true,
                setCssProperties: options.setCssProperties !== undefined ? options.setCssProperties : true,
                separateDigits: options.separateDigits !== undefined ? options.separateDigits : true,
                nextDigits: options.nextDigits !== undefined ? options.nextDigits : true,
                labels: options.labels || {
                    days: "Days",
                    hours: "Hours",
                    minutes: "Minutes",
                    seconds: "Seconds",
                },
                ariaLabels: options.ariaLabels || {
                    time: "%days, %hours, %minutes, and %seconds remaining",
                    days: {
                        zero: "%d days",
                        single: "%d day",
                        plural: "%d days",
                    },
                    hours: {
                        zero: "%d hours",
                        single: "%d hour",
                        plural: "%d hours"
                    },
                    minutes: {
                        zero: "%d minutes",
                        single: "%d minute",
                        plural: "%d minutes",
                    },
                    seconds: {
                        zero: "%d seconds",
                        single: "%d second",
                        plural: "%d seconds",
                    },
                }
            };

            // Initialise
            this.$elem = this.options.$elem || document.querySelector(options.elemSelector);
            this.startDate = new Date(this.options.startDate);
            this.endDate = new Date(this.options.endDate);
            this.ticker = 0;
            this.$elem.querySelector('.days .label').innerText = this.options.labels.days;
            this.$elem.querySelector('.hours .label').innerText = this.options.labels.hours;
            this.$elem.querySelector('.minutes .label').innerText = this.options.labels.minutes;
            this.$elem.querySelector('.seconds .label').innerText = this.options.labels.seconds;

            // Start ticker
            this.update();
            this.run();
        }

        Countdown.prototype.getLabel = function(labelSet, labelName, value) {
            if (["labels", "ariaLabels"].indexOf(labelSet) === -1) {
                throw new Error("Invalid labelSet given: must be labels or ariaLabels");
            }
            if (["days", "hours", "minutes", "seconds"].indexOf(labelName) === -1) {
                throw new Error("Invalid labelName given: must be days, hours, minutes or seconds");
            }
            var valueQuant = value === 0 ? "zero" : value === 1 ? "single" : "plural";
            return this.options[labelSet][labelName][valueQuant].replace("%d", value);
        }

        Countdown.prototype.leadingZero = function(value, length) {
            if (this.options.leadingZero && String(value).length < length) {
                var padLength = length - String(value).length;
                var output = String(value);
                for (var i = 0; i < padLength; i++) {
                    output = '0' + output;
                }
                return output;
            }
            return value;
        }

        Countdown.prototype.separateDigits = function(value) {
            if (this.options.separateDigits && String(value).length) {
                var _value = String(value).split("");
                var output = '';
                for (var i = (_value.length - 1); i >= 0; i--) {
                    var digit = parseInt(_value[i], 10);
                    output = '<span class="digit digit-' + Math.pow(10, _value.length - 1 - i) + '"' +
                        (this.options.nextDigits ?
                            ' data-countdown-next-digit="' + ((digit + 1) % 10) + '"' :
                            '') +
                        '>' + digit + '</span>' + output;
                }
                return output;
            } else {
                return value;
            }
        }

        Countdown.prototype.update = function() {
            var now = new Date();

            var diffSeconds = Math.floor((this.endDate.getTime() - now.getTime()) / 1000);
            var diffMinutes = Math.floor(diffSeconds / 60);
            var diffHours = Math.floor(diffSeconds / 3600);
            var diffDays = Math.floor(diffSeconds / 86400);

            var days = 0;
            var hours = 0;
            var minutes = 0;
            var seconds = 0;

            if (this.startDate <= now && this.endDate > now) {
                seconds = diffSeconds % 60;
                minutes = diffMinutes % 60;
                hours = diffHours % 24;
                days = diffDays;
            }

            // Update title/aria label
            var ariaLabel = this.options.ariaLabels.time
                .replace("%days", this.getLabel("ariaLabels", "days", days))
                .replace("%hours", this.getLabel("ariaLabels", "hours", hours))
                .replace("%minutes", this.getLabel("ariaLabels", "minutes", minutes))
                .replace("%seconds", this.getLabel("ariaLabels", "seconds", seconds));
            this.$elem.setAttribute("title", ariaLabel);
            this.$elem.setAttribute("aria-label", ariaLabel);

            // Update visible amounts
            this.$elem.querySelector('.seconds .amount').innerHTML = this.separateDigits(this.leadingZero(seconds, 2));
            this.$elem.querySelector('.minutes .amount').innerHTML = this.separateDigits(this.leadingZero(minutes, 2));
            this.$elem.querySelector('.hours .amount').innerHTML = this.separateDigits(this.leadingZero(hours, 2));
            this.$elem.querySelector('.days .amount').innerHTML = this.separateDigits(this.leadingZero(days, 2));

            // Next digits
            if (this.options.nextDigits) {
                this.$elem.querySelector('.seconds .amount')
                    .setAttribute('data-countdown-next-digits', (seconds + 1) % 60);
                this.$elem.querySelector('.minutes .amount')
                    .setAttribute('data-countdown-next-digits', (minutes + 1) % 60);
                this.$elem.querySelector('.hours .amount')
                    .setAttribute('data-countdown-next-digits', (hours + 1) % 24);
                this.$elem.querySelector('.days .amount')
                    .setAttribute('data-countdown-next-digits', days + 1);
            }

            // Update CSS properties
            if (this.options.setCssProperties) {
                var maxDiffSeconds = Math.floor((this.endDate.getTime() - this.startDate.getTime()) / 1000);
                var maxDiffMinutes = Math.floor(maxDiffSeconds / 60);
                var maxDiffHours = Math.floor(maxDiffSeconds / 3600);
                var maxDiffDays = Math.floor(maxDiffSeconds / 86400);

                this.$elem.style.setProperty("--countdown-percent", maxDiffSeconds > 0 ?
                    diffSeconds / maxDiffSeconds : 0);
                this.$elem.style.setProperty("--countdown-percent-seconds", maxDiffSeconds > 0 ?
                    diffSeconds / maxDiffSeconds : 0);
                this.$elem.style.setProperty("--countdown-percent-minutes", maxDiffMinutes > 0 ?
                    diffMinutes / maxDiffMinutes : 0);
                this.$elem.style.setProperty("--countdown-percent-hours", maxDiffHours > 0 ?
                    diffHours / maxDiffHours : 0);
                this.$elem.style.setProperty("--countdown-percent-days", maxDiffDays > 0 ?
                    diffDays / maxDiffDays : 0);
            }
        }

        Countdown.prototype.run = function() {
            var self = this;
            var now = new Date();

            self.update();

            if (now < this.endDate) {
                self.ticker = setTimeout(function() {
                    self.run()
                }, 1000);
            } else {
                clearTimeout(self.ticker);
                self.$elem.setAttribute('data-countdown-ended', true);
            }
        }

        /**
         * Initialise countdowns on HTML elements
         */
        var countdowns = document.querySelectorAll('[data-countdown]');
        if (countdowns.length > 0) {
            for (var i = 0; i < countdowns.length; i++) {
                var leadingZero = countdowns[i].getAttribute('data-countdown-option-leadingzero');
                var setCssProperties = countdowns[i].getAttribute('data-countdown-option-setcssproperties');
                var separateDigits = countdowns[i].getAttribute('data-countdown-option-separatedigits');
                var nextDigits = countdowns[i].getAttribute('data-countdown-option-nextdigits');

                leadingZero = leadingZero === true ||
                    leadingZero === "true" ||
                    leadingZero === "1" ||
                    leadingZero === 1 ?
                    true :
                    false;

                setCssProperties = setCssProperties === true ||
                    setCssProperties === "true" ||
                    setCssProperties === "1" ||
                    setCssProperties === 1 ?
                    true :
                    false;

                separateDigits = separateDigits === true ||
                    separateDigits === "true" ||
                    separateDigits === "1" ||
                    separateDigits === 1 ?
                    true :
                    false;

                nextDigits = nextDigits === true ||
                    nextDigits === "true" ||
                    nextDigits === "1" ||
                    nextDigits === 1 ?
                    true :
                    false;

                new Countdown({
                    $elem: countdowns[i],
                    startDate: countdowns[i].getAttribute('data-countdown-option-startdate'),
                    endDate: countdowns[i].getAttribute('data-countdown'),
                    leadingZero: leadingZero,
                    setCssProperties: setCssProperties,
                    separateDigits: separateDigits,
                    nextDigits: nextDigits,
                });
            }
        }

    }

    /** Tooltip JS **/
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

})(jQuery);

// Get the current year
const currentYear = new Date().getFullYear();
// Display the current year in the span with the ID 'current-year'
document.getElementById("current-year").textContent = currentYear;;