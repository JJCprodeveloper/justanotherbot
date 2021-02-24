const { exec} = require('child_process');
const { static } = require('express');
var thread1;
var id = 0;
var running = false;
var namelist = ['Slainsplug','WILDEN','WestwardSand200','Afkbot'];
function startThread(username){
    thread1 = exec('node afkbot.js '+username,function(error,stdout,stderr){
        if(error){
            console.error(`error: ${error.message}`);
        }
        if(stderr){
            console.error(`stderr: ${stderr}`);
        }
        console.log(`Bot Process:\n ${stdout}`);
      });
      console.log('afkbot>>Starting Bot ' +namelist[id]);
      thread1.on('close',function(code,signal){
        console.log('afkbot>>Bot '+namelist[id]  +'has been completely shutdown');
          if(id>namelist.length){
              id=0;
          }
          id++;
         if(code === 1){
            startThread(namelist[id]);
            
         }
         
         
      });
}


startThread('AfkBot');


var express = require('express');
var app = express();
app.get('/',function(req,res){
  res.send('Ping Pong');
});
app.listen(process.env.PORT || 4000,function(){
  console.log('afkbot>>Web Server Started!');
});


