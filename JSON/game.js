var Game = function() {
	
	// All of these have to be public so that they can be parsed by the JSON library.
	this.version = 1.0;
	this.size = 10;
	this.elapsed = 0;	
	this.content = new Array(this._size);
	
	// Populate grid
	for (var i = 0; i < this.size; i++)  
	{
		this.content[i] = new Array(this.size);
		for (var j = 0; j < this.size; j++) 
		{
			this.content[i][j] = -1; /* Put the random generator algortihm here */
		}
	}
	
}