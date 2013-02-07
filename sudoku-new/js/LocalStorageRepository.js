LocalStorageRepository = function() {

	this.IsAvailable = function() {
		return Modernizr.localstorage;
	};

	this.SetValueForKey = function(key, value) {
		if(this.IsAvailable()) {
			localStorage.setItem(key, value);
		}
	};

	this.GetValueForKey = function(key) {
		if(this.IsAvailable()) {
			return localStorage.getItem(key);
		}
	};
};