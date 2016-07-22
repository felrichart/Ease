    //http://stable-electron-135922.appspot.com/
var csslines1 = '.easeOverlay {height: 100%;width: 100%;position: fixed;z-index: 1;left: 0;top: 0;background-color:rgba(127,127,127, 0.9);overflow-x: hidden;}';

var lineshtml = '<!-- The overlay -->\
<div id="loading page" class="easeOverlay">\
\
  <!-- Overlay content -->\
 <div style="display:block;position: absolute;top: 50%; left: 50%;transform: translate(-50%,-50%);">\
    <img src="http://i.giphy.com/l46C731L5I8go6Zfq.gif" />\
  </div>\
\
</div>\
';

chrome.runtime.onMessage.addListener(
  function(msg) {

      if(msg.msg == "insertOverlay"){
          
          console.log('Ease plugin : inserting overlay');
          
          var sheet = window.document.styleSheets[0]
          sheet.insertRule(csslines1, sheet.cssRules.length);
          
          //document.body.innerHTML += "test test test test test";
          document.body.innerHTML += lineshtml;
      }
      if(msg.msg == "deleteOverlay"){
          console.log('Ease plugin : deleting overlay');
          
          var element = document.querySelector('div.easeOverlay');
          element.parentElement.removeChild(element);
          
          //document.body.innerHTML -= lineshtml;
      }
});

