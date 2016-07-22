console.log("Ease plugin : ready to submit form");

chrome.runtime.onMessage.addListener(
    
    function(msg, sender, sendResponse) {
      if(msg.msg == "submitForm"){
           console.log('Ease plugin : submitting form');
           document.getElementById("userNavigationLabel").click();
          var x = document.getElementsByTagName("LI");
          console.log(x);
            document.getElementById("BLUE_BAR_ID_DO_NOT_USE > div > div > div.uiScrollableAreaWrap.scrollable > div > div > ul > li:nth-child(18) > a > span > span").click();
      }
       
    }
);