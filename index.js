const { exec} = require('child_process');
const { static } = require('express');
var thread1;
var id;
var running = false;
var namelist = ['Slain\'splug','WIL\'DEN','Westward\'Sand200','Afk\'bot'];
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


startThread('Afk\'Bot');


var express = require('express');
var app = express();
app.get('/',function(req,res){
  res.send('Ping Pong');
});
app.listen(process.env.PORT || 4000,function(){
  console.log('afkbot>>Web Server Started!');
});


