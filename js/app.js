// connect input to get request and append info to div
// use user name to get query
// display artest names
// last fm to imvdb


$(document).ready(function () {
	$('#submit').click(function(event) {
		event.preventDefault();
		var userInput = $('#username').val();
		console.log(userInput);

		$.ajax({
			url:'https://itunes.apple.com/search?',
			jsonp: 'callback',
			dataType: 'jsonp',
			data: {
				term : userInput,
			}, 
			success: function(data) {
				console.log(data);
				var template = $('#resultTemplate').html();
				var render = Handlebars.compile(template);
				var artistID = data.results[0].artistId;
					console.log(artistID);
				getamgid(artistID);
			}
			});


	});

var getamgid = function(artistID) {
		$.ajax({
			url:'https://itunes.apple.com/lookup?',
			jsonp: 'callback',
			dataType: 'jsonp',
			data: {
				id : artistID,
			}, 
			success: function(data) {
			var amgID = data.results[0].amgArtistId;
				console.log(amgID);
				getAlbums(amgID);
			}	
		});
	};

 var getAlbums = function(amgID) {

		$.ajax({
			url:'https://itunes.apple.com/lookup',
			jsonp: 'callback',
			dataType: 'jsonp',
			data: {
				amgArtistId: amgID,
				entity: "album",
				limit: "5",
				sort: "recent",
			}, 
			success: function(data) {
			var artName = data.results[1].artistName;
			var release = data.results[1].collectionName;
			getVideo(artName, release);
				console.log(data);
				
			}	
		});
	};
var getVideo = function(artName, release) {
	$.getJSON('https://www.googleapis.com/youtube/v3/search', 
			{key: "AIzaSyAitXKVR92IKLca15azobSZz7L9bL0Pt44", 
			part: "snippet",
			q: artName+" "+" "+release,
		}, function(data) {
			console.log(data);
			displayResults(data);
		});
}

});

// query for the artist name from user imput
// get the artist ID
// list of releases sorted by year
// 