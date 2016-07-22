console.log('hello');
var lines =     '<!-- The overlay -->\
<div id="myNav" class="overlay" style="/* The Overlay (background) */\
.overlay {\
    /* Height & width depends on how you want to reveal the overlay (see JS below) */\
    height: 100%;\
    width: 100%;\
    position: fixed; /* Stay in place */\
    z-index: 1; /* Sit on top */\
    left: 0;\
    top: 0;\
    background-color: rgb(0,0,0); /* Black fallback color */\
    background-color: rgba(0,0,0, 0.9); /* Black w/opacity */\
    overflow-x: hidden; /* Disable horizontal scroll */\
    transition: 0.5s; /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */\
}\

/* Position the content inside the overlay */\
.overlay-content {\
    position: relative;\
    top: 25%; /* 25% from the top */\
    width: 100%; /* 100% width */\
    text-align: center; /* Centered text/links */\
    margin-top: 30px; /* 30px top margin to avoid conflict with the close button on smaller screens */\
}\
\
/* The navigation links inside the overlay */\
.overlay a {\
    padding: 8px;\
    text-decoration: none;\
    font-size: 36px;\
    color: #818181;\
    display: block; /* Display block instead of inline */\
    transition: 0.3s; /* Transition effects on hover (color) */\
}\

/* When you mouse over the navigation links, change their color */\
.overlay a:hover, .overlay a:focus {\
    color: #f1f1f1;\
}\

/* Position the close button (top right corner) */\
.closebtn {\
    position: absolute;\
    top: 20px;\
    right: 45px;\
    font-size: 60px !important; /* Override the font-size specified earlier (36px) for all navigation links */\
}\

/* When the height of the screen is less than 450 pixels, change the font-size of the links and position the close button again, so they dont overlap */\
@media screen and (max-height: 450px) {\
    .overlay a {font-size: 20px}\
    .closebtn {\
        font-size: 40px !important;\
        top: 15px;\
        right: 35px;\
    }\
}">\

  <!-- Button to close the overlay navigation \
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>-->\

  <!-- Overlay content -->\
  <div class="overlay-content">\
    <a href="#">About</a>\
    <a href="#">Services</a>\
    <a href="#">Clients</a>\
    <a href="#">Contact</a>\
  </div>\

</div>\

<!-- Use any element to open/show the overlay navigation menu \
<span onclick="openNav()">open</span>-->\
'

document.body.innerHTML += lines;