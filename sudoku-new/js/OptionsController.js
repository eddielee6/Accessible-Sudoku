OptionsController = function() {
    var sender = this;

    var loadUserPreferences = function() {
        var localStorage = new LocalStorageRepository();

        $(".optionsMenu .menuItem").each(function() {
            if((!$(this).parent("li").hasClass("desktop-only")) || $("html").hasClass("desktop")) {
                var initialValue = localStorage.GetValueForKey($(this).attr("data-optionId"));
                initialValue = initialValue == null ? $(this).attr("data-options").split(",")[0] : initialValue;
                initialValue = initialValue.substring(1, initialValue.length - 1);

                var key = initialValue.split(":")[0];
                var value = initialValue.split(":")[1];

                $(this).attr("data-selectedKey", key);
                $(this).children(".value").text(value);
                $("html").addClass(key);
            }
        });
    };

    var initOptionsScreenControles = function() {
        //Select first option
        $(".optionsMenu .menuItem").first().addClass("selected");
        $(".optionsMenu .menuItem").first().siblings(".leftArrow, .rightArrow").css("display", "inline-block");

        //Mouse input
        $(".optionsMenu li").mouseover(function() {
            $(".optionsMenu .menuItem").removeClass("selected");
            $(".optionsMenu .menuItem").siblings(".rightArrow, .leftArrow").css("display", "none");
            $(this).children(".rightArrow, .leftArrow").css("display", "inline-block");
            $(this).children(".menuItem").addClass("selected");
        });
        $(".optionsMenu .menuItem").click(function() {
            changeOption("right");
        });
        $(".optionsMenu .leftArrow").click(function() {
            changeOption("left");
        });
        $(".optionsMenu .rightArrow").click(function() {
            changeOption("right");
        });

        var menuItemAnimation;

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
                            newSelection.parent("li").addClass("animated pulse");
                            newSelection.siblings(".leftArrow, .rightArrow").css("display", "inline-block");
                            menuItemAnimation = cleanUpAnimationAfterTimeout(newSelection.parent("li"), 400);
                            currentlySelected.removeClass("selected");
                            currentlySelected.siblings(".leftArrow, .rightArrow").css("display", "none");
                        }
                        break;
                    case 40: // s
                    case 83: // down
                        var newSelection = currentlySelected.parent("li").next(":visible").find(".menuItem");
                        if(newSelection.length) {
                            newSelection.addClass("selected");
                            newSelection.parent("li").addClass("animated pulse");
                            newSelection.siblings(".leftArrow, .rightArrow").css("display", "inline-block");
                            menuItemAnimation = cleanUpAnimationAfterTimeout(newSelection.parent("li"), 400);
                            currentlySelected.removeClass("selected");
                            currentlySelected.siblings(".leftArrow, .rightArrow").css("display", "none");
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
        
        var leftArrowAnimation;
        var rightArrowAnimation;
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
                        var toAnimate = $(currentlySelected).siblings(".leftArrow");
                        clearTimeout(leftArrowAnimation);
                        removeAnimations(toAnimate)
                        toAnimate.addClass("animated shake");
                        leftArrowAnimation = cleanUpAnimationAfterTimeout(toAnimate, 500);
                    } else {
                        var toAnimate = $(currentlySelected).siblings(".rightArrow");
                        clearTimeout(rightArrowAnimation);
                        removeAnimations(toAnimate)
                        toAnimate.addClass("animated shake");
                        rightArrowAnimation = cleanUpAnimationAfterTimeout(toAnimate, 500);
                    }
                }
            }
        };
    };

    var init = new function() {
        loadUserPreferences();
        initOptionsScreenControles();
    };
};