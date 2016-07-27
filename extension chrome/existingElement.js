
chrome.runtime.onMessage.addListener(
    function(msg, sender, sendResponse) {
        if(msg.msg == "existingElement"){
            var element = msg.element;
            var existing = false;
            
            console.log("nous cherchons l'élément dont la description est");
            console.log(element);
                
            if(element.id){
                console.log("cet élément a une id");
                if(document.getElementById(element.id)){existing = true;}
                
            } else {
                    
                var elements = document.getElementsByTagName(element.tagName);
                for (var j in elements){
                    console.log("insepectons l'élément "+ j);
                    delete element.tagName;
                    var goodElement = true;
                    for(key in element){
                        console.log("a t il le même "+key);
                        if(element[key]!=elements[j][key]){
                            goodElement = false;
                            console.log("non, échec");
                            break;
                        }
                        console.log("oui, continue");
                    }
                        
                    if(goodElement){
                        existing = true;
                        break;
                    }   
                }
            }
            
            sendResponse(existing);

        }
    });