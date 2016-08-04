//Cette fonction envoie le fail à checker et execute handleFail si le fail est bien présent
function catchFail(tab, fail, params, callback){
    check(tab, fail, params, function(response){
        if(response!="noFail") {handleFail(response, tab, fail, params, callback);}
        else{console.log("no fail"); callback(tab);}
    });
    
}

//Cette fonction check la condition de fail
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

//vérifie si la page à été redirigée. Si la page l'a été, renvoie true
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

//injecte le script existingElement.js et lui envoie en paramêtre l'élément à checker. Si l'élément est absent, renvoie true
function checkMissingElement(tab, fail, params, callback){
    chrome.tabs.executeScript(tab.id, {file:'injectedScripts/existingElement.js'},function(){
        chrome.tabs.sendMessage(tab.id, {"msg":"existingElement","element":params.connection.elements[fail.elementName]}, function(response){
            callback(!response);
        }); 
    });
}

//injecte le script existingElement.js et lui envoie en paramêtre l'élément à checker. Si l'élément est présent, renvoie true
function checkExistingElement(tab, fail, params, callback){
    chrome.tabs.executeScript(tab.id, {file:'injectedScripts/existingElement.js'},function(){
        chrome.tabs.sendMessage(tab.id, {"msg":"existingElement","element":params.connection.elements[fail.elementName]}, function(response){
            callback(response);
        }); 
    });
}

function handleFail(response, tab, fail, params, callback){
    console.log("Fail : " + response);
    if(response == "wrongPassword"){
        chrome.tabs.executeScript(tab.id, {"code":"alert('Identifiant ou mot de passe incorrects.\nRendez vous sur Ease pour le modifier ;)');"}, function(){});
    }
    nextStep(tab, fail.actionsIfFail, params, 0, callback);
}
