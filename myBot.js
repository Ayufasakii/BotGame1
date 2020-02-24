const { Client,RichEmbed } = require("discord.js");
const  config  = require("./config.json");
const Function = require('./function.js');
const mysql = require('mysql');
var con = mysql.createConnection({
  host:"sql7.freemysqlhosting.net",
  user:"sql7324368",
  password:'IivNKyFRki',
  database:"sql7324368",
  insecureAuth : true
});
con.connect(err=>{
  if(err) throw err;
  console.log('connect to DB!')
  con.query('SHOW TABLES',console.log)
})
// Declares our bot,
// the disableEveryone prevents the client to ping @everyone
const client = new Client({
    disableEveryone: true
});
// When the bot's online, what's in these brackets will be executed
client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    // Set the user presence
    client.user.setPresence({
        status: "online",
        game: {
            name: "me getting developed",
            type: "WATCHING"
        }
    }); 
})

client.on("message", async message => {
    console.log(`${message.author.username} said: ${message.content}`);
});
client.on('message', message => { 
  const prefix = "__";
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
////////////////////////////////////////////////////EXP////////////////////////////////////////////////
  if (cmd === 'lv') {
con.query(`SELECT * FROM lv WHERE name = '${message.author.username}'`,(err,rows)=>{
    
  if(err)throw err;
  let sql;
  
   if(rows.length < 1){
    sql =`INSERT INTO lv (name,xp,lv) VALUE ('${message.author.username}',0,0)`
    con.query(sql)
    message.reply("Create First Level Successful!!");
   }else{
    if(args[0]=="see"){
      message.reply("Level: "+ rows[0].lv + " EXP: "+ rows[0].xp);
    }else if(args[0]=="add"){
      var wallXPArr = [0,15,20,33,58,99,161,249,369,529,726,975,1279,1644,2011,2585,3174,3851,4623,5497,6480,7580,8804
      ,10160,11655,13297]
      var wallXP = wallXPArr[rows[0].lv]
      console.log(wallXP)
      let a = parseInt(rows[0].xp)
      let b = parseInt(args[1])
      var EXP =  a+ b
      console.log(EXP)
      if(EXP < wallXP||EXP == wallXP){
      sql = `UPDATE lv SET xp = '${EXP}' WHERE name = '${message.author.username}'`
      message.reply("ใส่EXPให้แล้วไอเหี้ย");
      }else if(EXP > wallXP){
        console.log(wallXP)
        console.log(EXP)
        EXP = EXP-wallXP;
        console.log(EXP)
        sql = `UPDATE lv SET xp = ${EXP}, lv = ${rows[0].lv}+1 WHERE name = '${message.author.username}'`
        message.reply("เวลอัพละไอเหี้ย");
      }
      con.query(sql)
      EXP = 0
      
    }else{
    message.reply("มึงพิมพ์ให้มันถูกๆดิ __lv see");
   }
  }
})
////////////////////////////////////////////////////Status////////////////////////////////////////////////
}if (cmd === 'status') {
  con.query(`SELECT * FROM status WHERE name = '${message.author.username}'`,(err,rows)=>{
    if(err)throw err;
    let sql;
     if(rows.length < 1){
       if(args[0]=='create'){
        let race = args[1];
        let classes = args[2];
        if(race == "human"){
          var Rstatus = [6,5,5,0,2,2,2,2,2,0]
        }else if(race == "elf"){
          var Rstatus = [1,7,0,2,1,3,3,2,0,0]
        }else if(race == "dwaft"){
          var Rstatus = [7,2,5,0.5,3,0,1,3,2,1]
        }else if(race == "exceed"){
          var Rstatus = [2,9,2,0.5,1,1,4,2,1,1]
        }else if(race == "lizardman"){
          var Rstatus = [5,3,5,0.5,1,3,1,2,2,1]
        }else if(race == "beastman"){
          var Rstatus = [8,1,5,0,4,2,0,2,2,0]
        }else if(race == "insect"){
          var Rstatus = [6,0,5,0.5,2,4,0,1,2,1]
        }else{
          message.reply("ใส่เผ่าให้ถูกหน่อยดิ มี human elf dwaft exceed lizardman beastman insect");
        }
        if(classes == "warrior"){
          var Cstatus = [14,4,12,0.5,4,2,2,1,5,1]
        }else if(classes == "wizard"){
          var Cstatus = [7,12,7,0.5,1,1,5,4,3,1]
        }else if(classes == "merchant"){
          var Cstatus = [9,8,7,0.5,3,1,3,4,3,1]
        }else if(classes == "ranger"){
          var Cstatus = [9,7,7,1,3,2,3,2,3,2]
        }else if(classes == "thief"){
          var Cstatus = [8,5,7,1,2,4,2,2,3,2]
        }else if(classes == "healer"){
          var Cstatus = [7,13,7,0.5,1,1,6,3,3,1]
        }else{
          message.reply("ใส่คลาสให้ถูกหน่อยดิ warrior wizard merchant ranger thief healer");
        }  
      if(args[1]=="human"||args[1]=="elf"||args[1]=="dwaft"||args[1]=="exceed"||args[1]=="lizardman"||
      args[1]=="beastman"||args[1]=="insect"){
        if(args[2]=="warrior"||args[2]=="wizard"||args[2]=="merchant"||args[2]=="ranger"||args[2]=="thief"||
        args[2]=="healer"){
       let status = []
       status [0] = Rstatus[0]+Cstatus[0] 
       status [1] = Rstatus[1]+Cstatus[1] 
       status [2] = Rstatus[2]+Cstatus[2] 
       status [3] = Rstatus[3]+Cstatus[3] 
       status [4] = Rstatus[4]+Cstatus[4] 
       status [5] = Rstatus[5]+Cstatus[5] 
       status [6] = Rstatus[6]+Cstatus[6] 
       status [7] = Rstatus[7]+Cstatus[7] 
       status [8] = Rstatus[8]+Cstatus[8] 
       status [9] = Rstatus[9]+Cstatus[9] 
       status [10] = Rstatus[4]+Cstatus[4] 
       status [11] = (Rstatus[8]+Cstatus[8])/5 
       console.log(status)
      sql =`INSERT INTO status (name,hp,mp,sp,crit,str,agi,intel,dex,vit,lck,atk,def) VALUE ('${message.author.username}','${status[0]}',${status[1]},${status[2]},${status[3]},${status[4]},${status[5]},${status[6]},${status[7]},${status[8]},${status[9]},${status[10]},${status[11]})`
      con.query(sql)
      message.reply("Create First Status Successful!!");
        }
      }
       }else{
        message.reply("ต้องสร้างก่อนดิวะ __status create <race> <class>");
        message.reply("race มี human elf dwaft exceed lizardman beastman insect");
        message.reply("class มี warrior wizard merchant ranger thief healer");
       }
     }else{
      if(args[0]=="see"){
      if(args[1]=='all'){
        var data = ""
        message.reply("HP: "+ rows[0].hp + " MP: "+ rows[0].mp+ " SP: "+ rows[0].sp);
        message.reply("Critical Rate: "+ rows[0].crit + "%");
        message.reply("Str: "+ rows[0].str + " Agi: "+ rows[0].agi+ " Int: "+ rows[0].intel);
        message.reply("Dex: "+ rows[0].dex + " Vit: "+ rows[0].vit+ " Luck: "+ rows[0].lck);
        message.reply("Atk: "+ rows[0].atk + " Def: "+rows[0].def);
      }else if(args[1]=='hp'){
        var data = rows[0].hp
        console.log('ssss')
      }else if(args[1]=='mp'){
        var data = rows[0].mp
      }else if(args[1]=='sp'){
        var data = rows[0].sp
      }else if(args[1]=='crit'){
        var data = rows[0].crit
      }else if(args[1]=='str'){
        var data = rows[0].str
      }else if(args[1]=='agi'){
        var data = rows[0].agi
      }else if(args[1]=='intel'){
        var data = rows[1].intel
      }else if(args[1]=='dex'){
        var data = rows[0].dex
      }else if(args[1]=='vit'){
        var data = rows[0].vit
      }else if(args[1]=='lck'){
        var data = rows[0].lck
      }else if(args[1]=='atk'){
        var data = rows[0].atk
      }else if(args[1]=='def'){
       var data = rows[0].def
      }else{
        var data = "ใส่ให้ถูกด้วยไอสัส __status <Function> <status> ค่าที่ดูได้มี all hp mp sp crit str agi intel dex vit lck atk def"
      }
      message.reply(args[1]+": "+data);
      }else if(args[0]=="add"){
        if(args[1]=='hp'){
          var data = rows[0].hp
          console.log('ssss')
        }else if(args[1]=='mp'){
          var data = rows[0].mp
        }else if(args[1]=='sp'){
          var data = rows[0].sp
        }else if(args[1]=='crit'){
          var data = rows[0].crit
        }else if(args[1]=='str'){
          var data = rows[0].str
        }else if(args[1]=='agi'){
          var data = rows[0].agi
        }else if(args[1]=='intel'){
          var data = rows[1].intel
        }else if(args[1]=='dex'){
          var data = rows[0].dex
        }else if(args[1]=='vit'){
          var data = rows[0].vit
        }else if(args[1]=='lck'){
          var data = rows[0].lck
        }else if(args[1]=='atk'){
          var data = rows[0].atk
        }else if(args[1]=='def'){
         var data = rows[0].def
        }else{
          var data = "ใส่ให้ถูกด้วยไอสัส __status <Function> <status> ค่าที่เพิ่มได้มี hp mp sp crit str agi intel dex vit lck atk def"
        }
        if(args[1]=='hp'||args[1]=='mp'||args[1]=='sp'||args[1]=='crit'||args[1]=='str'||args[1]=='agi'||
        args[1]=='intel'||args[1]=='dex'||args[1]=='vit'||args[1]=='lck'||args[1]=='def'){
        let a = parseInt(args[2])
        let b = parseInt(data)
        console.log(a)
        console.log(b)
        let addsta = a + b
        sql = `UPDATE status SET ${args[1]} = '${addsta}' WHERE name = '${message.author.username}'`
        con.query(sql)
        message.reply("เพิ่มค่า: "+args[1]+" ให้แล้วไอสัส" );
        }else{
          essage.reply("ใส่ให้ถูกด้วยไอสัส __status <Function> <status> ค่าที่เพิ่มได้มี hp mp sp crit str agi intel dex vit lck atk def" );
        }
     }else{
      message.reply("พิมพ์ให้ถูกด้วย __status <function> มี create see add");
     }
    }
  })
  ////////////////////////////////////////////////////เงิน////////////////////////////////////////////////
} if (cmd === 'g') {
  console.log("G")
  con.query(`SELECT * FROM money WHERE name = '${message.author.username}'`,(err,rows)=>{
      
    if(err)throw err;
    let sql;
     if(rows.length < 1){
      sql =`INSERT INTO money (name,money) VALUE ('${message.author.username}',0)`
      con.query(sql)
      message.reply("Create First Money Successful!!");
     }else{
      if(args[0]=="see"){
      message.reply(rows[0].money);
     }else if(args[0]=="add"){
      let a = parseInt(args[1])
      let b = parseInt(rows[0].money)
      let money = a + b
      sql = `UPDATE money SET money = '${money}' WHERE name = '${message.author.username}'`
      message.reply("ได้ตังละไอสัส"+money);
      con.query(sql)  
    }else if(args[0]=="pay"){
      let b = parseInt(args[1])
      let a = parseInt(rows[0].money)
      console.log("จะจ่าย"+a)
      console.log("มี"+b)
      let money = a - b
      console.log(money)
      if(a > b ||b == a){
      sql = `UPDATE money SET money = '${money}' WHERE name = '${message.author.username}'`
      message.reply("เสียตังแล้วไอควาย เหลือ "+money);
      con.query(sql)  
      }else if(b > a){
        message.reply("ตังไม่พอไอควาย");
      }
    }
    }
  })
  }
  

})
////////////////////////////////////////////////////ทอย////////////////////////////////////////////////
client.on('message', message => { 
  if (message.content === 'ทอย') {
    var sum = 0
  for(let i = 0;i < 2;i++){
    let output = Function.dice(1,8)
    let test = 0
   
  if(output == 1){
  message.reply('ว้ายได้ '+output+' เองไอควาย');
  test = 1
  }else if(output == 2){
  message.reply('ได้แค่ '+output+' กระจอกพอๆกับ1แหละ');
  test = 2
  }else if(output == 3){
  message.reply('ก็ยังดีที่ได้ '+output+' แต่ก็กระจอกอยู่ดี');
  test = 3
  }else if(output == 4){
  message.reply('ได้แค่ '+output+' ได้แค่ครึ่งเดียว?');
  test = 4
  }else if(output == 5){
  message.reply('โหดใช้ได้เลยนะได้ '+output+' เนี่ย');
  test = 5
  }else if(output == 6){
  message.reply('อ่าเริ่มจะยอมรับละก็ได้ตั้ง '+output+' นี่');
  test = 6
  }else if(output == 7){
  message.reply('มึงเริ่มเกินไปละได้ '+output+' เนี่ย');
  test = 7
  }else if(output == 8){
  message.reply('ควยเย็ดแม่โกงได้ตั้ง '+output);
  test = 8
  }
  sum = sum + test
  }
  message.reply('Sum of ลูกเต๋า '+sum);
  }if (message.content === 'หมุน') {
    let output = Random(1, 100);
    message.reply(output+"%");
  }
});
//////////////////////////////////////////////////////////////////////////////////////////
function generateXP(){
  return 0;
}
function Random(min_val, max_val) {
  return Math.floor(Math.random() * (max_val - min_val + 1)) + min_val;
  }
