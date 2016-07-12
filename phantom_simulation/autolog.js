//Phantom is opened and managed here

console.log("Starting autologin");

var page = require('webpage').create();

var cookies;    

page.open("https://www.facebook.com/login.php", function(status) {
    
    if ( status === "success" ) {
        
        
        //to display console message
        page.onConsoleMessage = function(msg) {
            console.log('CONSOLE: ' + msg);
        };
        
        //when login is done
        page.onLoadFinished = function(){
            console.log("logged in --> OK");
            console.log('Landing URL : ' + page.url);
            cookies = page.cookies; //get the cookies
            var cookiesToString = JSON.stringify(cookies); //stringify cookies to return them in stdout
            console.log("cookies->"+cookiesToString);
            page.render("./screenshots/after_log.png"); //create a screenshot of the final page (only usefull for dev)
            phantom.exit(); //close phantom JS
        };
        
        page.render("./screenshots/before_log.png"); //create a screenshot of the starting page (only usefull for dev)

        page.evaluate(function() {//this write on the page to connect user
            
            document.querySelector("#email").value = ""; // #username is the selector of the field
            console.log("Login submitted!");
            document.querySelector("#pass").value = ""; // #password is the selector of the field
            console.log("Psswrd submitted!");
            
            document.getElementById("loginbutton").click();  // now click the button // #login is the selector of the FORM
            console.log("clicked");
        });
                
   }
});