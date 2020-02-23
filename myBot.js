const { Client,RichEmbed } = require("discord.js");
const  config  = require("./config.json");
const Function = require('./function.js');
const mysql = require('mysql');
var con = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:'8563',
  database:"sctd",
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
  if (cmd === 'lv') {
con.query(`SELECT * FROM lv WHERE name = '${message.author.username}'`,(err,rows)=>{
    
  if(err)throw err;
  let sql;
   if(rows.length < 1){
    sql =`INSERT INTO lv (name,xp,lv) VALUE ('${message.author.username}',0,0)`
    con.query(sql)
    message.reply("Create First Level Successful!!");
   }else{
      message.reply("Level: "+ rows[0].lv + "EXP: "+ rows[0].xp);
   }
})
} if (cmd === 'status') {
  con.query(`SELECT * FROM status WHERE name = '${message.author.username}'`,(err,rows)=>{
      
    if(err)throw err;
    let sql;
     if(rows.length < 1){
      sql =`INSERT INTO status (name,hp,mp,sp,crit,str,agi,intel,dex,vit,lck,atk,def) VALUE ('${message.author.username}',0,0,0,0,0,0,0,0,0,0,0,0)`
      con.query(sql)
      message.reply("Create First Status Successful!!");
     }else{
        message.reply("HP: "+ rows[0].hp + " MP: "+ rows[0].mp+ " SP: "+ rows[0].sp);
        message.reply("Critical Rate: "+ rows[0].crit + "%");
        message.reply("Str: "+ rows[0].str + " Agi: "+ rows[0].agi+ " Int: "+ rows[0].intel);
        message.reply("Dex: "+ rows[0].dex + " Vit: "+ rows[0].vit+ " Luck: "+ rows[0].lck);
        message.reply("Atk: "+ rows[0].atk + " Def: "+rows[0].def);
     }
  })
  }
})
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
  }
});
//////////////////////////////////////////////////////////////////////////////////////////
function generateXP(){
  return 0;
}
// Login the bot
client.login('NjgxMDg0MDA2NjQ5MDM2ODEw.XlJw1Q.pkdABt2Up9CuzRiVfOBIqssU55M');