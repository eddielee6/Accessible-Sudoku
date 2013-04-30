// The MIT License (MIT)

// Copyright (c) 2013 Eddie Lee, Richard Gibbons & Arron Jeffery

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

function removeAnimations (selector) {
	$(selector).removeClass("animated " +
		//Attention seekers
		"flash " +
		"bounce " +
		"shake " +
		"tada " +
		"swing " +
		"wobble " +
		"wiggle " +
		"pulse " +

		//Flippers
		"flip " +
		"flipInX " +
		"flipOutX " +
		"flipInY " +
		"flipOutY " +

		//Fading entrances
		"fadeIn " +
		"fadeInUp " +
		"fadeInDown " +
		"fadeInLeft " +
		"fadeInRight " +
		"fadeInUpBig " +
		"fadeInDownBig " +
		"fadeInLeftBig " +
		"fadeInRightBig " +

		//Fading exits
		"fadeOut " +
		"fadeOutUp " +
		"fadeOutDown " +
		"fadeOutLeft " +
		"fadeOutRight " +
		"fadeOutUpBig " +
		"fadeOutDownBig " +
		"fadeOutLeftBig " +
		"fadeOutRightBig " +

		//Bouncing entrances
		"bounceIn " +
		"bounceInDown " +
		"bounceInUp " +
		"bounceInLeft " +
		"bounceInRight " +

		//Bouncing exits
		"bounceOut " +
		"bounceOutDown " +
		"bounceOutUp " +
		"bounceOutLeft " +
		"bounceOutRight " +

		//Rotating entrances
		"rotateIn " +
		"rotateInDownLeft " +
		"rotateInDownRight " +
		"rotateInUpLeft " +
		"rotateInUpRight " +

		//Rotating exits
		"rotateOut " +
		"rotateOutDownLeft " +
		"rotateOutDownRight " +
		"rotateOutUpLeft " +
		"rotateOutUpRight " +

		//Lightspeed
		"lightSpeedIn " +
		"lightSpeedOut " +

		//Specials
		"hinge " +
		"rollIn " +
		"rollOut");
}

function cleanUpAnimationAfterTimeout(selector, timeout) {
    return setTimeout(function() {
    	removeAnimations(selector);
    }, timeout);
}

function keyCodeToAction(keycode) {
	switch(keycode) {
		case 86: //v
			return "v";
		case 72: //h
			return "h";
		case 78: //n
			return "n";
		case 82: //r
			return "r";
		case 66:
			return "b";
		case 67:
			return "c";

		case 96: //keypad 0
		case 48: //top 0
			return "0";
		case 97: //keypad 1
		case 49: //top 1
			return "1";
		case 98: //keypad 2
		case 50: //top 2
			return "2";
		case 99: //keypad 3
		case 51: //top 3
			return "3";
		case 100: //keypad 4
		case 52: //top 4
			return "4";
		case 101: //keypad 5
		case 53: //top 5
			return "5";
		case 102: //keypad 6
		case 54: //top 6
			return "6";
		case 103: //keypad 7
		case 55: //top 7
			return "7";
		case 104: //keypad 8
		case 56: //top 8
			return "8";
		case 105: //keypad 9
		case 57: //top 9
			return "9";

        case 83: //s
		case 40: //down
			return "down";
        case 65: //a
		case 37: //left
			return "left";
        case 87: //w
		case 38: //up
			return "up";
        case 68: //d
		case 39: //right
			return "right";

		case 13: //enter
			return "enter";

		case 27: //escape
			return "escape";

		case 8: //backspace
		case 46: //delete
			return "delete";
	}
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}