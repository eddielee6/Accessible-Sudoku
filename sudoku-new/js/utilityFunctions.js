function removeAnimations (element) {
	$(element).removeClass("animated " +
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

function cleanUpAnimationAfterTimeout(element, duration) {
    return setTimeout(function() {
    	removeAnimations(element);
    }, duration);
};