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
  id: "avatar",
  name: "Avatar", // Command name
  description: "A simple eval tool to use on Discord.", // Command Description
  aliases: ["av", "avtr"], // Command Aliases
  category: "General",
  cooldown: 10000, // Command cooldown
  examples: ["avatar", "avatar @KyIDevs Essentials#0309", "avatar 751780624704077906"], // Command Examples
  usage: ["[args]"], // Command Usage
  permissions: ["SEND_MESSAGES", "READ_MESSAGES"], // Command Permissions
  memberPermissions: ["SEND_MESSAGES", "READ_MESSAGES", "MANAGE_SERVER"], // User is required to have these permissions
  admin: false, // Command is admin only
  async execute(client, command, message, args) { // Function async execute()
    // Command Starts Here
    let user;
    if (isNaN(args[0])) {
      user = message.mentions.users.first();
      if (!user) {
        user = message.author;
      }
    } else {
      user = cient.users.cache.get(args[0]);
    }
    const avtr = message.author.avatarURL() || message.author.defaultAvatarURL;
    const uvtr = user.avatarURL() || user.defaultAvatarURL;
    const uinfoembed = new Discord.MessageEmbed()
      .setTitle(`${user.username}'s avatar`)
      .setDescription(`[Avatar Link](${uvtr})`)
      .setImage(uvtr)
      .setColor(client.color.default)
      .setTimestamp()
      .setFooter(
        `Requested by ${message.author.username}`,
        `${avtr}`
      );
  }
};
