var buttonsContainer = document.getElementById("btns");

function getAllUsersName() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","https://jsonplaceholder.typicode.com/users");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {
            var users = JSON.parse(this.responseText);
            showButtons(users);
        }
    }
}

getAllUsersName();

function showButtons(usersName) {
    var btns = ``;
    for(var i = 0; i < usersName.length; i++) {
        btns+= `<button class = "btn" id = "${usersName[i].id}" onclick = getUserPost(this)>${usersName[i].name}</button>`;
    }
    buttonsContainer.innerHTML = btns;
}


function getUserPost(btn) {
    var userId = btn.getAttribute("id");
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET",`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {
            var userPosts = JSON.parse(this.responseText);
            displayUserPosts(userPosts);
            btnActive(btn);
        }
    }
}

function displayUserPosts(userPost) {
    var userTitle = document.getElementById("userTitle");
    var lis = ``;
    for(var i = 0; i < userPost.length; i++) {
        lis += `<li>${userPost[i].body}</li>`
    }
    userTitle.innerHTML = lis; 
}

function btnActive(button) {
    var btns = document.querySelectorAll(".btn");
    for(var i = 0; i < btns.length; i++) {
        if (button.getAttribute("id") == btns[i].getAttribute("id")) {
            btns[i].classList.add("active");
        } else {
            btns[i].classList.remove("active");
        }
    }
}