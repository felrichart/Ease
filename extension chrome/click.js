console.log("Ease plugin : ready to click");

chrome.runtime.onMessage.addListener(
    
    function(msg, sender, sendResponse) {
      if(msg.msg == "click"){
           console.log('Ease plugin : clicking');
          
          var formMinLength = msg.formAction.length;
          
          var inputsList = document.getElementsByTagName('input');

                for (var j in inputsList){
                    if(inputsList.item(j).type == 'submit' && inputsList.item(j).form.action.slice(0,formMinLength) == msg.formAction){
                        inputsList.item(j).click();
                    }
                }
          
          var inputsList = document.getElementsByTagName('button');
                for (var j in inputsList){
                    if(inputsList.item(j).type == 'submit' && inputsList.item(j).form.action.slice(0,formMinLength) == msg.formAction){
                        //console.log(inputsList.item(j));
                        inputsList.item(j).click();
                    }
                }
        
            
      }
       
    }
);