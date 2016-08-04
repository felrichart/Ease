
//injecte le script fillIn.js puis envoie un message à ce script avec les paramêtres des champs à remplir et leur contenu
function action(tab, step, params, callback){

        chrome.tabs.executeScript(tab.id, {file:'injectedScripts/fillIn.js'},function(){
            chrome.tabs.sendMessage(tab.id, {"msg":"do","step":step,"elements":params.connection.elements,"infos":params.infos}, function(response){
                callback();
            }); 
        });   
}