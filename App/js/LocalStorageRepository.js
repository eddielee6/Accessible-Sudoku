LocalStorageRepository = function() {

	this.IsAvailable = function() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
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