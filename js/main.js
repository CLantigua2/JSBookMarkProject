// Listen for form Submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
// get form values
	var siteName =document.getElementById('siteName').value;
	var siteUrl =document.getElementById('siteUrl').value;

	if(!validateForm(siteName, siteUrl)){
		return false;
	}
	var bookmark = {
		name: siteName,
		url: siteUrl
	}

/*// Local Storage Test
localStorage.setItem('test', 'Hello World');//gets Item
console.log(localStorage.getItem('test'));//console logs it
localStorage.removeItem('test');//deletes the item
console.log(localStorage.getItem('test'));*/

//test if bookmarks is null
if(localStorage.getItem('bookmarks') === null){
	// init array
	var bookmarks = [];
	// add to array
	bookmarks.push(bookmark);
	// set to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} else {
	// get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Add bookmark to array
	bookmarks.push(bookmark);
	// re-set back to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Clear Form
document.getElementById('myForm').reset();

// Re-fetch bookmarks
fetchBookmarks();

// Prevent form from submitting
	e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url){
	//Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// loop through bookmarksResults
	for(var i = 0; i < bookmarks.length; i++){
			if(bookmarks[i].url == url){
				// Remove from array
				bookmarks.splice(i, 1);
			}
	}
	// re-set back to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// Re-fetch bookmarks or you will have to refresh webpage to see items deleted
	fetchBookmarks();
}

// Fetch bookmarksResults
function fetchBookmarks(){
	// get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// Get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	// Build output
	bookmarksResults.innerHTML = '';
	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">'+
																	'<h3>'+name+
																	' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
																	' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
																	'</h3>'+
																	'</div>';
	}
}

// Validate Form
function validateForm(siteName, siteUrl){
	if(!siteName || !siteUrl){
		alert('Please fill in the form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if (!siteUrl.match(regex)){
		alert('Please use a valid URL');
		return false;
	}
	return true;
}
