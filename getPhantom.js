//Launch phantomJS and get cookies

var getCookies = function(callback){
    
    var cookies;
    
    var exec = require('child_process').exec;
    
    //execute phantomJS. return cookies
    exec('phantomjs ./phantom_simulation/autolog.js', function(error, stdout, stderr) {
        
        //parse stdout of phantomJS to get cookies
        var parsedStdout = stdout.split('cookies->')
        cookies = parsedStdout[parsedStdout.length-1];
        cookies = JSON.parse(cookies);
        
        return callback(cookies);
    });
    
}

module.exports.getCookies = getCookies;