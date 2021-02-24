const { exec} = require('child_process');
const { static } = require('express');
var thread1;
var id;
var running = false;
var namelist = ['Slainplug','WILDEN','WestwardSand200','Afkbot'];
function startThread(username){
    thread1 = exec('node afkbot.js '+username,function(error,stdout,stderr){
        if(error){
            console.error(`error: ${error.message}`);
        }
        if(stderr){
            console.error(`stderr: ${stderr}`);
        }
        console.log(`stdout:\n ${stdout}`);
      });
      thread1.on('close',function(code,signal){
          if(id>namelist.length){
              id=0;
          }
          id++;
         if(code === 0){
            startThread(namelist[id]);
         }
         
         
      });
}


startThread("AfkBot");


var express = require('express');
var app = express();
app.get('/',function(req,res){
  res.send('Ping Pong');
});
app.listen(process.env.PORT || 4000,function(){
  console.log('web server started congratz!!!');
});


