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
startThread();


