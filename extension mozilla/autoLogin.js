//Background scripts. Listening to page content

//listen to content script for message
chrome.runtime.onMessage.addListener(
  function(params) {
      console.log("Ease plugin : request for connection to " + params.urlHome + " recievied"); 
      logUser(params);
      
});

function logUser(params){
   chrome.tabs.create({"url":params.urlLogin}, function(tab){
        chrome.tabs.executeScript(tab.id, {file:'overlay.js', runAt:'document_start'},function(){
            chrome.tabs.executeScript(tab.id, {file:'fillin.js'},function(){
                chrome.tabs.sendMessage(tab.id, params, function(response) {});
            });
        });
    });
    
}

// A FAIRE : UPDATE DU PLUGIN