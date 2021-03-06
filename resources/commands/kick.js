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
  id: "kick",
  name: "Kick", // Command name
  description: "A simple command to kick a user from a guild.", // Command Description
  aliases: ["kickmember", "kickuser"], // Command Aliases
  category: "Server Management",
  cooldown: 30000, // Command cooldown
  examples: ["kick @KyIDevs Essentials#0309", "kick 751780624704077906 Go away!"], // Command Examples
  usage: ["<target>", "[reason]"], // Command Usage
  permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "KICK_MEMBERS"], // Command Permissions
  memberPermissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "KICK_MEMBERS"], // User is required to have these permissions
  admin: false, // Command is admin only
  nsfw: false, // Command is NSFW only
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
    if (!member.kickable) {
      const string = "This member can't be kicked, check if they have a higher role than the bot!";
      const embed = Essentials.constructNoticeEmbed(client, "error", string);
      return message.channel.send(embed);
    }
    member.kick({
      reason: `Kicked By: ${message.author.tag}\n` + (args.slice(1).join(" ") || "No reason was provided.")
    })
      .then(m => {
        const embed = Essentials.constructShortEmbed(
          client.color.green,
          mGuild.name,
          mGuild.iconURL() || message.author.defaultAvatarURL,
          "Member kicked",
          `**${m.user.tag} has successfully been kicked from this guild.**\n` +
          (`Banned By: ${message.author.tag}\nReason: ` +
          (args.slice(1).join(" ") || "No reason was provided.")),
          "none",
          "none",
          `${m.user.tag} has been kicked by ${message.author.tag}`,
          true
        );
      })
      .catch(err => Essentials.log(client, err));
  }
};
