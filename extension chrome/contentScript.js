//active when localhost:8080/ease is active

console.log("Ease plugin : waiting for request");

//this listen when the event 'NewConnection' is dispatched by ease
document.addEventListener("NewConnection", function(event){
            
        var msg = {};
        msg.msg = "connectThisGuy";
        msg.params = event.detail;

        chrome.runtime.sendMessage(msg, function(response) {
            console.log("Ease plugin : request for connection to " + event.detail.connection.website + " sent");
        });
    
}, false);