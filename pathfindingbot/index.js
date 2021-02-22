/*
const mineflayer = require('mineflayer');
const pathfinder = require('mineflayer-pathfinder').pathfinder;
const Movements = require('mineflayer-pathfinder').Movements;
const { GoalNear } = require('mineflayer-pathfinder').goals;
const bot = mineflayer.createBot({
    host: 'DedagraderHIST.aternos.me',
    port: 25565,
    username: 'Slainplug',
    password: '',
    version: false,
    auth: 'mojang'}
);
bot.loadPlugin(pathfinder);

bot.once('spawn', () => {

    const mcData = require('minecraft-data')(bot.version)
  
    const defaultMove = new Movements(bot, mcData)
    bot.chat('i am fucking here');
    
    bot.on('chat', function(username, message) {
        if (username === bot.username) return
  
      const target = bot.players[username] ? bot.players[username].entity : null
      if (message === 'come') {
        if (!target) {
          bot.chat('I don\'t see you !')
          return
        }

        bot.chat('ok im coming fuck you');
        const p = target.position;
         
        bot.pathfinder.setMovements(defaultMove);
        bot.pathfinder.setGoal(new GoalNear(p.x, p.y, p.z, 1));
      }
})
    
}
);*/const mineflayer = require('mineflayer');

const pathfinder = require('mineflayer-pathfinder').pathfinder;

const Movements = require('mineflayer-pathfinder').Movements
const  {GoalNear} = require('mineflayer-pathfinder').goals
const swordlist = [268,272,267,276];

var killmobs = true;
var killplayers = false;
var tofollow;
var completed = true;

init ();


function executeAsync(func){
    setInterval(func,20000);
}


function init(){
    const bot = mineflayer.createBot({
        //DedagraderHIST.aternos.me
        host: 'DedagraderHIST.aternos.me',
        port: 25565,
        username: 'Slainplug',
        password: '',
        version: false,
        auth: 'mojang'
      });

    
     
     //const Item = require("prismarine-item")(bot.version);
     bot.loadPlugin(pathfinder);
    

     executeAsync(function(){
         bot.chat('/tell Notch' + Math.random());
         bot.updateHeldItem;

         
         
         for (i = 0;i < swordlist.length;i++){
            if(bot.heldItem != null && bot.heldItem.type === swordlist[i]){
                if (i+1 < swordlist.length){
                   var x = bot.inventory.items();
                   var b;
                   for (b=0;b < x.length();b++){
                       var c;
                       for (c = i+1;c < swordlist.length;c++){
                           if(x[b].type == swordlist[c]){
                             bot.equip(x[b]);
                             return;
                           }
                       }
                   }
                }
            }         
        }
        if (bot.heldItem == null){
            var s;
            var d;
            var x,o;
            var inv = bot.inventory.items();
            for(s = 0;s < inv.length;s++){
                var k;
                for(k = 0;k<swordlist.length;k++){
                    if(inv[s] != null){
                      if(d == null && inv[s] == swordlist[k]){
                        d = inv[s];
                      }else if(d != null && inv[s] == swordlist[k]){
                        for(x = 0;x<swordlist.length;x++){
                            if(d.type === swordlist[x]){
                                break;
                            }
                        }
                        for(o = 0;o<swordlist.length;o++){
                            if(inv[s].type === swordlist[x]){
                                break;
                            }
                        }
                       if(o > x){
                           d = inv[s];
                       }
                    }
                  }  

                }
            }
            if(d == null){
                var itemtoss;
                for(itemtoss = 0;itemtoss < bot.inventory.items().length;itemtoss++){
                    if(inv[itemtoss] != null){
                        bot.tossStack(inv[itemtoss]);
                    }
                }
            }else{
                bot.equip(d);
            }
        }

    });
      
     bot.on('playerCollect',function(Collector,collected){
          if(Collector === bot.entity){
              for (i = 0;i < swordlist.length;i++){
                if(collected.type === swordlist[i]){
                   bot.equip(collected);
                   return;
                }
              }
              bot.tossStack(collected,(error)=>log(error));
          }
         
     });
     

      bot.on('playerLeft',function(left){
          if(tofollow === left.username){
              tofollow == null;
              bot.pathfinder.setGoal(new GoalNear(bot.entity.position.x,bot,entity.position.y,bot.entity.position.z,1));
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
         if(nearplayer && killplayers){
             if(nearplayer.position.distanceTo(bot.entity.position) <=7){
                     bot.lookAt(nearplayer.position.offset(1,1,1));
                     bot.attack(nearplayer);
             }
         }
      });
      bot.once('spawn',function(){
        const mcData = require('minecraft-data')(bot.version);
        const defaultMove = new Movements(bot, mcData);
        bot.on('goal_reached',function(){
           completed=true;
        });
        bot.on('chat',function(username,message,translate,jsonMsg,matches){
            if(username === bot.username){return}
            if(message === '.slain help'){
              bot.chat('Slain bot v.1');
              bot.chat(' .slain toggleplayer --- toggle player killing');
              bot.chat(' .slain togglemob --- toggle mob killing');
              bot.chat(' .slain leave --- make slain leave :((((');
              bot.chat(' .slain help --- help page');
              bot.chat(' .slain follow --- follow your butt till you die');
              bot.chat(' .slain home --- get bot back to home')
            }else if(message === '.slain toggleplayer'){
              killplayers = !killplayers;
              bot.chat('toggled killing player to ' + killplayers);
            }else if(message === '.slain togglemob'){
               killmob = !killmob;
               bot.chat('toggled killing mobs to ' + killmobs);
            }else if(message === '.slain leave'){
                bot.chat('cya later <3');
                bot.end();
                process.exit();
            }else if(message === '.slain follow'){
                
                if(tofollow == null){
                    
                    tofollow = username;
                    bot.chat('following user '+ username);
                    setInterval(function(){
                      if(tofollow ){
                        
                        if(completed){
                          //bot.chat('fuckfuckfuck');
                        completed = false;
                        const target = bot.players[tofollow] ? bot.players[tofollow].entity : null
                        if(!target){bot.chat('I cannot find the user ' + tofollow );
                        tofollow=null;
                        return;};
                        const p = target.position;
                        try{
                        bot.pathfinder.setMovements(defaultMove);
                        bot.pathfinder.setGoal(new GoalNear(p.x,p.y,p.z,1));
                          }catch(err){
                             bot.chat(err);
                          }
                        }
                       }else{
                         bot.chat('unfollowing user ' + username);
                         clearInterval(this);
                       }
                    },10);
                }else{
                    tofollow = null;
                    
                }
            }else if(message === '.slain home'){
                if(tofollow){
                  tofollow = null;
                }
                bot.chat('going home now');
                try{
                bot.pathfinder.setMovements(defaultMove);
                bot.pathfinder.setGoal(new GoalNear(-182,68,-266,0));
                }catch(err){
                  bot.chat(err);
                }
                
            }else if(message === '.slain drop'){
              bot.chat('dropping all items... :(');
              var totoss;
              for(totoss = 0;totoss < bot.inventory.items();totoss++){
                 
                   bot.tossStack(bot.inventory.items()[totoss],console.log(error));
                 
              }
            }
          });
      });
      bot.on('spawn',function(){
          bot.chat('i love SlainScissors');
          
      })
    
      bot.on('death',function(){
          bot.chat('Bye Slain...I love you 3000.....');}
          );
      
      bot.on('kicked',function(){init();});

}
    




