$(function () {
    
    //Mobile device detection
    if(navigator.userAgent.toLowerCase().match(/mobile/i)) {
        $("html").addClass("mobile");
    } else {
        $("html").addClass("desktop");
    }

    //Initialize game
    var game = new GameController();
    
    // var initMobileGridManager = function() {
    //     $(window).resize(function() {
    //         if (document.documentElement.clientWidth < 660) {
    //             $(".gameGrid .square, .gameGrid .cell").each(function() {
    //                 $(this).height($(this).innerWidth() - 3);
    //             });
    //         } else {
    //             $(".gameGrid .square, .gameGrid .cell").removeAttr("style");
    //         }
    //     });
    // };
    // initMobileGridManager();

});
