$(function () {
    
    //Mobile device detection
    if(navigator.userAgent.toLowerCase().match(/mobile/i)) {
        $("html").addClass("mobile");
    } else {
        $("html").addClass("desktop");
    }

    //Prevent mobile scrolling
    document.addEventListener("touchmove", function(e) {
        if ($(document).height() <= $(window).height()) {
            e.preventDefault();
        }
    });

    //Initialize game
    SudokuGame = {
        voiceOverManager: new VoiceOverManager(),
        menu: new MainMenuController()
    };
    
    
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
