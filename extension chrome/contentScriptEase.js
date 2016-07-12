//active when localhost:8080/ease is active

console.log("i'm listening to Ease");

//this listen when the event 'NewConnection' is dispatched by localhost:8080/ease
document.addEventListener("NewConnection", function(e){
    chrome.runtime.sendMessage('', function(response) {//send a message to the background. Right now no message. Soon user infos and targeted website.
        console.log("request sent");
   });
}, false);