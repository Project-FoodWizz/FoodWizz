// Load banner of the cookie policy
fetch('/Pages/Policy/cookies.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('cookie-placeholder').innerHTML = data;
    });

