const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);

  var jsFiles = files.filter(f => f.split(".").pop() === "js");

  if (jsFiles.length <= 0) {
    console.log("Kon geen files vinden.");
    return;
  }

  jsFiles.forEach((f, i) => {

    var fileGet = require(`./commands/${f}`);
    console.log(`De file ${f} is geladen!`)

    bot.commands.set(fileGet.help.name, fileGet);

  })

});

bot.on("guildMemberAdd", member => {

  var role = member.guild.roles.cache.get('707867905504837693');

  if (!role) return;

  member.roles.add(role);

  var channel = member.guild.channels.cache.get('708325669729206322')

  if (!channel) return console.log("Kanaal: 708325669729206322 niet gevonden.");

  var embed = new discord.MessageEmbed()
    .setTitle("Welkom bij NoBordersRadio")
    .setDescription(`Welkom ${member}!

    Wij raden je aan om eerst even de regels te lezen! (#「📜」regelement)
    
    `)
    .setColor("GREEN")
    .setFooter("© NBRadio 2020", "https://cloud.gmpnetwork.nl/index.php/apps/files_sharing/publicpreview/S5GjTjc8JNDoXij?x=1018&y=797&a=true&file=dec2019logo2favicon.png&scalingup=0")
    .setTimestamp();

  channel.send(embed);

  // channel.send(`Welkom ${member} in onze discord van NBRadio!\n Momenteel zijn wij druk om alles optimaal te krijgen\n Heb je vragen, maak een :ticket: aan in ons ticket kanaal\n Wij wensen uw een fijne tijd toe.. \n Team NBRadio.nl`);

});

bot.login(botConfig.token);

bot.on('ready', async () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  activNum = 0;
  setInterval(function () {
    activNum++;
    switch (activNum) {
      case 0: bot.user.setActivity("Powered By:"); break;
      case 1: bot.user.setActivity("GMPNetwork"); break;
      case 2: bot.user.setActivity("Project:"); break;
      case 3: bot.user.setActivity("NBRadio.nl"); break;
      default: activNum = -1;
    }
  }, 4 * 800);

  const channel = bot.channels.cache.get('717024364222218271');
    channel.join().then(connection => {
      const dispatcher = connection.play('https://talentsradio.nl/radio/8000/NBR.mp3');
    });

});

bot.on("message", async message => {

  if (message.author.bot) return;

  if (message.channel.type == "dm") return;

  // var msg = message.content.toLowerCase();

  // for (let i = 0; i < SwearWords["vloekwoorden"].length; i++) {

  //   if(msg.includes(SwearWords["vloekwoorden"][i])){

  //     message.delete();

  //     return message.channel.send(`Niet vloeken ${message.author}!`).then(msg => msg.delete({ timeout: 3000 }));

  //   }

  // }



  var prefix = botConfig.prefix;

  var messageArray = message.content.split(" ");


  var SwearWords = JSON.parse(fs.readFileSync("./data/scheldwoorden.json"));

  var senteceUser = "";
  var amountSwearWords = 0;

  for (let y = 0; y < messageArray.length; y++) {

    const word = messageArray[y].toLowerCase();

    var changeWord = "";

    for (let i = 0; i < SwearWords["vloekwoorden"].length; i++) {

      if (word.includes(SwearWords["vloekwoorden"][i])) {

        changeWord = word.replace(SwearWords["vloekwoorden"][i], "******");

        senteceUser += " " + changeWord;

        amountSwearWords++;

      }

    }

    if(!changeWord){
      senteceUser += " " + messageArray[y];
    }

  }

  if(amountSwearWords != 0){
    
    message.delete();
    message.channel.send(senteceUser);

    message.channel.send("Niet vloeken A.U.B!")
;
  }


  var command = messageArray[0];

  if (!message.content.startsWith(prefix)) return;

  // Command Handler

  var arguments = messageArray.slice(1);

  var commands = bot.commands.get(command.slice(prefix.length));

  if (commands) commands.run(bot, message, arguments);

});

bot.login(process.env.token);