chrome.commands.getAll(function(commands){
    console.log(commands);
});

chrome.commands.onCommand.addListener(function(command){
    if(command == "open-ease") {
        window.open('http://www.ease-app.co');
    }
});