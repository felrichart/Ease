
chrome.runtime.onMessage.addListener(
    //http://stable-electron-135922.appspot.com/
  function(params) {
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
      
});

