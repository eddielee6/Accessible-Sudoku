MenuController = function() {
	var initAccessibilityControls = function() {
        var localStorage = new LocalStorageRepository();

        $("html").addClass(localStorage.GetValueForKey("theme"));
        $("html").addClass(localStorage.GetValueForKey("size"));
        $("html").addClass(localStorage.GetValueForKey("font"));

        $("#themeSwitch li").click(function() {
            var validSizeThemes = "normal dark-on-light light-on-dark";
            var newTheme = $(this).attr("data-theme-name");
            localStorage.SetValueForKey("theme", newTheme);
            $("html").removeClass(validSizeThemes).addClass(newTheme);
        });

        $("#sizeSwitch li").click(function() {
            var validSizeThemes = "standard bigger biggest";
            var newSizeTheme = $(this).attr("data-theme-name")
            localStorage.SetValueForKey("size", newSizeTheme);
            $("html").removeClass(validSizeThemes).addClass(newSizeTheme);
        });

        $("#fontSwitch li").click(function() {
            var validSizeThemes = "standard-font dyslexic";
            var newFont = $(this).attr("data-theme-name")
            localStorage.SetValueForKey("font", newFont);
            $("html").removeClass(validSizeThemes).addClass(newFont);
        });
    };

    var initMenuScreen = function() {
        $("#menuTitle ul li").mouseover(function() {
            $("#menuTitle ul li").removeClass("selected");
            $(this).addClass("selected");
        });

        var newGameButtonAction = function() {
            $("section.screen").hide();
            $("#gameScreen").show();
        };

        var helpButtonAction = function() {
            $("section.screen").hide();
            $("#helpScreen").show();
        };

        $("#buttonContinue").click(function() {

        });

        $("#buttonNew").click(function() {
            newGameButtonAction();
        });

        $("#buttonHelp").click(function() {
            helpButtonAction();
        });

        $(window).keydown(function(evt) {
            if($("#menuScreen").is(":visible")) {
                var currentlySelected = $("#menuTitle ul li.selected");
                switch(evt.which) {
                    case 38: // w
                    case 87: // up
                        if(currentlySelected.prev().length) {
                            currentlySelected.prev().addClass("selected");
                            currentlySelected.removeClass("selected");
                        }
                        break;
                    case 40: // s
                    case 83: // down
                        if(currentlySelected.next().length) {
                            currentlySelected.next().addClass("selected");
                            currentlySelected.removeClass("selected");
                        }
                        break
                    case 13:
                        switch(currentlySelected.attr("data-action")) {
                            case "continue":
                                break;
                            case "newGame":
                                newGameButtonAction();
                                break;
                            case "help":
                                helpButtonAction();
                                break;
                        }
                        break;
                }
            }
        });
    };

    var init = new function() {
    	initAccessibilityControls();
        initMenuScreen();
    };
};