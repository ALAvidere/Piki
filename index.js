const Discord = require('discord.js');
const client = new Discord.Client();
var cheerio = require('cheerio');
var request = require('request');
require('dotenv').config()
const token = '';


//Hello command
client.on('message', function(message){
	if(message.content == '!hello')
	{
			message.channel.send('Hello ' + message.author + ', how are you? ♥‿♥');
	}

});

//Opens the Tricker Tumblr page
client.on('message', (msg) => {
	if (msg.content === '!tricker') {
		msg.channel.send('http://trickerblog.tumblr.com');
	}
//sends message of Piki bot
	if (msg.content ==='!bot_info') {
		msg.channel.send('I spawned out of the depths of a troubled mind (͡ ͡° ͜ つ ͡͡°)');

	}
	
});

//search image online
client.on('message', function(message) {
 
	var parts = message.content.split(" ");

	
	if (parts[0] === '!image') { 

			
			image(message, parts);

	}

});

function image(message, parts) {

	var search = parts.slice(1).join('');

	var options = {
			url: "http://results.dogpile.com/serp?qc=images&q=" + search,
			method: "GET",
			headers: {
					"Accept": "text/html",
					"User-Agent": "Chrome"
			}
	};

	request(options, function(error, response, responseBody) {
			if (error) {

					return;
			}

			$ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)

			// In this search engine they use ".image a.link" as their css selector for image links
			var links = $('.image a.link');

			var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr('href'));
			console.log(urls);
			if (!urls.length) {

					return;
			}


			message.channel.send( urls[~~(Math.random() * 5)] );
	});

}


//kicking members off the server command
client.on('guildMemberAdd', member => {
  member.send('Hello fellow sentient and welcome on the Tricker Discord server! ᵔᴥᵔ Please go to the #do_an_intro channel and introduce yourself! Also, be aware that we won’t tolerate trolling, spamming or harassment (only I do that). Have fun! \ (•◡•) /')
})

client.on('message', message => {
  if (message.content.startsWith('!kick')) {
    const member = message.mentions.members.first()
    
    if (!member) {
      return message.reply('Who are you trying to kick? You must mention a user. ಠ╭╮ಠ')
    }
    if (!member.kickable) {
      return message.reply('I cannot kick this user. Sorry! ಥ_ಥ')
    }
    return member
      .kick()
      .then(() => message.reply('${member.user.tag} p e r i s h e d.ಠ ⌣ಠ'))
      .catch(error => message.reply('Sorry, an error occured.ಥ_ಥ'))
	}

});

//Ping command
var prefix = "!"
client.on('message', message => {
		if (!message.content.startsWith(prefix)) return;
		if (message.author.bot) return;
		if (message.content.startsWith(prefix + 'ping')) {

				message.channel.send('P̴̡̏͑̔̀̌̚͘O̷͍͛͛O̴͙͋̊̉̈́̓̈͗̑̈Ó̴̢̖̰̗͇O̶̫̅̽̓́́͑͠͝Ǫ̴̢̬̪̦̬̺̲̟͋̽͜Ǫ̷̛̛̠̳͆͒́̄N̵͆̏ͅG̸̨͉̥̮͍̾́');

	}
});

//Why don't you google that
var prefix = "!"
client.on('message', message => {
	if (!message.content.startsWith(prefix)) return;
	if (message.author.bot) return;
	if (message.content.startsWith(prefix + 'synthwave')) {

			message.channel.send('Look what I found https://www.google.com/search?q=synthwave&source=lnms&tbm=isch&sa=X&ved=0ahUKEwirxdiLhsfiAhUB2qwKHSSTCcQQ_AUIESgC&biw=1904&bih=875');
	}
});

client.on('ready',() => {
console.log('Bot is now connected');

	//client.channels.find(x => x.name === 'general_chat').send('Hello! I\'m now connected!');
});

client.login(process.env.BOT_TOKEN);
