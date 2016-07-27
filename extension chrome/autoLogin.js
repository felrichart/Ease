//Background scripts. Listening to page content

//listen to content script for message
chrome.runtime.onMessage.addListener(
  function(msg) {
      if(msg.msg = "connectThisGuy"){
          console.log("Ease plugin : request for connection to " + msg.params.connection.website + " recievied");
          logIn(msg.params);
      }
      
      
});


function logIn(params){
    var tab;
    if(params.infos.fbConnection){
        nextStep(tab, params.connection.facebookConnectionSteps, params, 0, function(){});
    } else {
        nextStep(tab, params.connection.connectionSteps, params, 0, function(){});
    }
        
}

function nextStep(tab, steps, params, i, callback){
    
    if(steps[i]){
        var step = steps[i];
        if(tab) {console.log("New action : " + step.action +", step number "+i + ", tab id : "+ tab.id +", status : "+tab.status+ ", url : "+tab.url);}
        else {console.log("New action : " + step.action +", step number "+i + ", no tab");}
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
        }
    } else {
        console.log("end connection");
        endConnection(tab);
        callback();
    }
}

function endConnection(tab){
    chrome.tabs.executeScript(tab.id, {"code":"document.getElementsByTagName('html')[0].style.visibility='visible';"}, function(){});
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
            chrome.tabs.executeScript(newTab.id, {"code":"document.getElementsByTagName('html')[0].style.visibility ='hidden';","runAt":"document_start"}, function(){});
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
    
         window.setTimeout(function(){
            console.log("time out");
            if(!updated){timedOut = true; callback();}
            
        }, 3000);
}


