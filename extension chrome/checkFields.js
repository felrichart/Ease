
chrome.runtime.onMessage.addListener(
    function(msg, sender, sendResponse) {
        if(msg.msg == "checkFields"){
            var fields = msg.fields;
            var allFields = true;
            var noFields = true;
            
            for(var i in fields){
                console.log(fields[i]);
                var fieldsList = document.getElementsByName(fields[i]);
                console.log(fieldsList);
                if(fieldsList.length==0){
                    allFields = false;
                } else {
                    for (var j in fieldsList){
                        if(fieldsList.item(j).form.action == msg.formAction){
                            noFields = false;
                        }
                    }
                    if(noFields){
                        allFields = false;
                    }
                }
                
            }
            
            if(allFields){
                sendResponse("allFields");
            } else if(noFields){
                sendResponse("noFields");
            } else {
                sendResponse("someFields");
            }
            
        }
    });