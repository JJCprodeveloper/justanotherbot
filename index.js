/*
const { exec} = require('child_process');
var thread1;
function startThread(){
    thread1 = exec('node afkbot.js',function(error,stdout,stderr){
        if(error){
            console.error(`error: ${error.message}`);
        }
        if(stderr){
            console.error(`stderr: ${stderr}`);
        }
        console.log(`stdout:\n ${stdout}`);
      });
      thread1.on('close',function(code,signal){
         if(code){
            startThread();
         }
         
      });
}
startThread();*/

var express = require('express');
var app = express();
app.get('/',function(req,res){
  res.send('Ping Pong');
});
app.listen(process.env.port || 4000,function(){
  console.log('web server started congratz!!!');
});


