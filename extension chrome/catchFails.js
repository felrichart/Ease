function catchFail(tab, fail, params, callback){
    check(tab, fail, params, function(response){
        if(response!="noFail") {handleFail(response, tab, fail, params, function(){});}
        else{console.log("no fail"); callback();}
    });
    
}

function check(tab, fail, params, callback){
    console.log("Possible fail if : "+ fail.if);
    switch(fail.if){
            
        case "redirected":
            checkRedirected(tab, fail, function(failed){
                if(failed){
                    callback(fail.send);
                }
                else {
                    callback("noFail");
                }
            });
            break;
            
        case "missingElement":
            checkMissingElement(tab, fail, params, function(failed){
                if(failed){
                    callback(fail.send);
                }
                else {
                    callback("noFail");
                }
            });
            break;
        case "existingElement":
            checkExistingElement(tab, fail, params, function(failed){
                if(failed){
                    callback(fail.send);
                }
                else {
                    callback("noFail");
                }
            });
            break;
    }
}

function checkRedirected(tab, fail, callback){
        if(fail.noFailUrl){
            if(tab.url==fail.noFailUrl){
                callback(false);
            } else {
                callback(true);
            }
        } else if(fail.failUrl){
            if(tab.url==failUrl){
                callback(true);
            } else {
                callback(false);
            }
        }
    
}

function checkMissingElement(tab, fail, params, callback){
    chrome.tabs.executeScript(tab.id, {file:'existingElement.js'},function(){
        chrome.tabs.sendMessage(tab.id, {"msg":"existingElement","element":params.connection.elements[fail.elementName]}, function(response){
            callback(!response);
        }); 
    });
}

function checkExistingElement(tab, fail, params, callback){
    chrome.tabs.executeScript(tab.id, {file:'existingElement.js'},function(){
        chrome.tabs.sendMessage(tab.id, {"msg":"existingElement","element":params.connection.elements[fail.elementName]}, function(response){
            callback(response);
        }); 
    });
}

function handleFail(response, tab, fail, params, callback){
    console.log("Fail : " + response);
    if(response == "wrongPassword"){
        console.log("fijeofij");
        chrome.tabs.executeScript(tab.id, {"code":"alert('Identifiant ou mot de passe incorrects./nRendez vous sur Ease pour le modifier ;)');"}, function(){});
    }
    nextStep(tab, fail.actionsIfFail, params, 0, callback);
}
