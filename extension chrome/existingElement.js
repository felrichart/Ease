
chrome.runtime.onMessage.addListener(
    function(msg, sender, sendResponse) {
        if(msg.msg == "existingElement"){
            var element = msg.element;
            var existing = false;
                
            if(element.id){
                if(document.getElementById(element.id)){existing = true;}
                
            } else {
                    
                var elements = document.getElementsByTagName(element.tagName);
                for (var j in elements){
                    delete element.tagName;
                    var goodElement = true;
                    for(key in element){
                        if(element[key]!=elements[j][key]){
                            goodElement = false;
                            break;
                        }
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