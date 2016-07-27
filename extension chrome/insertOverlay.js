function insertOverlay(tab){
    chrome.tabs.executeScript(tab.id, {"file":'overlay.js'},function(){
        chrome.tabs.sendMessage(tab.id, {"msg":"insertOverlay"}, function(response){});
    });
}

function deleteOverlay(tab){
    chrome.tabs.sendMessage(tab.id, {"msg":"deleteOverlay"}, function(response){});
}