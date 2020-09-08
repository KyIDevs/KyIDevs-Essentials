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
  id: "eval",
  name: "Eval", // Command name
  description: "A simple eval tool to use on Discord.", // Command Description
  aliases: ["evl", "ev"], // Command Aliases
  category: "Utilities",
  cooldown: 5000, // Command cooldown
  examples: ["eval message.author.id", "eval process.cwd()"], // Command Examples
  usage: ["<args>"], // Command Usage
  permissions: ["SEND_MESSAGES", "READ_MESSAGES"], // Command Permissions
  memberPermissions: ["SEND_MESSAGES", "READ_MESSAGES", "MANAGE_SERVER"], // User is required to have these permissions
  admin: true, // Command is admin only
  async execute(client, command, message, args, auth, channel, guild) { // Function async execute()
    // Command Starts Here
    try {
      const code = args.join(" ");
      let evaled = eval(args.join(" "));
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      const avtr = message.author.avatarURL() || message.author.defaultAvatarURL;
      const embed = new Discord.MessageEmbed()
        .setAuthor(client.name, client.avatar)
        .setTitle(command.name)
        .setTimestamp()
        .setColor(client.color.default)
        .addField("**Input**",  '```' + args.join(" ") + '```')
        .addField("**Result**", '```' + Essentials.clean(evaled) + '```')
        .setFooter(`${message.author.username} evaled`, avtr);
      message.channel.send(embed);
    } catch (err) {
      const embed = Essentials.errorEmbed(err);
      message.channel.send(embed);
    }
  }
};
