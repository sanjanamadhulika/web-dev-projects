//check off specific Todos by clicking
$("ul").on("click", "li", function(){ //when li is clicked
	// console.log($(this).css("color"));
	// if ($(this).css("color") === "rgb(128, 128, 128)") {
	// 	$(this).css({
	// 		color: "black",
	// 		textDecoration: "none"
	// 	});
	// }else{
	// 	$(this).css({
	// 		color: "gray",
	// 		textDecoration: "line-through"
	// 	});
	// }
	// instead of above code write

	$(this).toggleClass("completed");
});

//Click on X to Delete Todos
$("ul").on("click", "span", function(event){ //when span is clicked
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();    //will not show the css of parent element
});

$("input[type = 'text']").keypress(function(event){
	if(event.which === 13){    // 13 is the value for enter key. Means when we hit enter
		var todoText = $(this).val();
		$(this).val(""); 
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
	}
});

$("#new").click(function(){
	$("input[type = 'text']").fadeToggle()
});