// connect input to get request and append info to div
// use user name to get query
// display artest names
// last fm to imvdb


$(document).ready(function () {
	// $('#sumbit').click(function(event) {
	// 	event.preventDefault();
	// 	var search = $('#input').val();
	// 		console.log("pizza");

		// $.getJSON('http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user='+ search +'&api_key='+ key +'&format=json', 
		// 	{user : search,
		// 	period : "7day",
		// 	limit : 10,
		// 	key: "9f2a9dfab67cd0feeb756b3292fb2f4e",
		// 	}, function(data) {
		// 	console.log(data);
		// });

	// });
	var userImput = $('#input').val();
	$('#sumbit').submit(function() {
		console.log(userImput);
	});

});