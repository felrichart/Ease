//Background scripts. Listening to page content

console.log('socket launching');
var socket = io.connect('http://localhost:8080/');

//listen to content script for message
chrome.runtime.onMessage.addListener(
  function(msg) {//right now no message. Soon user info and targeted website
      console.log('i got the message, i must ask server cookies for ieseg-online, user: benjamin prigent');
      getCookies();
      
});

//ask the server the cookies of the session
function getCookies(){
    console.log('i ask server cookies for ieseg-online, user: benjamin prigent');
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
        
        for(i in cookies) {
            
            //modify slightly the cookie to match the chrome.cookies.set function
            cookies[i].url = "https://www.ieseg-online.com";
            cookies[i].httpOnly = cookies[i].httponly;
            delete cookies[i].domain;
            delete cookies[i].httponly;
            console.log(JSON.stringify(cookies[i]));
            
            //set cookies in chrome
            chrome.cookies.set(cookies[i],function(){
                console.log('cookie ' + i + ' created successfully');
                if (i==cookies.length - 1){ return callback(true); }//when all cookies are set, callback (function end)
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

//when all cookies are set, send a message to content script to warn ease page
function end(msg){
    if(msg){
        console.log('all cookies are set');
        chrome.tabs.query({url : 'http://localhost:8080/ease'}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {}, function(response) {console.log('open Ieseg online now');});
        });
    }
}
