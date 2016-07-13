//Background scripts. Listening to page content

//listen to content script for message
chrome.runtime.onMessage.addListener(
  function(params) {
      console.log("Ease plugin : request for connection to " + params.website + " recievied"); 
      logUser(params);
      
});

function logUser(params){
   chrome.tabs.create({"url":params.website}, function(tab){
        console.log(tab.id);
        chrome.tabs.executeScript(tab.id, {file:'fillin.js'},function(){
            chrome.tabs.sendMessage(tab.id, params, function(response) {});
        });
    });
    
}