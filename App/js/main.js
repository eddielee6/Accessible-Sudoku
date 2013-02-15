$(function () {
    
    //Mobile device detection
    if(navigator.userAgent.toLowerCase().match(/mobile/i) ||
        navigator.userAgent.toLowerCase().match(/android/i)) {
        $("html").addClass("mobile");
    } else {
        $("html").addClass("desktop");
    }

    //Initialize game
    SudokuGame = {
        menu: new MainMenuController()
    };
});
