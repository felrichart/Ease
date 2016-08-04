console.log("Ease plugin : waiting for request");

var extension = document.createElement('div');
    extension.id = "ease_extension";
    extension.style = "display: none;";
var alreadyHere = document.getElementById("ease_extension");
if(!alreadyHere){document.body.insertBefore(extension, document.body.firstChild);}

//écoute ease.space et envoie un message au background lorsque ease.space requiert une connection.
document.addEventListener("NewConnection", function(event){
            
        var msg = {};
        msg.msg = "connectThisGuy";
        msg.params = event.detail;
    
        chrome.runtime.sendMessage(msg, function(response) {
            console.log("Ease plugin : request for connection to " + event.detail.connection.website + " sent");
        });
    
}, false);

//TODO répondre à ease.space pour dire que tout s'est bien passé