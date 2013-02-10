GameController = function() {
    var sender = this;
    var sudokuBoardController;

    var loadUserPreferences = function() {
        var localStorage = new LocalStorageRepository();

        $(".optionsMenu .menuItem").each(function() {
            var initialValue = localStorage.GetValueForKey($(this).attr("data-optionId"));
            initialValue = initialValue == null ? $(this).attr("data-options").split(",")[0] : initialValue;
            initialValue = initialValue.substring(1, initialValue.length - 1);

            var key = initialValue.split(":")[0];
            var value = initialValue.split(":")[1];

            $(this).attr("data-selectedKey", key);
            $(this).children(".value").text(value);
            $("html").addClass(key);
        });
    };

	var initOptionsScreenControles = function() {
        //Mouse input
        $(".optionsMenu .menuItem").first().addClass("selected");
        $(".optionsMenu .menuItem").mouseover(function() {
            $(".optionsMenu .menuItem").removeClass("selected");
            $(this).addClass("selected");
        });
        $(".optionsMenu .menuItem").click(function() {
            changeOption("right");
        });

        //Keyboard input
        $(window).keydown(function(evt) {
            if($("#optionsScreen").is(":visible")) {
                var currentlySelected = $(".optionsMenu .menuItem.selected");
                switch(evt.which) {
                    case 38: // w
                    case 87: // up
                        var newSelection = currentlySelected.parent("li").prev(":visible").find(".menuItem");
                        if(newSelection.length) {
                            newSelection.addClass("selected");
                            currentlySelected.removeClass("selected");
                        }
                        break;
                    case 40: // s
                    case 83: // down
                        var newSelection = currentlySelected.parent("li").next(":visible").find(".menuItem");
                        if(newSelection.length) {
                            newSelection.addClass("selected");
                            currentlySelected.removeClass("selected");
                        }
                        break
                    case 37: //left
                        changeOption("left");
                        break;
                    case 39: //right
                    case 13:
                        changeOption("right");
                        break;
                }
            }
        });
        
        var changeOption = function(direction) {
            var localStorage = new LocalStorageRepository();
	        
	        var currentlySelected = $(".optionsMenu .menuItem.selected");

            var availableOptions = currentlySelected.data("options").split(",");
            var origionalKey = currentlySelected.attr("data-selectedKey");
            $("html").removeClass(origionalKey);

            for(var i = 0; i < availableOptions.length; i++) {
                var key = availableOptions[i].substring(1, availableOptions[i].length - 1).split(":")[0];
                var value = availableOptions[i].substring(1, availableOptions[i].length - 1).split(":")[1];

                if(origionalKey == key) {
                    var newIndex = (direction == "left") ? (i - 1) : (i + 1);
                    newIndex = (newIndex >= availableOptions.length) ? 0 : newIndex;
                    newIndex = (newIndex < 0) ? availableOptions.length - 1 : newIndex;
                    var newKey = availableOptions[newIndex].substring(1, availableOptions[newIndex].length - 1).split(":")[0];
                    var newValue = availableOptions[newIndex].substring(1, availableOptions[newIndex].length - 1).split(":")[1];

                    localStorage.SetValueForKey(currentlySelected.attr("data-optionId"), availableOptions[newIndex]);
                    $(currentlySelected).attr("data-selectedKey", newKey);
                    $(currentlySelected).children(".value").html(newValue);
                    $("html").addClass(newKey);

                    if(direction == "left") {
                        $(currentlySelected).siblings(".leftArrow").addClass("animated shake");
                        cleanUpAnimationAfterTimeout($(currentlySelected).siblings(".leftArrow"), 400);
                    } else {
                        $(currentlySelected).siblings(".rightArrow").addClass("animated shake");
                        cleanUpAnimationAfterTimeout($(currentlySelected).siblings(".rightArrow"), 400);
                    }
                }
            }
        };
    };

    var initMenuScreen = function() {
        var localStorage = new LocalStorageRepository();

        if(localStorage.GetValueForKey("gameSave") == null) {
            $("#buttonContinue").hide();
        }

        //Mouse input
        $(".mainMenu .menuItem:visible").first().addClass("selected");
        $(".mainMenu .menuItem").mouseover(function() {
            $(".mainMenu .menuItem").removeClass("selected");
            $(this).addClass("selected");
        });
        $(".mainMenu .menuItem").click(function() {
            triggerSelectedAction();
        });

        var menuItemAnimation;

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
                            var existingGame = ko.mapping.fromJSON(localStorage.GetValueForKey("gameSave"));
                            sudokuBoardController.StartGame(existingGame);
                            $("#gameScreen").addClass("animated bounceInLeft").show();
                            break;

                        case "newGame":
                            var gameGenerator = new Generator();
                            var newGame = gameGenerator.GenerateNewGame();
                            localStorage.SetValueForKey("gameSave", ko.toJSON(newGame));
                            sudokuBoardController.StartGame(newGame);
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
        sudokuBoardController = new SudokuBoardController();

        loadUserPreferences();
        initMenuScreen();
        initMainMenuButton();
        initOptionsScreenControles();
    };
};