var button = document.querySelector("button");
var isPurple = false;


button.addEventListener("click", function(){
	if(isPurple){
		document.body.style.background = "white";
		isPurple= false;
	} else{
		document.body.style.background = "purple";
		isPurple= true;
	}
	
});


/* if we use css toggle

var button = document.querySelector("button");
button.addEventListner("click", function(){
	document.body.classList.toggle("purple");
})

classList will create the class if its not there and delete it if present.
*/
