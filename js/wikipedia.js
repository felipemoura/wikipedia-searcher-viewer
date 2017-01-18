// search query
// https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=[search]&format=json


// to get page id
// https://en.wikipedia.org/w/api.php?action=query&titles=Felipe%20Camiroaga&format=json


// page id
// https://en.wikipedia.org/wiki/index.php?curid=

// https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=aaa&format=json&callback=?

//https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpssearch=Albert%20Ei&gpslimit=10&prop=pageimages%7Cpageterms&piprop=thumbnail&pithumbsize=50&pilimit=10&redirects=&wbptterms=description

//https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch
//&gpssearch=aaa&wbptterms=description

$(document).ready(function() {

	$("#search").on('click', function(){
		var value = document.getElementById("searchWiki").value.trim();
		if (value === "") return;
		
		searchWiki(value);
	});	
	
	function searchWiki (value) {
		$('.list').empty();

		var url = 'https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=search&utf8=1&gsrsearch=' + encodeURIComponent(value) +'&prop=extracts&exintro=1&explaintext&exlimit=20&exchars=200&format=json&callback=?';
		$.getJSON(url, function( data ) {

			if (!data.hasOwnProperty('query')) {
				$('.list').append('<p style="color: red;">No results Found</p>');
				alert('No results Found');
				return;
			}

			var size = data.query.pages.length;
			

			for (var i = 0; i < size; i++) {
				var button = "https://en.wikipedia.org/wiki/index.php?curid=" + data.query.pages[i].pageid;
				var html_buttom = '<a href='+ button + ' target="_blank">';
				$('.list').append(html_buttom + '<div class="jumbotron" id="result' + i + '"><h5>' + data.query.pages[i].title + '</h5><p class="description">' + data.query.pages[i].extract + '</p></div></a>');
				$('#result'+i).fadeIn(999);
			}
		});
	}
	
	
});

