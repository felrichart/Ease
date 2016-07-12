//Background scripts. Listening to page content

console.log('socket launching');
var socket = io.connect('http://localhost:8080/');

//listen to content script for message
chrome.runtime.onMessage.addListener(
  function(msg) {//right now no message. Soon user info and targeted website
      console.log('i got the message, i must ask server cookies for facebook');
      //test();
      getCookies();
      
});

function test(){
    window.open('https://www.facebook.com');
    chrome.tabs.highlight({'tabs':0});
}

//ask the server the cookies of the session
function getCookies(){
    console.log('i ask server cookies for facebook');
    socket.emit('getCookies', 'I want cookies ');
}

//listen to server to get cookies
socket.on('setCookies', function(message) {
    setCookies(message,end);
});

//set cookies in the browser
function setCookies(cookies, callback) {
    
    console.log("Setting cookies ...");
    console.log(cookies);
    
    if (cookies !== null){ 
        console.log(cookies.length);
        var j = 0;
        for(var i = 0;i<cookies.length-1;i++) {
            
            //modify slightly the cookie to match the chrome.cookies.set function
            cookies[i].url = "https://www.facebook.com";
            cookies[i].httpOnly = cookies[i].httponly;
            cookies[i].expirationDate = cookies[i].expiry;
            delete cookies[i].expiry;
            delete cookies[i].expires;
            delete cookies[i].domain;
            delete cookies[i].httponly;
            
            //set cookies in chrome
            chrome.cookies.set(cookies[i],function(){
                j++;
                console.log('cookie ' + j + ' created successfully');
                if (j==cookies.length-1){ return callback(true); }//when all cookies are set, callback (function end)
            });

        }
    
    } 
    else
    {
        // yes, cookie was already present 
        console.log('no cookie', cookie);
        return callback(false);
    }
    
}

//when all cookies are set, open the web page
function end(msg){
    if(msg){
        console.log('all cookies are set');
        window.open('https://www.facebook.com');
    }
}
