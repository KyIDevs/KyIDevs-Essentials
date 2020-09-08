///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
//    KyIDevs Essentials is an Essentials Bot made by KyIDevs for a developer    //
//    management system, including eval commands and easy-to-setup discord.js    //
//    bot module.                                                                //
//    Copyright (C) 2020 KyIDevs                                                 //
//                                                                               //
//    This program is free software: you can redistribute it and/or modify       //
//    it under the terms of the GNU General Public License as published by       //
//    the Free Software Foundation, either version 3 of the License, or          //
//    (at your option) any later version.                                        //
//                                                                               //
//    This program is distributed in the hope that it will be useful,            //
//    but WITHOUT ANY WARRANTY; without even the implied warranty of             //
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the              //
//    GNU General Public License for more details.                               //
//                                                                               //
//    You should have received a copy of the GNU General Public License          //
//    along with this program.  If not, see <https://www.gnu.org/licenses/>.     //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////

// Discord Bot - KyIDevs Essentials ////////////////////////////////////////
//                                                                        //
//  Made By:                                                              //
//                                                                        //
//   __    __            ______  _______                                  //
//  /  |  /  |          /      |/       \                                 //
//  $$ | /$$/  __    __ $$$$$$/ $$$$$$$  |  ______   __     __  _______   //
//  $$ |/$$/  /  |  /  |  $$ |  $$ |  $$ | /      \ /  \   /  |/       |  //
//  $$  $$<   $$ |  $$ |  $$ |  $$ |  $$ |/$$$$$$  |$$  \ /$$//$$$$$$$/   //
//  $$$$$  \  $$ |  $$ |  $$ |  $$ |  $$ |$$    $$ | $$  /$$/ $$      \   //
//  $$ |$$  \ $$ \__$$ | _$$ |_ $$ |__$$ |$$$$$$$$/   $$ $$/   $$$$$$  |  //
//  $$ | $$  |$$    $$ |/ $$   |$$    $$/ $$       |   $$$/   /     $$/   //
//  $$/   $$/  $$$$$$$ |$$$$$$/ $$$$$$$/   $$$$$$$/     $/    $$$$$$$/    //
//            /  \__$$ |                                                  //
//            $$    $$/                                                   //
//             $$$$$$/                                                    //
//                                                                        //
////////////////////////////////////////////////////////////////////////////

// Modules //
const fs = require('fs');
const Discord = require('discord.js');
const DBL = require('dblapi.js');
const mongoose = require('mongoose');

// Boot Resources //
const package = require("./package.json")
const config = require("./resources/data/config.json");
const login = require("./resources/data/login.json");
const dev = require("./resources/data/developers.json");
const color = require("./resources/extensions/colors.json");
const emoji = require("./resources/extensions/emojis.json");
const def = require("./resources/extensions/defaults.json");
const Essentials = require("./resources/utils/essentials.js");

// Starting up Discord Client //
const client = new Discord.Client({
  fetchAllMembers: true,
  presence: {
    activity: {
      name: config.client.presence.activity.onBoot.name,
      type: config.client.presence.activity.onBoot.type
    }
  }
});

// Resources //
client.config = config;
client.logins = login;
client.dev = dev;
client.color = color;
client.emoji = emoji;
client.def = def;
client.package = package;

// Predefined Owner from config.json //
const owner = client.users.cache.get(config.admin.owner.id);
client.owner = owner;

// Configuring Footers Etc.
client.name = config.name;
client.description = package.description;
if (config.image.avatar) client.avatar = config.image.avatar;
else client.avatar = client.user.avatarURL() || client.user.defaultAvatarURl;
client.footer = Essentials.placeHolder(client, config.settings.footer);

// Connecting to MongoDB Database //
mongoose.connect(
  `mongodb+srv://${login.mongodb.username}:${login.mongodb.password}@${login.mongodb.cluster.url}.mongodb.net/${login.mongodb.cluster.database}?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
).catch(err => console.log(err));

// DBL API //
//const dbl = new DBL(
//  login.dbl.password, {
//    webhookPort: login.dbl.port,
//    webhookAuth: login.dbl.auth
//  }
//).catch(err => console.log(err));

// Event Emitted: Ready //
client.on("ready", async () => {
  try {
    // Set Activity every 30 seconds
    setInterval(() => {
      client.user.setActivity(
        Essentials.placeHolder(client, config.client.presence.activity.default.name), {
          type: config.client.presence.activity.default.name
        }
      );
    }, 30000);
  } catch (error) {
    Essentials.log(client, error);
  }
  
  // Bot Ready Log //
  console.log(
    `Logged in as ${client.user.tag}.\n
    There are ${client.users.cache.size} users and/or bots online.\n
    ${client.user.tag} connected to:\n
     ${client.guilds.cache
      .map(g => g.name)
      .join(", ")}`
  );
  // Set Startup Status //
  client.user.setStatus(config.client.presence.activity.status);
});

// Load Commands //
client.commands = new Discord.Collection();
var commandFiles = fs
  .readdirSync(`./resources/commands`)
  .filter(file => file.endsWith(".js"));
for (var file of commandFiles) {
  var command = require(`./resources/commands/${file}`);
  client.commands.set(command.id, command);
  console.log(`Loading command handler for command "${command.name}".`);
}

// Load Event Handlers //
client.events = new Discord.Collection();
var eventFiles = fs
  .readdirSync(`./resources/events`)
  .filter(file => file.endsWith(".js"));
for (var file of eventFiles) {
  var event = require(`./resources/events/${file}`);
  client.events.set(event.name, event);
  console.log(`Loading event handler for event "${event.name}".`);
}

// Guild Join Event //
client.on("guildCreate", async guild => {
  const event = client.events.get("guildCreate");
  if (event) {
    try {
      await event.execute(
        client, event, guild
      )
    } catch (err) {
      Essentials.log(client, err)
    }
  } 
})

// Guild Left Event //
client.on("guildDelete", async guild => {
  const event = client.events.get("guildDelete");
  if (event) {
    try {
      await event.execute(
        client, event, guild
      )
    } catch (err) {
      Essentials.log(client, err)
    }
  } 
});

// Guild Member Join Event //////////////////////////////////////
client.on('guildMemberAdd', async member => {
  const event = client.events.get("guildMemberAdd");
  if (event) {
    try {
      await event.execute(
        client, event, member
      )
    } catch (err) {
      Essentials.log(client, err)
    }
  } 
});

// Guild Member Leave Event ///////////////////////////////////
client.on('guildMemberRemove', async member => {
  const event = client.events.get("guildMemberRemove");
  if (event) {
    try {
      await event.execute(
        client, event, member
      )
    } catch (err) {
      Essentials.log(client, err)
    }
  } 
});
//////////////////////////////////////////////////////////

// Message Event //
client.on("message", async message => {
  const event = client.events.get("message");
  if (event) {
    try {
      await event.execute(
        client, event, message
      )
    } catch (err) {
      Essentials.log(client, err)
    }
  } 
})
client.login(login.token);
