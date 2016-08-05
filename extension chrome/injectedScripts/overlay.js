var imageUrl = "http://science-all.com/images/wallpaper/wallpaper-08.jpg";

//div de l'overlay
var overlay = document.createElement('div');
    overlay.id = "loading page ease";
    overlay.style = "background-image: url("+imageUrl+"); height: 100%;width: 100%;position: fixed;z-index: 2147483640;left: 0;top: 0;background-color:rgba(127,127,127, 1);overflow-x: hidden; visibility: visible;";
var loading = document.createElement('div');
    loading.className = "cs-loader";
var loadingInner = document.createElement('div');
    loadingInner.className = "cs-loader-inner";
var ball1 = document.createElement('label');
    ball1.innerHTML = " ●";
var ball2 = document.createElement('label');
    ball2.innerHTML = "	●";
var ball3 = document.createElement('label');
    ball3.innerHTML = "	●";
var ball4 = document.createElement('label');
    ball4.innerHTML = "	●";
var ball5 = document.createElement('label');
    ball5.innerHTML = "	●";
var ball6 = document.createElement('label');
    ball6.innerHTML = "	●";
/*var image = document.createElement('img');
    image.src = "http://i.giphy.com/l46C731L5I8go6Zfq.gif";  //lien vers l'overlay
    image.style = "visibility: visible;";
insideOverlay.appendChild(image);*/
loadingInner.appendChild(ball1);
loadingInner.appendChild(ball2);
loadingInner.appendChild(ball3);
loadingInner.appendChild(ball4);
loadingInner.appendChild(ball5);
loadingInner.appendChild(ball6);
loading.appendChild(loadingInner);
overlay.appendChild(loading);

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

