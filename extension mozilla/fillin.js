console.log("Ease plugin : ready to fill in");

chrome.runtime.onMessage.addListener(
  function(params) {
    console.log('Ease plugin : filling form at '+ params.urlLogin);
    if(document.getElementById(params.userField)==null){
        window.open(params.urlHome,"_self");
    }
    document.getElementById(params.userField).value = params.user;
    document.getElementById(params.passField).value = params.pass;
    document.getElementById(params.button).click();
      
});