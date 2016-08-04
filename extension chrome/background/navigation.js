//C'est dans les fonctions suivantes qu'est inséré l'overlay

//Fonction qui va à une url, dans le même tab si un tab est passé en argument, dans un nouveau tab si null est passé en argument
function goTo(tab, step, params, callback){
    
    var url = params.connection.urls[step.url];
    
    if(tab){
        chrome.tabs.update(tab.id,{"url":url}, function(newTab){
            
            if(!step.lastPage){insertOverlay(newTab);}
            
            //Listener attendant que la page soit completement chargée avant de passer à la suite
            chrome.tabs.onUpdated.addListener(function whenTriggered(tabId, info, updatedTab){
                if (info.status == "complete" && newTab.id==tabId) {
                    chrome.tabs.onUpdated.removeListener(whenTriggered);
                    callback(updatedTab);
                    
                }
            });
            
        });
        
        
    } else {
        chrome.tabs.create({"url":url}, function(newTab){
            
            if(!step.lastPage){insertOverlay(newTab);}
            
            //Listener attendant que la page soit completement chargée avant de passer à la suite
            chrome.tabs.onUpdated.addListener(function whenTriggered(tabId, info, updatedTab){
                if (info.status == "complete" && newTab.id==tabId) {
                    chrome.tabs.onUpdated.removeListener(whenTriggered);
                    callback(updatedTab);
            
                }
            });
            
        });
    }
}
                           

//Fonction qui attend que la page suivante soit chargée. Si au bout de trois secondes, aucune page n'a commencée à charger, cela signifie qu'elle était déja entièrement chargée avant l'execution de cette fonction et on passe à la suite
function nextPage(tab, step, params, callback){
        
        var timedOut = false;
        var updated = false;
    
        if(!step.lastPage){insertOverlay(tab);}
    
        window.setTimeout(function(){
            if(!updated && tab.status!="loading"){console.log("time out"); timedOut = true; callback(tab);}
        }, 3000);//on attend 3 secondes parce que ieseg online met 2 secondes et demi pour commencer le chargement de la page suivante
        
        
        //Listener attendant que la page soit completement chargée ou que le temps soit écoulé avant de passer à la suite
        chrome.tabs.onUpdated.addListener(function whenTriggered(tabId, info, newTab){
            
            updated = true;
            if(timedOut){
                chrome.tabs.onUpdated.removeListener(whenTriggered);
            } else {                
                if (tab.id==tabId && info.status == "complete") {
                    chrome.tabs.onUpdated.removeListener(whenTriggered);
                    callback(newTab);
                }
            }
        });
    
}
