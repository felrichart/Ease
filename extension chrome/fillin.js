console.log("Ease plugin : ready to fill in");

chrome.runtime.onMessage.addListener(
    
    function(msg, sender, sendResponse) {
        if(msg.msg == "fill"){
            console.log('Ease plugin : filling form');
            var fields = msg.fields;
            var infos = msg.infos;
            var formMinLength = msg.formAction.length;
            for(var i in fields){
                //var fieldsList = document.getElementsByName(fields[i].name);
                var fieldsList = document.getElementsByTagName('a');
                console.log("searching for matching field with name : "+fields[i].name+" matching with form : "+msg.formAction);
                console.log(fieldsList);
                for (var j in fieldsList){
                    console.log("form action of the field number " + j + " : " + fieldsList.item(j).form.action.slice(0,formMinLength));
                    if(fieldsList.item(j).form.action.slice(0,formMinLength) == msg.formAction){
                        console.log("this field match the criteria");
                        fieldsList.item(j).value=infos[fields[i].value];
                    }
                }
            }
        }
        
    }
);

/*chrome.runtime.onMessage.addListener(
    
    function(params, sender, sendResponse) {
      
        console.log('Ease plugin : filling form at '+ params.urlLogin);
      
        if(document.getElementById(params.passField) == null){
            
            if(document.getElementById(params.userField) == null){ //user already connected
                if (document.URL != params.urlHome){
                    window.open(params.urlHome,"_self");
                }
                sendResponse({"alreadyConnected" : true})
            }
            
            else { //username only
                document.getElementById(params.userField).value = params.user;
                document.getElementById(params.button).click();
            }
        }
        else {
            
            if(document.getElementById(params.userField)== null){//password only
                document.getElementById(params.passField).value = params.pass;
                document.getElementById(params.button).click();
                sendResponse({"alreadyConnected" : false});
            }
            
            else {
                document.getElementById(params.userField).value = params.user;
                document.getElementById(params.passField).value = params.pass;
                document.getElementById(params.button).click();
                sendResponse({"alreadyConnected" : false});    
            }
        }

});


  overlay = function(params) {          
          console.log('Ease plugin : overlay at '+ params.urlLogin);
        
        var sheet = window.document.styleSheets[0]
        var csslines1 = '.overlay {height: 100%;width: 100%;position: fixed;z-index: 1;left: 0;top: 0;background-color:rgba(127,127,127, 0.9);overflow-x: hidden;}';
        
        sheet.insertRule(csslines1, sheet.cssRules.length);
        
        var lineshtml = '<!-- The overlay -->\
    <div id="loading page" class="overlay">\
\
  <!-- Overlay content -->\
 <div style="display:block;position: absolute;top: 50%; left: 50%;transform: translate(-50%,-50%);">\
    <img src="http://i.giphy.com/l46C731L5I8go6Zfq.gif" />\
  </div>\
\
</div>\
';
    document.body.innerHTML += lineshtml;    
      
}*/
