/*References:
-HTML and CSS examples provided on canvas which contained javascript code were used as a template
-ShowOrders.js
-w3Schools for some methods used below
-Tutorial COMPSCI 335 T02C in SLT1 - 2017-07-27 17:06 recording was used in getBookData(), getBlurayData(), postComment(), bookSearch(), showBookList(books), bluraySearch(), showBlurayList(movies)
*/

var currentTab = "";
var loggedIn = false;

function showHome() {
    if (currentTab != "Home") {
        currentTab = "Home";
        showNoTabs();
        document.getElementById("Home").style.backgroundColor = "lightBlue";
        document.getElementById("HomeSection").style.display = "inline";
        }
    }
function showBooks() {
    if (currentTab != "Books") {
        currentTab = "Books";
        showNoTabs();
        document.getElementById("bookSearch").style.display = "block";
        document.getElementById("Books").style.backgroundColor = "lightBlue";
        document.getElementById("BooksSection").style.display = "inline";
		getBookData();
    }
}

function showBluray() {
    if (currentTab != "Bluray") {
        currentTab = "Bluray";
        showNoTabs();
        document.getElementById("bluSearch").style.display = "block";
        document.getElementById("Bluray").style.backgroundColor = "lightBlue";
        document.getElementById("BluraySection").style.display = "inline";
        getBlurayData();
    }
}
function showRegister() {
    if (currentTab != "Register") {
        currentTab = "Register";
        showNoTabs();
        document.getElementById("Register").style.backgroundColor = "lightBlue";
        document.getElementById("RegisterSection").style.display = "inline";
    }
}
function showComments() {
    if (currentTab != "Comments") {
        currentTab = "Comments";
        showNoTabs();
        document.getElementById("Comments").style.backgroundColor = "lightBlue";
        document.getElementById("CommentsSection").style.display = "inline";
        //getComment();
    }
}

function showNoTabs() {
    document.getElementById("Home").style.backgroundColor = "transparent";
	document.getElementById("Books").style.backgroundColor = "transparent";
    document.getElementById("Bluray").style.backgroundColor = "transparent";
	document.getElementById("Register").style.backgroundColor = "transparent";
    document.getElementById("Comments").style.backgroundColor = "transparent";
    document.getElementById("Login").style.backgroundColor = "transparent";

    document.getElementById("HomeSection").style.display = "none";
    document.getElementById("BooksSection").style.display = "none";
    document.getElementById("BluraySection").style.display = "none";
	document.getElementById("RegisterSection").style.display = "none";
    document.getElementById("CommentsSection").style.display = "none";
    document.getElementById("bookSearch").style.display = "none";
    document.getElementById("bluSearch").style.display = "none";
	document.getElementById("LoginSection").style.display = "none";
}


function getBookData() { 
   var uri = "http://localhost:8188/Service.svc/booklist";
   var xhr = new XMLHttpRequest();
   xhr.open("GET", uri, true);
   xhr.setRequestHeader("Accept", "application/json");
   xhr.onload = function () {
	   var resp = JSON.parse(xhr.responseText);
	   var temp = "";
	   //alert(xhr.responseText);
	   for (i =0; i < resp.length; i++){
		   var bookId = resp[i].Id;
           var bookTitle = '<p>' + resp[i].Title + '</p>';
           var author = '<p>' + resp[i].AuthorInitials +" "+ resp[i].AuthorSurname + '</p>';
		   var bookImage = '<img src=" http://localhost:8188/Service.svc/bookimg?id=' + resp[i].Id + '" alt="pix" />';
           var button = '<button onclick="buyBook(\''+bookId+'\')"> BUY ME </button>';
           
		   temp += bookImage + button + bookTitle + author;
           document.getElementById('BooksSection').innerHTML = temp;
	   }
	   
   }
   xhr.send();
   
   
}

function buyBook(bookId){
	if(loggedIn == false){
		showLogin();
	}
	else{
		var uri = "http://localhost:8189/Service.svc/bookbuy?id=" + bookId;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", uri, true);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.onload = function () {
			var new_response = JSON.parse(xhr.responseText);
			alert(new_response);
		}
		xhr.send(null);
	}
}

function getBlurayData() {
    var uri = "http://localhost:8188/Service.svc/brlist";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var resp = JSON.parse(xhr.responseText);
        var temp = "<table></table>";
        //alert(xhr.responseText);
        for (i = 0; i < resp.length; i++) {
			var blurayId = resp[i].Id;
            var title = '<p>' + resp[i].Title + '</p>';
            var image = '<img src="http://localhost:8188/Service.svc/brimg?id=' + resp[i].Id + '" alt="pix" />';
            var button = '<button onclick="buyBluray(\''+blurayId+'\')"> BUY ME </button>';

            temp += '<tr>'+image+'</tr>' +'<tr>'+ button +'</tr>'+ '<tr>'+ title+'</tr>';
            document.getElementById('BluraySection').innerHTML = temp;
        }

    }
    xhr.send();


}

