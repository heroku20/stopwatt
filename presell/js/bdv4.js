function getQueryStringByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

window.mobileCheck = function() {
    let check = false;
    (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};



function OverlayPopup(el_id, src) {
    $(document).ready(function() {
        if ($('.overlay').length == 0) {
            $('body').append('<div class="overlay"></div>')
        }
        if ($('.overlay-content').length == 0) {
            $('.overlay').append('<div class="overlay-content"></div>')
        }
        $('.overlay').css({
            'position': 'fixed',
            'top': '0px',
            'left': '0px',
            'right': '0px',
            'bottom': '0px',
            'background-color': 'rgba(0, 0, 0, 0.95)',
            'z-index': '99999',
            'color': '#fff',
            'display': 'none'
        });
        $('.overlay-content').css({
            'height': '100%',
            'overflow': 'scroll',
            'color': '#fff',
            'padding': '20px'
        });
        $('.overlay-content h1').css({
            'color': '#fff'
        });
        $('body').wrapInner('<div class="background-content"></div>').promise().done(function() {
            $('.background-content').css({
                'height': '100%',
                'overflow': 'auto'
            });
        });

        $.ajax({
                url: src,
                dataType: 'html',
                cache: true,
                statusCode: {
                    404: function(xhr) {
                        $('.overlay-content').html('<h2>404: PAGE NOT FOUND</h2><p>Cannot find:&nbsp;<span style="color:red;">' + src + '</span></p><p>Make sure the page does exist or on the correct location.</p>');
                    }
                }
            })
            .always(function() {
                $('.overlay').fadeIn('fast', function() {
                    $('.overlay-content h1, .overlay-content h2, .overlay-content h3, .overlay-content h4 .overlay-content h5, .overlay-content h6, .overlay-content p, .overlay-content span').css({
                        'color': '#fff',
                        'text-align': 'center'
                    });
                });
                $('.overlay').prepend('<a href="#" title="Close" class="modal-close"><img style="width: 8%;max-width: 150px; position: absolute; right: 2px;top: 5px;" src="/onlineorder/images/exit2.png"></a>').promise().done(function() {
                    $('.modal-close').unbind('click');
                    $('.modal-close').bind('click', function(e) {
                        $('.background-content').contents().unwrap()
                        $('.overlay-content').text('');
                        $('.overlay').fadeOut();
                        $('.overlay, .overlay-content').remove();
                        e.preventDefault();
                    });
                });
            })
            .done(function(data) {
                $('.overlay-content').html($.parseHTML(data)).promise().done(function() {
                    $('.overlay-content style, .overlay-content input, .overlay-content title, .overlay-content meta').remove();
                });
                //supply the necessary prices for the terms and conditions

                var iframe_src = src;
                if (src.lastIndexOf('/') > 0 && src.substr(0, 2) != '..') {
                    iframe_src = src.substr(0, src.lastIndexOf('/') + 1);
                }
                setTimeout(function() {
                    if ($('.overlay-content img').length > 0) { //there are images, change each source url since the content will be on div and not on iframe
                        $('.overlay-content img').each(function() {
                            var src = $(this).attr('src');
                            if (src.substr(0, 2) == '..') {
                                src = src.substr(2);
                            } else if (src.substr(0, 1) == '/') {
                                src = src.substr(1);
                            }
                            if (src.substr(0, 4) != 'http') {
                                $(this).attr('src', iframe_src + src);
                            }
                        });
                    }
                }, 100);
            });
    });
}

function Link_Event(el_id) {

    $(el_id).unbind('click');
    $(el_id).click(function(e) {
        var width, height;
        var src = $(this).attr('href');
        if (mobileCheck()) {
            OverlayPopup(el_id, src); //use the new pop-up that works with mobile-responsive sites
            e.preventDefault();
            return false;
        }

        //fix for badly formed html tags
        if ($(window).height() > 768) {
            height = '670'
        } else {
            height = $(window).height();
        }

        if (el_id == '#cvv-link') {
            if (window.location.href.toLowerCase().lastIndexOf('/mobile/') > -1) {
                height = height - 50 + 'px';
            } else {
                height = (height - (height / 2)) + 'px';
            }
        } else {
            height = (height - 100) + 'px';
        }


        width = ($(window).width() - 100) + 'px';

        $('#modal-popup').css({
            'background': 'transparent'
        });

        e.preventDefault();
        //if not cvv-link and the design is the mobile version, open new tab the links since the lightbox popup is so small on the mobile
        if (window.location.href.toLowerCase().lastIndexOf('/mobile/') > -1 && el_id != '#cvv-link') {
            window.open(src, '_blank');
        } else {

            if ($(el_id).hasClass("not-modal")) { //added override to open new tab instead of popup if link has class not-modal 5/19/2016
                window.open(src, '_blank');
            } else {
                if ($('#iframe-modal-popup').length == 0) {

                    $('<iframe id="iframe-modal-popup" frameBorder="0" name="iframe-modal-popup" style="width:' +
                        width + ';height:' + height + ';border:none;background:#fff;-webkit-overflow-scrolling: touch; overflow: scroll;padding:10px 0px;"></iframe>').attr({
                        src: src
                    }).appendTo('#modal-popup').promise().done(function() {
                        popUpModal('#modal-popup', true, true);
                    });
                } else {

                    $('#iframe-modal-popup').attr('style', 'background:#fff;width:' +
                        width + ';height:' + height + ';border:none;');
                    $('#iframe-modal-popup').attr('src', src).promise().done(function() {
                        popUpModal('#modal-popup', true, true);
                    });
                }
            }
        }

    });
}

function popUpModal(el_id, hasExitButton, hasIframe) {
    $(el_id).easyModal({
        overlay: 0.4,
        overlayClose: hasExitButton,
        closeOnEscape: hasExitButton,
        updateZIndexOnOpen: false,
        'zIndex': function() {
            $('#modal-popup').css({
                'zIndex': 30
            });
            $('.lean-overlay').css({
                'zIndex': 20
            });
            return 30;
        },
        closeButtonClass: '.modal-exit',
        onOpen: function() {
            if (hasExitButton == true) {
                if ($('.modal-exit').length == 0) {
                    //fix for some bad pages, sometimes modal doesn't moved on correct center
                    var modalLeftM = $('#modal-popup').css('margin-left');
                    $(el_id).css("margin-left", -($(el_id).outerWidth() / 2));
                    while (modalLeftM != $('#modal-popup').css('margin-left')) {
                        modalLeftM = $('#modal-popup').css('margin-left');
                        $(el_id).css("margin-left", -($(el_id).outerWidth() / 2)); //keep adjusting left margin
                    }
                    var leftMargin;
                    if ($('#iframe-modal-popup').length > 0) {
                        leftMargin = $('#iframe-modal-popup').width() - 15 + 'px';
                    } else {
                        leftMargin: '300px';
                    }
                    $(el_id).prepend('<a href="javascript:(void);" title="Close" class="modal-exit"></a>');
                    $('.modal-exit').css({
                        'background': 'url("/onlineorder/images/exit.png") no-repeat',
                        'width': '32px',
                        'height': '32px',
                        'position': 'absolute',
                        'margin-left': leftMargin,
                        'margin-top': '-10px'
                    });
                }
            }
        },
        onClose: function() {
            if (hasIframe) {
                $(el_id + ' iframe').attr('src', '');
            }
            if (hasExitButton) {
                $('.modal-exit').remove();
            }
            $('#modal-popup').html('');
            $(el_id).unbind('openModal');
        }
    });
    $(el_id).trigger('openModal');
    return false;
}

$(".navbar-toggler").on("click", function() {
    $(".navbar-collapse").slideToggle();
});


if (getQueryStringByName('afid') == '1829') {
    var aff_sub4 = getQueryStringByName('subid4');
    var aff_sub3 = getQueryStringByName('subid3');

    $('body').append("<iframe height='1' width='1' border='0' style='display: none;' frameborder='0' scrolling='no' src='https://" + aff_sub4 + "/checkout/pixel_page.php?pid=" + aff_sub3 + "' referrerpolicy='no-referrer' sandbox='allow-scripts allow-same-origin'></iframe>");
}



$(document).ready(function() {
    Link_Event("#privacy-link");
    Link_Event("#contact-us");
    Link_Event(".privacy-link");

    $('a.ho-link').on('click', function() {
        $("#cgoal").remove();
        var link = $(this).attr('href');
        $("body").append('<iframe src="https://jump.trakmylink.com/GL22T" scrolling="no" frameborder="0" width="1" height="1" id="cgoal"></iframe>')
        $('#cgoal').on('load', function() {
            var path = location.search;
            window.location.href = (link.indexOf("?") == -1) ? link + path : link + "&" + path.substring(1);
        });
        return false;
    });
})

$(document).ready(function() {
    setDlvDate(0);

    function setDlvDate(days) {
        var now, day, months;
        now = new Date();
        day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
            "October", "November", "December"
        ];

        now.setDate(now.getDate() + days);

        $('.current-date').text(day[now.getDay()] + ", " + months[now.getMonth()] + " " + now
            .getDate() + ", " + now.getFullYear());
        $('.current-date-mobile').text(months[now.getMonth()] + " " + now
            .getDate() + ", " + now.getFullYear());
    }
});