/* Chrome browser behaves a little strangely when using alert, prompt, or confirm functions. 
It doesn't display the HTML on the page until after the popup has been closed. 
This is problematic since our HTML contains instructions for the user to be able to use the app we're building.

You can avoid this by wrapping your JS code in the following setTimeout function:

window.setTimeout(function() {
  // put all of your JS code from the lecture here
}, 500);*/


window.setTimeout(function() {var todos = [];

var input = prompt("What would you like to do?");

while(input !== "quit"){

	if(input === "list"){
		alert(todos);
	}else if(input === "new"){
		var newTodo = prompt("Enter new todo");

		todos.push(newTodo);
	}

	input = prompt("What would you like to do");
}
alert("Ok, YOU QUIT THE APP"); },500);