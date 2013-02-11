MainMenuController = function() {
    var sender = this;
    var sudokuBoardController;
    var optionsController;

    var setContinueState = function() {
        var localStorage = new LocalStorageRepository();
        if(localStorage.GetValueForKey("gameSave")) {
            $(".continueButton").show();
        } else {
            $(".continueButton").hide();
        }
    };
    
    var initMenuScreen = function() {
        var localStorage = new LocalStorageRepository();

        setContinueState();

        var menuItemAnimation;

        //Mouse input
        $(".mainMenu .menuItem:visible").first().addClass("selected");
        $(".mainMenu .menuItem").mouseenter(function() {
            $(".mainMenu .menuItem").removeClass("selected");
            $(this).addClass("selected animated pulse");
            menuItemAnimation = cleanUpAnimationAfterTimeout($(this), 400);
        });
        $(".mainMenu .menuItem").click(function() {
            triggerSelectedAction();
        });

        //Keyboard input
        $(window).keydown(function(evt) {
            if($("#menuScreen").is(":visible")) {
                var currentlySelected = $(".mainMenu .menuItem.selected");
                switch(evt.which) {
                    case 38: // w
                    case 87: // up
                        var newSelection = currentlySelected.parent("li").prev(":visible").find(".menuItem");
                        if(newSelection.length) {
                            newSelection.addClass("selected animated pulse");
                            menuItemAnimation = cleanUpAnimationAfterTimeout(newSelection, 400);
                            currentlySelected.removeClass("selected");
                        }
                        break;
                    case 40: // s
                    case 83: // down
                        var newSelection = currentlySelected.parent("li").next(":visible").find(".menuItem");
                        if(newSelection.length) {
                            newSelection.addClass("selected animated pulse");
                            menuItemAnimation = cleanUpAnimationAfterTimeout(newSelection, 400);
                            currentlySelected.removeClass("selected");
                        }
                        break
                    case 13:
                        triggerSelectedAction();
                        break;
                }
            }
        });

        var triggerSelectedAction = function() {
            var currentlySelected = $(".mainMenu .menuItem.selected");
            clearTimeout(menuItemAnimation);
            removeAnimations(currentlySelected);
            currentlySelected.addClass("animated bounceOutRight");
            setTimeout(function() {
                $("#menuScreen").addClass("animated bounceOutRight");
                setTimeout(function() {
                    $("section.screen").hide();
                    switch(currentlySelected.attr("data-action")) {
                        case "continue":
                            var existingGame = localStorage.GetValueForKey("gameSave")
                            sudokuBoardController.StartGame(existingGame);
                            $("#gameScreen").addClass("animated bounceInLeft").show();
                            break;

                        case "newGame":
                            sudokuBoardController.StartGame();
                            $("#gameScreen").addClass("animated bounceInLeft").show();
                            break;

                        case "options":
                            $("#optionsScreen").addClass("animated bounceInLeft").show();
                            break;

                        case "help":
                            $("#helpScreen").addClass("animated bounceInLeft").show();
                            break;
                    }
                }, 400);
            }, 100);
        };
    };

    var initMainMenuButton = function() {
        //Mouse input
        $(".screen header .back").click(function() {
            navigateToMenu();
        });

        //Keyboard input
        $(window).keydown(function(evt) {
            if(evt.which == 27) { //Esc
                if(!$("#menuScreen:visible").length) {
                    navigateToMenu();
                }
            }
        });

        var navigateToMenu = function() {
            //Reset main menu
            $(".mainMenu .menuItem").removeClass("selected");
            removeAnimations($("#menuScreen .menuItem"));
            $("#menuScreen .menuItem").show();

            setContinueState();

            //Show menu
            $(".screen:visible .back").first().addClass("animated bounceOutLeft");
            setTimeout(function() {
            $(".screen:visible").first().addClass("animated bounceOutLeft");
                setTimeout(function() {
                    removeAnimations($(".screen"));
                    removeAnimations($(".screen .back"));
                    $(".screen").hide();
                    $("#menuScreen").show().addClass("animated bounceInRight");
                    $(".mainMenu .menuItem:visible").first().addClass("selected"); //Select first item
                }, 400);
            }, 100);
        };
    };

    var init = new function() {
        optionsController = new OptionsController();
        sudokuBoardController = new SudokuBoardController();
        initMenuScreen();
        initMainMenuButton();
    };
};