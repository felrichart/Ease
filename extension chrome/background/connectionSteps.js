//Script principal. C'est lui qui parse le json du site et qui décide des actions à effectuer. C'est ici que commence et se termine la connection.

//listener qui attend un message du script easeListener pour lancer une connection
chrome.runtime.onMessage.addListener(
    function(msg, sender, sendResponse) {
        //Si le message reçu est bien un message de connection, on lance la fonction logIn.
        //Le second argument de la fonction logIn est "null" si on ouvre dans un nouveau tab, et "sender.tab" si on ouvre dans le même tab que Ease.
        if(msg.msg = "connectThisGuy"){
          console.log("Ease plugin : request for connection to " + msg.params.connection.website + " recievied");
          logIn(msg.params, null/*sender.tab*/);
      }
    }      
);

//initialise une connection classique ou une connection spéciale (facebook, linkedin, ...)
function logIn(params, tab){
        if(params.infos.fbConnect){
            nextStep(tab, params.connection.facebookConnectionSteps, params, 0, endConnection);
        } else {
            nextStep(tab, params.connection.connectionSteps, params, 0, endConnection);
        }
}

//exécute l'étape i de la connection, puis est rappelée à i+1
//c'est ici que toutes les actions sont lancées
function nextStep(tab, steps, params, i, callback){
    
    if(steps[i]){
        var step = steps[i];//variable qui représente l'étape de connection à executer
        console.log("New action : " + step.action +", step number "+i);
        switch(step.action){
            case "goTo"://dans le script navigate.js
                goTo(tab, step, params, function(newTab){
                    nextStep(newTab, steps, params, i+1, callback);
                });
                break;
            case "do"://dans le script action.js
                action(tab, step, params, function(){
                    nextStep(tab, steps, params, i+1, callback);
                });
                break;
            case "nextPage"://dans le script navigate.js
                nextPage(tab, step, params, function(newTab){
                    nextStep(newTab, steps, params, i+1, callback);
                });
                break;
            case "catchFail"://dans le script catchFails.js
                catchFail(tab, step, params, function(newTab){
                    nextStep(newTab, steps, params, i+1, callback);      
                });
                break;
                
            //si c'est une connection via facebook, les étapes avant la connection via facebook sont exécutées, puis on relance logIn mais sur le json de la connection facebook.
            case "facebookConnection":
                params.connection = facebookConnectionJson;
                params.infos.fbConnect = false;
                logIn(params, tab);
                break;
                
            //En cas d'arrêt prématurée des étapes de connection.
            case "end":
                endConnection(tab);
                break;
        }
    } else {
        callback(tab);
    }
}


function endConnection(tab){
    deleteOverlay(tab);
    console.log("end connection");
}