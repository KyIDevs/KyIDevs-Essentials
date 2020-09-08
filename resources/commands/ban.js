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
  id: "ban",
  name: "Ban", // Command name
  description: "A simple command to ban a user from a guild.\n`<days>` represents the days the banned member's messages will be deleted (0 - 7).", // Command Description
  aliases: ["banmember", "banuser"], // Command Aliases
  category: "Server Management",
  cooldown: 30000, // Command cooldown
  examples: ["ban @KyIDevs Essentials#0309 7", "ban 751780624704077906 0 Go away", "ban @KyIDevs Essentials#0309"], // Command Examples
  usage: ["<target>", "[days]", "[reason]"], // Command Usage
  permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "BAN_MEMBERS"], // Command Permissions
  memberPermissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "BAN_MEMBERS"], // User is required to have these permissions
  admin: false, // Command is admin only
  async execute(client, command, message, args, auth, channel, guild) { // Function async execute()
    // Command Starts Here
    let member;
    const mGuild = message.guild;
    const mentioned = message.mentions.members.first();
    if (isNaN(args[0])) {
      if (mentioned) member = mentioned;
      else {
        const string = "That's not a valid member of this guild!";
        const embed = Essentials.constructNoticeEmbed(client, "error", string);
        return message.channel.send(embed);
      }
    } else {
      member = mGuild.members.cache.get(args[0]);
    }
    if (!args[1]) {
      args[1] = 0;
    } else if (isNan(args[1])){
      const string = "Identifier <days> must be a number between 0-7!";
      const embed = Essentials.constructNoticeEmbed(client, "error", string);
      return message.channel.send(embed);
    }
    const days = parseInt(args[1]) || 0;
    if (parseInt(args[1]) > 7) int = 7;
    if (parseInt(args[1]) < 0) int = 0;
    if (!member.bannable) {
      const string = "This member can't be banned, check if they have a higher role than the bot!";
      const embed = Essentials.constructNoticeEmbed(client, "error", string);
      return message.channel.send(embed);
    }
    member.ban({
      days: int,
      reason: `Banned By: ${message.author.tag}\n` + (args.slice(2).join(" ") || "No reason was provided.")
    })
      .then(() => {
        const embed = Essentials.constructShortEmbed(
          client.color.green,
          mGuild.name,
          mGuild.IconURL() || message.author.defaultAvatarURL,
          "Member banned",
          `**${member.tag} has successfully been banned from this guild.**\n` +
          (`Banned By: ${message.author.tag}\n` +
          (args.slice(2).join(" ") || "No reason was provided.")),
          "none",
          "none",
          "${member.tag} has been banned by ${message.author.tag}",
          true
        );
        return message.channel.send(embed);
      })
      .catch(err => Essentials.log(client, err));
  }
};
