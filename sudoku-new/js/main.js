$(function () {
    
    //Mobile device detection
    if(navigator.userAgent.toLowerCase().match(/mobile/i) ||
        navigator.userAgent.toLowerCase().match(/android/i)) {
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
});
