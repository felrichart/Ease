//Ce script remplit des champs et clique sur des boutons.

chrome.runtime.onMessage.addListener(
    function(msg, sender, sendResponse) {
        
        if(msg.msg == "do"){
                        
            var infos = msg.infos;
            var elementsToParse = msg.elements;
            var onElementsActions = msg.step.elements;
            
            //fonction qui est appellée pour executer une action
            function doAction(element, action){
                switch (action.action){
                    case "fill":
                        element.value = infos[action.value];
                        break;
                    case "click":
                        element.click();
                        break;
                }
            }
            
            //itération sur la liste des actions à effectuer
            for (var i in onElementsActions){
                var action = onElementsActions[i];
                var identifiers = elementsToParse[action.name];
                
                //si le champs à une id, on fait l'action directement
                if(identifiers.id){
                    var element = document.getElementById(identifiers.id);
                    if(element){doAction(element, action);}       
                    
                //sinon on cherche le champs grâce à ses paramètres
                } else {
                    
                    var elements = document.getElementsByTagName(identifiers.tagName);
                    for (var j in elements){
                        delete identifiers.tagName;
                        var goodElement = true;
                        for(key in identifiers){
                            if(identifiers[key]!=elements[j][key]){
                                goodElement = false;
                                break;
                            }
                        }
                        
                        if(goodElement){
                            doAction(elements[j],action);
                            break;
                        }
                        
                        
                    }
                    
                }
                
            }
            
            sendResponse("done");
            
        }
        
    }
);