function getStatus(a){
  con.query(`SELECT * FROM status WHERE name = '${message.author.username}'`,(err,rows)=>{
      
    if(err)throw err;
    let sql;
     if(rows.length < 1){
      sql =`INSERT INTO status (name,hp,mp,sp,crit,str,agi,intel,dex,vit,lck,atk,def) VALUE ('${message.author.username}',0,0,0,0,0,0,0,0,0,0,0,0)`
      con.query(sql)
      message.reply("Create First Status Successful!!");
     }else if(a=="all"){
        message.reply("HP: "+ rows[0].hp + " MP: "+ rows[0].mp+ " SP: "+ rows[0].sp);
        message.reply("Critical Rate: "+ rows[0].crit + "%");
        message.reply("Str: "+ rows[0].str + " Agi: "+ rows[0].agi+ " Int: "+ rows[0].intel);
        message.reply("Dex: "+ rows[0].dex + " Vit: "+ rows[0].vit+ " Luck: "+ rows[0].lck);
        message.reply("Atk: "+ rows[0].atk + " Def: "+rows[0].def);
     }
     if(a == "Atk"){
       return "Atk: "+ rows[0].atk;
     }
  })
}
// Login the bot
client.login('NjgxMDg0MDA2NjQ5MDM2ODEw.XlLz6Q.erWZ6RpN9RzyRzkTn82qbzPCmhk');