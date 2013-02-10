GameController = function() {
    var sender = this;
    var sudokuBoardController;

    var loadUserPreferences = function() {
        var localStorage = new LocalStorageRepository();
        $("html").addClass(localStorage.GetValueForKey("theme"));
        $("html").addClass(localStorage.GetValueForKey("size"));
        $("html").addClass(localStorage.GetValueForKey("font"));
    };

	var initOptionsScreen = function() {

		var localStorage = new LocalStorageRepository();
		
		// If the local storage values aren't populated with anything yet.
		if (localStorage.GetValueForKey("theme") == null) { localStorage.SetValueForKey("theme", "Default"); }
		if (localStorage.GetValueForKey("size") == null) { localStorage.SetValueForKey("size", "Bigger"); }
		if (localStorage.GetValueForKey("font") == null) { localStorage.SetValueForKey("font", "Dyslexic"); }
		
		// Show the local storage values on screen.
		// $(".optionsMenu").children('li:nth-child(1)').children()[1].innerHTML = localStorage.GetValueForKey("theme");
		// $(".optionsMenu").children('li:nth-child(2)').children()[1].innerHTML = localStorage.GetValueForKey("size"); //too tightly coupled to the UI
		// $(".optionsMenu").children('li:nth-child(3)').children()[1].innerHTML = localStorage.GetValueForKey("font");

        //Mouse input
        $(".optionsMenu .menuItem").first().addClass("selected");
        $(".optionsMenu .menuItem").mouseover(function() {
            $(".optionsMenu .menuItem").removeClass("selected");
            $(this).addClass("selected");
        });
        $(".optionsMenu .menuItem").click(function() {
            triggerSelectedAction();
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
                    case 13:
                        triggerSelectedAction();
                        break;
                }
            }
        });
        
        var triggerSelectedAction = function() {
	        var localStorage = new LocalStorageRepository();
	        
	        var currentlySelected = $(".optionsMenu .menuItem.selected");
	        
	        var attribute = $(currentlySelected).data("options");
	        var attribute_action = $(currentlySelected).data("action");
	        var attribute_split = attribute.split(",");
	        var screen_value = $(currentlySelected).children()[1].innerHTML;
	        var new_screen_value = null;
	        var hasFound = null;
	        for (var i = 0; i < attribute_split.length; i++) 
	        {
	        	if (!hasFound)
	        	{
	            	$("html").removeClass(attribute_split[i]);
	                if (attribute_split[i] == screen_value) {
	                	if (i < attribute_split.length - 1) {	
	                    	new_screen_value = attribute_split[i + 1];
	                    	localStorage.SetValueForKey(attribute_action, new_screen_value);
	                    	$("html").addClass(new_screen_value);
	                    	hasFound = true;
	                    } else {
		                    new_screen_value = attribute_split[0];
		                    localStorage.SetValueForKey(attribute_action, new_screen_value);
		                    $("html").addClass(new_screen_value);
		                    hasFound = true;
	                    }
	                }
	            }
	        }
	        
	        $(currentlySelected).children(".value").text(new_screen_value);
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
        initOptionsScreen();
    };
};