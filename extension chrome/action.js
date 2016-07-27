console.log("Ease plugin : ready to do something");

chrome.runtime.onMessage.addListener(
    
    function(msg, sender, sendResponse) {
        if(msg.msg == "do"){
            
            
            console.log('Ease plugin : message recieved');
            
            var infos = msg.infos;
            var elementsToParse = msg.elements;
            var onElementsActions = msg.step.elements;
            
            console.log(elementsToParse);
            console.log(onElementsActions);
            
            function doAction(element, action){
                switch (action.action){
                    case "fill":
                        console.log("remplissons le champ");
                        element.value = infos[action.value];
                        break;
                    case "click":
                        console.log("cliquons");
                        element.click();
                        break;
                }
            }
            
            
            for (var i in onElementsActions){
                var action = onElementsActions[i];
                var identifiers = elementsToParse[action.name];
                console.log("nous cherchons l'élément : "+action.name +" dont la description est");
                console.log(identifiers);
                
                if(identifiers.id){
                    console.log("cet élément a une id");
                    var element = document.getElementById(identifiers.id);
                    if(element){doAction(element, action);}                    
                } else {
                    
                    var elements = document.getElementsByTagName(identifiers.tagName);
                    console.log("les éléments suivants ont le même tag :");
                    console.log(elements);
                    for (var j in elements){
                        console.log("insepectons l'élément "+ j);
                        delete identifiers.tagName;
                        var goodElement = true;
                        for(key in identifiers){
                            console.log("a t il le même "+key);
                            if(identifiers[key]!=elements[j][key]){
                                goodElement = false;
                                console.log("non, échec");
                                break;
                            }
                            console.log("oui, continue");
                        }
                        
                        if(goodElement){
                            console.log("c'était bien cet élément");
                            console.log(elements[j]);
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