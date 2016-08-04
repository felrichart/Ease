//div de l'overlay
var overlay = document.createElement('div');
    overlay.id = "loading page ease";
    overlay.style = "height: 100%;width: 100%;position: fixed;z-index: 2147483640;left: 0;top: 0;background-color:rgba(127,127,127, 0.9);overflow-x: hidden; visibility: visible;";
var insideOverlay = document.createElement('div');
    insideOverlay.style = "display:block;position: absolute;top: 50%; left: 50%;transform: translate(-50%,-50%); visibility: visible;";
var image = document.createElement('img');
    image.src = "http://i.giphy.com/l46C731L5I8go6Zfq.gif";  //lien vers l'overlay
    image.style = "visibility: visible;";
insideOverlay.appendChild(image);
overlay.appendChild(insideOverlay);

//insertion de la div si elle n'est pas là
var alreadyHere = document.getElementById("loading page ease");
if(!alreadyHere){document.body.insertBefore(overlay, document.body.firstChild);}

//listener qui attend le message du background pour supprimer l'overlay s'il est présent
chrome.runtime.onMessage.addListener(
  function(msg, sender, sendResponse) {
      
      if(msg.msg == "deleteOverlay"){
          console.log('Ease plugin : deleting overlay');
          var response = "No overlay to delete";
          var alreadyHere = document.getElementById("loading page ease");
          if(alreadyHere) {alreadyHere.parentElement.removeChild(alreadyHere); response = "Overlay deleted";}
          
          sendResponse(response);
          
      }
});

