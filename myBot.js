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
} if (cmd === 'status') {
  con.query(`SELECT * FROM status WHERE name = '${message.author.username}'`,(err,rows)=>{
      
    if(err)throw err;
    let sql;
     if(rows.length < 1){
      sql =`INSERT INTO status (name,hp,mp,sp,crit,str,agi,intel,dex,vit,lck,atk,def) VALUE ('${message.author.username}',0,0,0,0,0,0,0,0,0,0,0,0)`
      con.query(sql)
      message.reply("Create First Status Successful!!");
     }else{
      if(args[0]=="see"){
      if(args[1]=='all'){
        var data = "ข้อมูลทั้งหมด"
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
        var data = "ใส่ให้ถูกด้วยไอสัส **status <Function> <status> ค่าที่ดูได้มี all hp mp sp crit str agi intel dex vit lck atk def"
      }
      message.reply(args[1]+": "+data);
     }
    }
  })
  ////////////////////////////////////////////////////เงิน////////////////////////////////////////////////
} if (cmd === 'g') {
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