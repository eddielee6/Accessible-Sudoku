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
		if (localStorage.GetValueForKey("size") == null) { localStorage.SetValueForKey("size", "Normal"); }
		if (localStorage.GetValueForKey("font") == null) { localStorage.SetValueForKey("font", "Helvetica"); }
		
		// Show the local storage values on screen.
		$(".optionsMenu").children('li:nth-child(1)').children()[1].innerHTML = localStorage.GetValueForKey("theme");
		$(".optionsMenu").children('li:nth-child(2)').children()[1].innerHTML = localStorage.GetValueForKey("size");
		$(".optionsMenu").children('li:nth-child(3)').children()[1].innerHTML = localStorage.GetValueForKey("font");

        //Mouse input
        $(".optionsMenu li").first().addClass("selected");
        $(".optionsMenu li").mouseover(function() {
            $(".optionsMenu li").removeClass("selected");
            $(this).addClass("selected");
        });
        $(".optionsMenu li").click(function() {
            triggerSelectedAction();
        });

        //Keyboard input
        $(window).keydown(function(evt) {
            if($("#optionsScreen").is(":visible")) {
                var currentlySelected = $(".optionsMenu li.selected");
                switch(evt.which) {
                    case 38: // w
                    case 87: // up
                        if(currentlySelected.prev(":visible").length) {
                            currentlySelected.prev(":visible").addClass("selected");
                            currentlySelected.removeClass("selected");
                        }
                        break;
                    case 40: // s
                    case 83: // down
                        if(currentlySelected.next(":visible").length) {
                            currentlySelected.next(":visible").addClass("selected");
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
            
            var currentlySelected = $(".optionsMenu li.selected");
            
            // Gets the comma-seperated values from the data-options attrib.
            var attribute = $(currentlySelected).data("options");
            var attribute_action = $(currentlySelected).data("action"); // TODONE: The data-action is the new key, that fits with the .GetValueForKey's above.
            // Splits them up into an array, seperated by ','
            var attribute_split = attribute.split(",");
            
            // Gets the current value thats shown on screen.
            var screen_value = $(currentlySelected).children()[1].innerHTML;
            
            // The next value
            var new_screen_value = null;
            var hasFound = null;
            
            // Tries to find the next value, comparing the current value on screen with whats next in the array.
            for (var i = 0; i < attribute_split.length; i++) 
            {
            	// To replace break;
            	if (!hasFound)
            	{
            		// Remove all classes
	            	$("html").removeClass(attribute_split[i]);
	            	
	            	// If whatever is in the current loop equals whatever is on the screen then..
	                if (attribute_split[i] == screen_value) {
	                
	                	// If it's not the end item..
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
            
            // Put the new value on the screen
            $(currentlySelected).children(".value").text(new_screen_value);
            
            // Eddie, since I know how much you love to refactor..
        };
    };

    var initMenuScreen = function() {
        var localStorage = new LocalStorageRepository();

        if(localStorage.GetValueForKey("gameSave") == null) {
            $("#buttonContinue").hide();
        }

        //Mouse input
        $(".mainMenu li:visible").first().addClass("selected");
        $(".mainMenu li").mouseover(function() {
            $(".mainMenu li").removeClass("selected");
            $(this).addClass("selected");
        });
        $(".mainMenu li").click(function() {
            triggerSelectedAction();
        });

        //Keyboard input
        $(window).keydown(function(evt) {
            if($("#menuScreen").is(":visible")) {
                var currentlySelected = $(".mainMenu li.selected");
                switch(evt.which) {
                    case 38: // w
                    case 87: // up
                        if(currentlySelected.prev(":visible").length) {
                            currentlySelected.prev(":visible").addClass("selected");
                            currentlySelected.removeClass("selected");
                        }
                        break;
                    case 40: // s
                    case 83: // down
                        if(currentlySelected.next(":visible").length) {
                            currentlySelected.next(":visible").addClass("selected");
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
            var currentlySelected = $(".mainMenu li.selected");
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
            $(".mainMenu li").removeClass("selected");
            removeAnimations($("#menuScreen li"));
            $("#menuScreen li").show();

            //Show menu
            $(".screen:visible .back").first().addClass("animated bounceOutLeft");
            setTimeout(function() {
            $(".screen:visible").first().addClass("animated bounceOutLeft");
                setTimeout(function() {
                    removeAnimations($(".screen"));
                    removeAnimations($(".screen .back"));
                    $(".screen").hide();
                    $("#menuScreen").show().addClass("animated bounceInRight");
                    $(".mainMenu li:visible").first().addClass("selected"); //Select first item
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