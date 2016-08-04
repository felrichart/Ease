var facebookConnectionJson = {
    
    "elements":{
        
        "userField":{
            "id":"email"
        },
        "passField":{
            "id":"pass"
        },
        "logInButton":{
            "tagName":"input",
            "name":"login",
            "type":"submit"
        }
    },
    
    "connectionSteps":[
        
        {
                "action":"catchFail",
                "if":"missingElement",
                "elementName":"passField",
                "actionsIfFail":[{"action":"end"}],
                "send":"connectedToFacebook"
        },
        
        {
            "action":"do",
            "elements":[
                {
                    "name":"userField",
                    "action":"fill",
                    "value":"user"
                },
                {
                    "name":"passField",
                    "action":"fill",
                    "value":"pass"
                },
                {
                    "name":"logInButton",
                    "action":"click"
                }
            ]
        },
        
        {
            "action":"nextPage",
            "lastPage":true
        },
        
        {
            "action":"catchFail",
            "if":"existingElement",
            "elementName":"passField",
            "actionsIfFail":[{"action":"end"}],
            "send":"wrongFacebookPassword"
        }
    ]
};