//Background scripts. Listening to page content

//listen to content script for message
chrome.runtime.onMessage.addListener(
  function(params) {
      console.log("Ease plugin : request for connection to " + params.connection.website + " recievied"); 
      logIn(params);
      
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
        console.log("New action : " + step.action +", step number "+i);
        switch(step.action){
            case "goTo":
                goTo(tab, step, params, function(newTab){
                    nextStep(newTab, steps, params, i+1, callback);
                });
                break;
            case "fill":
                fill(tab, step, params, function(){
                    nextStep(tab, steps, params, i+1, callback);
                });
                break;
            case "click":
                click(tab, step, params, function(){
                    nextStep(tab, steps, params, i+1, callback);
                });
                break;
            case "nextPage":
                nextPage(tab, step, params, function(newTab){
                    nextStep(tab, steps, params, i+1, callback);
                });
                break;
            case "eraseCookies":
                eraseCookies(tab, steps, params, function(){
                    nextStep(tab, steps, params, i+1, callback);
                });
            case "logOut":
                nextStep(tab, params.connection.logOutSteps, params, 0, function(){
                    nextStep(tab, steps, params, i+1, callback);
                });
                break;
            case "retry":
                if(params.infos.fbConnection){
                    nextStep(tab, params.connection.facebookConnectionSteps, params, 0, callback);
                } else {
                    nextStep(tab, params.connection.connectionSteps, params, 0, callback);
                }
                break;
        }
    } else {
        endConnection(tab);
        callback();
    }
}


function goTo(tab, step, params, callback){
    
    if(tab){
        chrome.tabs.update(tab.id,{"url":step.url}, function(newTab){
            
            chrome.tabs.onUpdated.addListener(function whenTriggered(tabId, info, updatedTab){
                info.status;
                if (info.status == "complete" && newTab.id==tabId) {
                    insertOverlay(updatedTab);
                    chrome.tabs.onUpdated.removeListener(whenTriggered);
                    
                    doOrFail(updatedTab, step, params, function(){
                        callback(updatedTab);
                    });
                    
                }
            });
            
        });
        
    } else {
        chrome.tabs.create({"url":step.url}, function(newTab){
            
            chrome.tabs.onUpdated.addListener(function whenTriggered(tabId, info, updatedTab){
                info.status;
                if (info.status == "complete" && newTab.id==tabId) {
                    insertOverlay(updatedTab);
                    chrome.tabs.onUpdated.removeListener(whenTriggered);
            
                    doOrFail(updatedTab, step, params, function(){
                        callback(updatedTab);
                    });
            
                }
            });
            
        });
    }
}
                           
function fill(tab, step, params, callback){
    
    function execute() {
        console.log(tab.status);
        chrome.tabs.executeScript(tab.id, {file:'fillin.js'},function(){
            chrome.tabs.sendMessage(tab.id, {"msg":"fill","fields":step.fields,"formAction":step.formAction,"infos":params.infos}, function(){
                callback();
            }); 
        });
    }
    
    doOrFail(tab, step, params, execute);
}

function click(tab, step, params, callback){
    
    function execute() {
        chrome.tabs.executeScript(tab.id, {file:'click.js'},function(){
            chrome.tabs.sendMessage(tab.id, {"msg":"click","formAction":step.formAction}, function(){
                callback();
            }); 
        });
    }
    
    doOrFail(tab, step, params, execute);
}

function nextPage(tab, step, params, callback){
    chrome.tabs.onUpdated.addListener(function whenTriggered(tabId, info, newTab){
        info.status;
        if (info.status == "complete" && tab.id==tabId) {
            insertOverlay(newTab);
            chrome.tabs.onUpdated.removeListener(whenTriggered);
            
            doOrFail(newTab, step, params, function(){
                callback(newTab);
            });
            
        }
    });
}

function eraseCookies(tab, step, params, callback){
     function execute() {
         if(step.cookiesUrl){
             var url = step.cookiesUrl;
         } else {
             var url = tab.url;
         }
         chrome.cookies.getAll({"url":url}, function(cookieList){
             
             var lastCookie = 0;
             if(cookieList.length==0){
                 chrome.tabs.reload(tab.id, function(){
                     callback();
                 });
             }
             for (var i in cookieList){
                 var cookie = cookieList[i];
                 
                 chrome.cookies.remove({"url":tab.url, "name":cookie.name}, function(){
                     lastCookie++;
                     
                     if(lastCookie==cookieList.length){
                         chrome.tabs.reload(tab.id, function(){
                             
                             callback();
                         });
                     }
                 });
             }
         });

    }
    
    doOrFail(tab, step, params, execute);
}

function insertOverlay(tab){
    /*chrome.tabs.executeScript(tab.id, {file:'overlay.js'},function(){
        chrome.tabs.sendMessage(tab.id, {"msg":"insertOverlay"}, function(){});
    });*/
}

function endConnection(tab){
    //chrome.tabs.sendMessage(tab.id, {"msg":"deleteOverlay"}, function(){});
}


function doOrFail(tab, step, params, callback){
    
    if(step.fail){
        check(tab, step.fail, params, function(response){
            if(response!="no fail") {handleFail(response, tab, step, params, function(){});}
            else{callback();}
        });
    } else if(step.fails){
        for(var i in step.fails){
            var fail = step.fails[i];
            check(tab, fail, params, function(response){
                if(response!="no fail") {handleFail(response, tab, step, params, function(){});}
                else{callback();}
            });
        }
    } else {callback();}
    
}

function check(tab, fail, params, callback){
    console.log("Possible fail if : "+ fail.if);
    switch(fail.if){
            
        case "redirected":
            checkRedirected(tab, fail, function(failed){
                if(failed){
                    nextStep(tab, fail.actions, params, 0, function(){
                        callback(fail.send);
                    });
                    
                }
                else {
                    callback("no fail");
                }
            });
            break;
            
        case "missingFields":
            checkMissingFields(tab, fail, function(failed){
                if(failed){
                    nextStep(tab, fail.actions, params, 0, function(){
                        callback(fail.send);
                    });
                }
                else {
                    callback("no fail");
                }
            });
            break;
        case "existingFields":
            checkExistingFields(tab, fail, function(failed){
                if(failed){
                    nextStep(tab, fail.actions, params, 0, function(){
                        callback(fail.send);
                    });
                }
                else {
                    callback("no fail");
                }
            });
            break;
    }
}

function checkRedirected(tab, fail, callback){

            if(tab.url==fail.noFailUrl){
                callback(false)
            }
            else {
                callback(true);
            }
    
}

function checkMissingFields(tab, fail, callback){
    chrome.tabs.executeScript(tab.id, {file:'checkFields.js'},function(){
        chrome.tabs.sendMessage(tab.id, {"msg":"checkFields","fields":fail.fields,"formAction":fail.formAction}, function(response){
            if(response=="noFields"){
                callback(true);
            }
            else {
                callback(false);
            }
        }); 
    });
}

function checkExistingFields(tab, fail, callback){
    chrome.tabs.executeScript(tab.id, {file:'checkFields.js'},function(){
        chrome.tabs.sendMessage(tab.id, {"msg":"checkFields","fields":fail.fields,"formActio":fail.formAction}, function(response){
            if(response=="allFields"){
                callback(true);
            }
            else {
                callback(false);
            }
        }); 
    });
}

function handleFail(response, tab, step, params, callback){
    console.log("Fail : " + response);
}//ToDo
