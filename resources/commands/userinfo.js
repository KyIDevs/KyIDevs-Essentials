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

const mongoose = require("mongoose")
const Profile = require("../models/profile.js");

module.exports = {
  name: "userinfo", //command name
  async execute(client, message, args, Discord, config, avatarURL, footer, clientname, NL3Embed, DevEmbed) {
    ///Command Starts Here
    if (isNaN(args[0])) {
      var user = message.mentions.users.first();
      if (!user) {
        var user = message.author;
      }
    } else {
      var user = await client.users.fetch(args[0]);
    }
    Profile.findOne({
      userID: user.id
    }, (err, chapter) => {
      if (err) console.log(err);
	    if (!chapter) {
        const newUI = new Profile({
          userID: user.id,
          username: user.username
        })
        return newUI.save().catch(err => console.log(err))
	    } else {
        
      }
    })
  }
}
const Discord = require('discord.js');
const Essentials = require('../utils/essentials.js')

module.exports = {
  id: "userinfo",
  name: "User Info", // Command name
  description: "Checks a User's Info.", // Command Description
  aliases: ["usrinfo", "ui", "usrinf"], // Command Aliases
  category: "General",
  cooldown: 10000, // Command cooldown
  examples: ["userinfo", "userinfo @KyIDevs Essentials#0309", "userinfo 751780624704077906"], // Command Examples
  usage: ["[mention or ID]"], // Command Usage
  permissions: ["SEND_MESSAGES", "READ_MESSAGES"], // Command Permissions
  memberPermissions: ["SEND_MESSAGES", "READ_MESSAGES"], // User is required to have these permissions
  admin: false, // Command is admin only
  async execute(client, command, message, args, auth, channel, guild) { // Function async execute()
    // Command Starts Here //
    if (user.presence.activities[0] === undefined || !user.presence.activities[0]) var activity = "**No Activity**";
    else var activity = user.presence.activities[0].state;
    if (user.presence.status === "dnd") var status = "Do Not Disturb";
    else var status = user.presence.status;
    if (message.guild.member(user) === undefined || message.guild.member(user) === null || !message.guild.member(user)) var joined = "User is not on the Server.";
    else var joined = message.guild.member(user).joinedAt;
    if (user.bot) {
      var what = "Bot";
    } else {
      var what = "User";
    }
    var avtr = message.author.avatarURL();
    if (avtr) {
      var avtr = client.config.client.image.blank;
    }
    var uvtr = user.avatarURL();
    if (uvtr) {
      var avtr = client.config.client.image.blank;
    }
    const uinfoembed = new Discord.MessageEmbed()
      .setAuthor(`${user.username}`, `${uvtr}`)
      .setTitle(`${user.username}` + "'s info")
      .setThumbnail(`${uvtr}`)
      .setColor(client.color.default)
      .addField(
        "**Basic Info**",
        "Showing " + `${user.username}` + "'s basic information."
      )
      .addFields(
        { name: "User Tag", value: `${user.tag}`, inline: true },
        { name: "User Discriminator", value: `${user.discriminator}`, inline: true },
        { name: "User ID", value: `${user.id}`, inline: true }
      )
      .addFields(
        { name: "User Presence", value: `**${status}**`, inline: true },
        { name: "User Avatar", value: `[Click me](${user.avatarURL()})`, inline: true },
        { name: "Is a", value: `**${what}**`, inline: true }
      )
      .addFields(
        { name: "Created On", value: `${user.createdAt}`, inline: true },
        { name: "Joined On", value: `${joined}`, inline: true },
        { name: "Requested from", value: `**${message.guild.name}**`, inline: true }
      )
      .addField("User Activity", `${activity}`)
      .setTimestamp()
      .setFooter(
        `Requested by ${message.author.username}`,
        `${avtr}`
      );
    message.channel.send(uinfoembed).catch(err => Essentials.log(err));
  }
};
