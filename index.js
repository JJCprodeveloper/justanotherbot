const mineflayer = require('mineflayer');

const pathfinder = require('mineflayer-pathfinder').pathfinder;

const Movements = require('mineflayer-pathfinder').Movements
const  {GoalNear} = require('mineflayer-pathfinder').goals
const swordlist = [268,272,267,276];

var killmobs = true;
var killplayers = false;
var tofollow;
var defaultMove;

init ();


function executeAsync(func){
    setInterval(func,20000);
}


function init(){
    const bot = mineflayer.createBot({
        //DedagraderHIST.aternos.me
        host: 'DedagraderHIST.aternos.me',
        port: 25565,
        username: 'AfkBot',
        password: '',
        version: false,
        auth: 'mojang'
      });

    
     
     //const Item = require("prismarine-item")(bot.version);
     bot.loadPlugin(pathfinder);
    


      
  

      bot.on('playerLeft',function(left){
          if(tofollow === left.username){
              tofollow == null;
              bot.pathfinder.setGoal(new GoalNear(bot.entity.position.x,bot,entity.position.y,bot.entity.position.z,1));
          }
        });
      
      bot.on('physicTick',function(){
         const nearplayer = bot.nearestEntity(function(entity){return entity.type === 'player'});
         const nearentity = bot.nearestEntity(function(entity){return entity.type === 'mob'});
         if(tofollow){
          const target = bot.players[tofollow] ? bot.players[tofollow].entity : null
          if(!target){bot.chat('I cannot find the user ' + tofollow );
          tofollow=null;
          return;};
          const p = target.position;
          bot.pathfinder.setMovements(defaultMove);
          bot.pathfinder.setGoal(new GoalNear(p.x,p.y,p.z,1));
          
         }


         if (!nearentity && !nearplayer) {return;}
         if(nearentity && killmobs){
         if( nearentity.position.distanceTo(bot.entity.position )<=7){
                     bot.lookAt(nearentity.position.offset(1,1,1));
                     bot.attack(nearentity); 
                     
         }
        }
         if(nearplayer && killplayers){
             if(nearplayer.position.distanceTo(bot.entity.position) <=7){
                     bot.lookAt(nearplayer.position.offset(1,1,1));
                     bot.attack(nearplayer);
             }
         }
      });
      bot.once('spawn',function(){
        const mcData = require('minecraft-data')(bot.version);
        defaultMove = new Movements(bot, mcData);
        executeAsync(function(){
           bot.chat('/' + Math.random());
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
              bot.chat(' .afkbot home --- make bot go home');
            }else if(message === '.afkbot toggleplayer'){
              killplayers = !killplayers;
              bot.chat('toggled killing player to ' + killplayers);
            }else if(message === '.afkbot togglemob'){
               killmobs = !killmobs;
               bot.chat('toggled killing mobs to ' + killmobs);
            }else if(message === '.afkbot leave'){
                bot.chat('cya later <3');
                bot.end();
                process.exit();
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
            }
          });
      });
      bot.on('spawn',function(){
          bot.chat('Sorry i drank too much vodka yesterday');
          bot.chat('anyway this is just a gift to you all ');
          
      })
    
      bot.on('death',function(){
          bot.chat('Bye afkbot...I love you 3000.....');}
          );
      
      bot.on('kicked',function(){init();});

}
    