function buyBluray(blurayID){
	if(loggedIn == false){
		showLogin();
	}
	else{
		var uri = "http://localhost:8189/Service.svc/brbuy?id=" + blurayID;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", uri, true);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.onload = function () {
			var new_response = JSON.parse(xhr.responseText);
			alert(new_response);
		}
		xhr.send(null);
	}
}


function register() {
    var name = document.getElementById("User").value;
    var pass = document.getElementById("Pass").value;
    var add = document.getElementById("address").value;
    var uri = "http://localhost:8188/Service.svc/register";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", uri, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var jsonFormat = {
        "Address": add,
        "Name": name,
        "Password": pass
    }
    var new_v = JSON.stringify(jsonFormat);
    xhr.send(new_v);
    xhr.onload = function () {
        alert(xhr.responseText);
    }
}

function postComment() {
	console.log("hu");
    var xhr = new XMLHttpRequest();
    var name = document.getElementById("userName").value;
    var comment = JSON.stringify(document.getElementById("comment").value);
    var uri = "http://localhost:8188/Service.svc/comment?name=" + name;
    xhr.open("POST", uri, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        document.getElementById("frame").src = document.getElementById("frame").src;
    }
    name = JSON.stringify(name);
    xhr.send(comment);
}

function bookSearch() {
    var uri = "http://localhost:8188/Service.svc/booksearch?term=" + document.getElementById("bookSearchBar").value;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var resp = JSON.parse(xhr.responseText);
        console.log(resp);
        showBookList(resp);
    }
    xhr.send();
}
function showBookList(books) {
    var temp = "";
    for (i = 0; i < books.length; i++) {
        var bookTitle = '<p>' + books[i].Title + '</p>';
        var author = '<p>' + books[i].AuthorInitials + " " + books[i].AuthorSurname + '</p>';
        var bookImage = '<img src="http://localhost:8188/Service.svc/bookimg?id=' + books[i].Id + '" alt="pix" />';
        var button = '<a href ="http://localhost:8189/Service.svc/bookbuy?id=' + books[i].Id + '"> BUY ME </a>';

        temp += bookImage + button + bookTitle + author;
        document.getElementById('BooksSection').innerHTML = temp;
    }
}

function bluraySearch() {
    var uri = "http://localhost:8188/Service.svc/brsearch?term=" + document.getElementById("bluSearchBar").value;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var resp = JSON.parse(xhr.responseText);
        showBlurayList(resp);
    }
    xhr.send();
}
function showBlurayList(movies) {
    var temp = "";
    for (i = 0; i < movies.length; i++) {
        var title = '<p>' + movies[i].Title + '</p>';
        var image = '<img src="http://localhost:8188/Service.svc/brimg?id=' + movies[i].Id + '" alt="pix" />';
        var button = '<a href ="http://localhost:8189/Service.svc/brbuy?id=' + movies[i].Id + '"> BUY ME </a>';
        temp += '<tr>' + image + '</tr>' + '<tr>' + button + '</tr>' + '<tr>' + title + '</tr>';
        document.getElementById('BluraySection').innerHTML = temp;
    }
}
function showLogin(){
	if(loggedIn == true){
		document.getElementById("username").value = "";
		document.getElementById("password").value = "";
		document.getElementById("Login").innerHTML = "Login";
		loggedIn = false;
		
	}
	
	
	if (currentTab != "Login") {
        currentTab = "Login";
        showNoTabs();
        document.getElementById("Login").style.backgroundColor = "lightBlue";
        document.getElementById("LoginSection").style.display = "inline";
	}
	
}

function checkLogin(){
	var xhr = new XMLHttpRequest()
	var usname = document.getElementById("username").value;
	var pass1 = document.getElementById("password").value;
	var uri = "http://localhost:8189/Service.svc/user";
	xhr.open("GET", uri, true, usname, pass1);
	xhr.withCredentials = true;
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(null);
	loggedIn = true;
	xhr.onload = function(){
		if(xhr.status != 200){
			alert("Username or Password incorrect");
			showLogin();
			
		}
		else{
			alert("You've logged in!");
			showHome();
			document.getElementById("Login").innerHTML = "Logout";
			
		}
	}
}
	

window.onload = function () {
    showHome();
}