function insertOverlay(tab){
    chrome.tabs.executeScript(tab.id, {"code":"document.getElementsByTagName('html')[0].style.visibility = 'hidden';", "runAt":"document_start"},function(){
        chrome.tabs.executeScript(tab.id, {"file":'overlay.js'},function(){});
    });
}

function deleteOverlay(tab){
    chrome.tabs.sendMessage(tab.id, {"msg":"deleteOverlay"}, function(response){
        chrome.tabs.executeScript(tab.id, {"code":"document.getElementsByTagName('html')[0].style.visibility='visible';"}, function(){});
    });
}