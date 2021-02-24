const mineflayer = require('mineflayer');
//const fs = require('fs');
//const readline = require('readline');
//const path = './home.txt';

const pathfinder = require('./JJCpathfinder').pathfinder;

const Movements = require('./JJCpathfinder').Movements
const  {GoalNear} = require('./JJCpathfinder').goals
const swordlist = [268,272,267,276];
const threshold = 1800/20;


var tofollow;
var defaultMove;
var killmobs = true;
var killplayers = false;
var goal;
var ran;


  console.log('starting afkbot...');
  var parauser = process.argv[2];

  init ();
  



function executeAsync(func){
    setInterval(func,20000);
}


function init(){
  
    const bot = mineflayer.createBot({
        //DedagraderHIST.aternos.me
        host: '2builders2destroyers.aternos.me',
        port: 25565,
        username: parauser,
        password: '',
        version: false,
        auth: 'mojang'
      });

    
     
     //const Item = require("prismarine-item")(bot.version);
     bot.loadPlugin(pathfinder);
    


      
  

      bot.on('playerLeft',function(left){
          if(tofollow === left.username){
              tofollow == null;
          }
        });
      
      bot.on('physicTick',function(){
         const nearplayer = bot.nearestEntity(function(entity){return entity.type === 'player'});
         const nearentity = bot.nearestEntity(function(entity){return entity.type === 'mob'});



         if (!nearentity && !nearplayer) {return;}
         if(nearentity && killmobs){
         if( nearentity.position.distanceTo(bot.entity.position )<=7){
                     bot.lookAt(nearentity.position.offset(1,1,1));
                     bot.attack(nearentity); 
                     
         }
        }
         if(nearplayer &&  killplayers){
             if(nearplayer.position.distanceTo(bot.entity.position) <=7){
                     bot.lookAt(nearplayer.position.offset(1,1,1));
                     bot.attack(nearplayer);
             }
         }
                    
         if(tofollow){
            const target = bot.players[tofollow] ? bot.players[tofollow].entity : null
            if(!target){
                bot.chat('I cannot find the user ' + tofollow );
                tofollow=null;
                bot.pathfinder.setMovements(defaultMove);
                bot.pathfinder.setGoal(new GoalNear(bot.entity.position.x,bot.entity.position.y,bot.entity.position.z,0));
                return;
            };
            try{
            
              const p = target.position;
              bot.pathfinder.setMovements(defaultMove);
              bot.pathfinder.setGoal(new GoalNear(p.x,p.y,p.z,1));

            }catch(err){
                console.log(err);
            }
            
           }
    
      });
      bot.once('spawn',function(){
        
        const mcData = require('minecraft-data')(bot.version);
        defaultMove = new Movements(bot, mcData);
        
        executeAsync(function(){
           bot.chat('/' + Math.random());
           ran = ran + 1;
           if(ran > threshold){
             bot.chat('its time to say bye times up :(');
             console.log('afkbot>>Bot rejoining(time threshold reached');
             process.exit(1);
           }
        },20000);
        
        bot.on('chat',function(username,message,translate,jsonMsg,matches){
            if(username === bot.username){return}
            if(message === '.afkbot help'){
              bot.chat('afkbot bot v.1');
              bot.chat(' .afkbot toggleplayer --- toggle player killing');
              bot.chat(' .afkbot togglemob --- toggle mob killing');
              bot.chat(' .afkbot leave --- make afkbot leave :((((');
              bot.chat(' .afkbot help --- help page');
              bot.chat(' .afkbot follow --- toggle bot follow');
              bot.chat(' .afkbot sethome --- Set Home for bot to go ');
              bot.chat(' .afkbot home --- make bot go home');
              bot.chat(' .afkbot rejoin --- bot different name join')
            }else if(message === '.afkbot toggleplayer'){
               killplayers = !killplayers;
              bot.chat('toggled killing player to ' +  killplayers);
            }else if(message === '.afkbot togglemob'){
               killmobs = !killmobs;
               bot.chat('toggled killing mobs to ' + killmobs);
            }else if(message === '.afkbot leave'){
                bot.chat('cya later <3');
                bot.end();
                process.log('afkbot>>force shutting down all process!');
                process.exit(0);
            }else if(message === '.afkbot follow'){
                if(tofollow == null){
                    tofollow = username;
                    bot.chat('now following ' + username);
                }else{
                    tofollow = null;
                    bot.chat('unfollowing ' + username);
                }
            }else if(message === '.afkbot home'){
                if(tofollow){
                    tofollow = null;
                    bot.chat('unfollowing '+ username); 
                }
                bot.chat('going home now ');
                bot.pathfinder.setMovements(defaultMove);
                bot.pathfinder.setGoal(new GoalNear(-179,69,-261),0);
                
            }else if(message === '.afkbot rejoin'){
                bot.chat('cya in a sec,gonna rejoin lmao');
                bot.end();
                console.log('afkbot>>Rejoin bot command issued');
                process.exit(1);
            }
          });
      });
      bot.on('spawn',function(){
          bot.chat('hi i am all functioning bot');
          bot.chat('type .afkbot help for help menu')
          bot.chat('i joined yourserver because i am bored lol ');
          bot.chat('dont kick me please');
          
      })
    
      bot.on('death',function(){
          bot.chat('Bye afkbot...I love you 3000.....'); 
            if(tofollow != null){
              bot.chat('stop following ' + tofollow + ' because of dying');
              tofollow = null;
            }
          }                  
          );
      
      bot.on('kicked',function(){init();});

}
    
