// connect input to get request and append info to div
// use user name to get query
// display artest names
// last fm to imvdb


$(document).ready(function () {
	$('#submit').click(function(event) {
		event.preventDefault();
		var userInput = $('#username').val();
			console.log(userInput);

		$.getJSON('http://ws.audioscrobbler.com/2.0/', 
			{method : 'user.gettoptracks',
			user : userInput,
			period : "7day",
			limit : 10,
			api_key: "9f2a9dfab67cd0feeb756b3292fb2f4e",
			format : 'json',
			}, function(data) {
			console.log(data);
			var template = $('#resultTemplate').html();
			var render = Handlebars.compile(template);
			data.toptracks.track.forEach(function(track) {
				console.log(track);
				$('.results').append(render(track));
			});
		});

	});



});