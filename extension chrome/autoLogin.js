//Background scripts. Listening to page content

//listen to content script for message
chrome.runtime.onMessage.addListener(
    
    function(msg, sender, sendResponse) {
      if(msg.msg = "connectThisGuy"){
          console.log("Ease plugin : request for connection to " + msg.params.connection.website + " recievied");
          logIn(msg.params, null/*sender.tab*/);
      }
    }      
);


function logIn(params, tab){
        console.log(tab);
        if(params.infos.fbConnect){
            nextStep(tab, params.connection.facebookConnectionSteps, params, 0, function(){});
        } else {
            nextStep(tab, params.connection.connectionSteps, params, 0, function(){});
        }
        
}

function nextStep(tab, steps, params, i, callback){
    
    if(steps[i]){
        var step = steps[i];
        console.log("New action : " + step.action +", step number "+i);
        switch(step.action){
            case "goTo":
                goTo(tab, step, params, function(newTab){
                    nextStep(newTab, steps, params, i+1, callback);
                });
                break;
            case "do":
                action(tab, step, params, function(){
                    nextStep(tab, steps, params, i+1, callback);
                });
                break;
            case "nextPage":
                nextPage(tab, step, params, function(newTab){
                    nextStep(tab, steps, params, i+1, callback);
                });
                break;
            case "catchFail":
                catchFail(tab, step, params, function(){
                    nextStep(tab, steps, params, i+1, callback);      
                });
                break;
            case "facebookConnection":
                params.connection = facebookConnectionJson;
                params.infos.fbConnect = false;
                logIn(params, tab);
                break;
        }
    } else {
        console.log("end connection");
        endConnection(tab);
        callback();
    }
}

function endConnection(tab){

    deleteOverlay(tab);
}

function goTo(tab, step, params, callback){
    
    var url = params.connection.urls[step.url];
    
    if(tab){
        chrome.tabs.update(tab.id,{"url":url}, function(newTab){
            insertOverlay(newTab);
            chrome.tabs.onUpdated.addListener(function whenTriggered(tabId, info, updatedTab){
                insertOverlay(newTab);
                if (info.status == "complete" && newTab.id==tabId) {
                    chrome.tabs.onUpdated.removeListener(whenTriggered);
                    
                    callback(updatedTab);
                    
                }
            });
            
        });
        
    } else {
        chrome.tabs.create({"url":url}, function(newTab){
            
            insertOverlay(newTab);
            
            
            chrome.tabs.onUpdated.addListener(function whenTriggered(tabId, info, updatedTab){
                insertOverlay(newTab);
                if (info.status == "complete" && newTab.id==tabId) {
                    chrome.tabs.onUpdated.removeListener(whenTriggered);

                    callback(updatedTab);
            
                }
            });
            
        });
    }
}
                           
function action(tab, step, params, callback){
    

        chrome.tabs.executeScript(tab.id, {file:'action.js'},function(){
            chrome.tabs.sendMessage(tab.id, {"msg":"do","step":step,"elements":params.connection.elements,"infos":params.infos}, function(response){
                callback();
            }); 
        });
        
       
}

function nextPage(tab, step, params, callback){
        
        var timedOut = false;
        var updated = false;
    
        window.setTimeout(function(){
            if(!updated){console.log("time out"); timedOut = true; callback();}
        }, 2000);
        
        chrome.tabs.onUpdated.addListener(function whenTriggered(tabId, info, newTab){
            
            updated = true;
            
            if(timedOut){
                chrome.tabs.onUpdated.removeListener(whenTriggered);
            } else {                
            
                if(step.lastPage){deleteOverlay(newTab);}
                else{insertOverlay(newTab);}
                if (tab.id==tabId && info.status == "complete") {
                    chrome.tabs.onUpdated.removeListener(whenTriggered);
                    callback();
                }
            }
        });
    
}


