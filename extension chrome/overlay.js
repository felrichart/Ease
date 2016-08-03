var overlay = document.createElement('div');
overlay.id = "loading page ease";
overlay.style = "height: 100%;width: 100%;position: fixed;z-index: 2147483640;left: 0;top: 0;background-color:rgba(127,127,127, 0.9);overflow-x: hidden; visibility: visible;";
var insideOverlay = document.createElement('div');
insideOverlay.style = "display:block;position: absolute;top: 50%; left: 50%;transform: translate(-50%,-50%); visibility: visible;";
var image = document.createElement('img');
image.src = "http://i.giphy.com/l46C731L5I8go6Zfq.gif";
image.style = "visibility: visible;";
insideOverlay.appendChild(image);
overlay.appendChild(insideOverlay);
          
var alreadyHere = document.getElementById("loading page ease");
console.log(document);
if(!alreadyHere){document.body.insertBefore(overlay, document.body.firstChild);}

chrome.runtime.onMessage.addListener(
  function(msg) {
      
      if(msg.msg == "deleteOverlay"){
          console.log('Ease plugin : deleting overlay');
          
          var alreadyHere = document.getElementById("loading page ease");
          if(alreadyHere) {alreadyHere.parentElement.removeChild(alreadyHere);}
          
      }
});

