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

const Discord = require("discord.js");

module.exports = {
  name: "Essentials", // Module Name
  constructNoticeEmbed(
    client, type, string
  ) {
    // Function: constructNoticeEmbed()
    if (type === "error") {
      const embed = new Discord.MessageEmbed()
        .setColor(client.color.red)
        .setDescription(
          client.emoji.false + " **|** " + "**Encountered Error Exception**\n" +
          client.emoji.blank + " **|** " + "`Error: " + string + "`"
        );
      return embed;
    }
    if (type === "alert") {
      const embed = new Discord.MessageEmbed()
        .setColor(client.color.yellow)
        .setDescription(
          client.emoji.blank + " **|** " + "`" + string + "`"
        ); 
      return embed;
    }
    if (type === "message") {
      const embed = new Discord.MessageEmbed()
        .setColor(client.color.default)
        .setDescription(
          client.emoji.blank + " **|** " + string
        );
      return embed;
    }
  },
  constructShortEmbed(
    color, author, authorImg, title, description, image, thumbnail
  ) {
    // Function: constructShortEmbed()
    const embed = new Discord.MessageEmbed();

    if (color && color !== "none") embed.setColor(color);
    if (author && author !== "none") {
      if (authorImg && authorImg !== "none") {
        embed.setAuthor(author, authorImg);
      } else {
        embed.setAuthor(author);
      }
    }
    if (title && title !== "none") embed.setTitle(title);
    if (description && description !== "none") embed.setDescription(description);
    if (image && image !== "none") embed.setImage(image);
    if (thumbnail && thumbnail !== "none") embed.setThumbnail(thumbnail);

    return embed;
  },
  clean (text) {
    if (typeof text === "string") {
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    } else {
      return text;
    }
  },
  placeHolder(client, string) {
    if (typeof string === "string") {
      return string
        .replace(/%totalCommands%/gi, client.commands.array().length)
        .replace(/%clientName%/gi, client.config.client.info.name)
        .replace(/%clientId%/gi, client.user.id)
        .replace(/%clientDescription/gi, client.config.client.info.description)
        .replace(/%clientUsername%/gi, client.user.username)
        .replace(/%clientTag%/gi, client.user.username)
        .replace(/%clientDevName%/gi, client.dev.name)
        .replace(/%clientDevHelpers%/gi, client.dev.helpers.join(", "))
        .replace(/%clientDefaultPrefix%/gi, client.def.prefix)
        .replace(/%clientGuildCount%/gi, client.guilds.cache.size)
        .replace(/%clientChannelCount%/gi, client.channels.cache.size)
        .replace(/%clientUserCount%/gi, client.users.cache.size);
    } else {
      return string;
    }
  },
  errorEmbed(err) {
    clean(err) {
      if (typeof err === "string") {
        return err
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      } else {
        return err;
      }
    }
    const embed = new Discord.MessageEmbed()
      .setColor([ 255, 8, 0 ])
      .setDescription('**Error**\n```xl\n' + clean(err) + '\n```');
    return embed;
  },
  log(client, err) {
    clean(err) {
      if (typeof err === "string") {
        return err
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      } else {
        return err;
      }
    }
    if (client.config.debug.type === "message") {
      const embed = new Discord.MessageEmbed()
        .setColor([ 255, 8, 0 ])
        .setDescription('**Error**\n```xl\n' + clean(err) + '\n```');
      client.debugChannel.send(embed);
      return;
    }
    if (client.config.debug.type === "log") {
      console.log(err);
      return;
    }
  }
};
