//active when localhost:8080/ease is active

console.log("Ease plugin : waiting for request");

//this listen when the event 'NewConnection' is dispatched by localhost:8080/ease
document.addEventListener("NewConnection", function(event){
    chrome.runtime.sendMessage(event.detail, function(response) {
        console.log("Ease plugin : request for connection to " + event.detail.website + " sent");
   });
}, false);