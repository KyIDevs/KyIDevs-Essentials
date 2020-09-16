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

const Discord = require('discord.js');
const Essentials = require('../utils/essentials.js')

module.exports = {
  id: "ping",
  name: "Ping", // Command name
  description: "Checks the client and the API's ping.", // Command Description
  aliases: ["ping", "ms"], // Command Aliases
  category: "Utilities",
  cooldown: 10000, // Command cooldown
  examples: ["ping"], // Command Examples
  usage: [], // Command Usage
  permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY"], // Command Permissions
  memberPermissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY"], // User is required to have these permissions
  admin: false, // Command is admin only
  nsfw: false, // Command is NSFW only
  async execute(client, command, message, args, auth, channel, guild) { // Function async execute()
    // Command Starts Here //
    var avtr = message.author.avatarURL() || message.author.defaultAvatarURL;
    const eembed = new Discord.MessageEmbed()
      .setAuthor(client.name, client.avatar)
      .setColor(client.color.yellow)
      .setDescription("**Pinging...**")
      .setTimestamp()
      .setFooter(client.footer , client.avatar);
    const msg = await message.channel.send(eembed);
    const embed = new Discord.MessageEmbed()
      .setAuthor(client.name, client.avatar)
      .setColor(client.color.default)
      .setTitle("Ping Result")
      .addFields(
        { name: "Latency", value: `**${msg.createdTimestamp - message.createdTimestamp}ms**`, inline: true },
        { name: "API Latency", value: `**${Math.round(client.ws.ping)}ms**`, inline: true }
      )
      .setTimestamp()
      .setFooter(`${message.author.username} pinged`, avtr);
    msg.edit({embed: embed});
  }
};
