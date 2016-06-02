$(document).ready(function () {
	
	$('form').submit(function(event) {
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
				console.log(artName, release);
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
	};

	var displayResults = function(results) {
		var html = "";
		var source = $('#resultTemplate').html();
		var resTemplate = Handlebars.compile(source);
		$.each(results.items.slice(0,3), function(index, value) {
			value.displayDate = value.snippet.publishedAt.slice(0,10);
			html += resTemplate(value);
		});
		$('.searchResults').html(html);
	};
});

// what if no videos to display? 
	// display itunes?
	// display artist and title?

//display only top(3?) result?

//change display of date to leave off time code