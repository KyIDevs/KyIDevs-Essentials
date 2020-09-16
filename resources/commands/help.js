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
  id: "help",
  name: "Help", // Command name
  description: "Default help command.", // Command Description
  aliases: ["hlp", "?"], // Command Aliases
  category: "General",
  cooldown: 5000, // Command cooldown
  examples: ["help", "help eval"], // Command Examples
  usage: ["[sub-command]"], // Command Usage
  permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY"], // Command Permissions
  memberPermissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY"], // User is required to have these permissions
  admin: false, // Command is admin only
  nsfw: false, // COmmand is NSFW only
  async execute(client, command, message, args, auth, channel, guild) { // Function async execute()
    // Command Starts Here //
    const subcmd = args[0];

    // Run Self Command if Args Undefined //////////////////////////////////////////////
    if (!subcmd) {
      const embed = new Discord.MessageEmbed()
        .setTitle("**Command List**")
        .setAuthor(client.name, client.avatar)
        .setColor(client.color.default)
        .setDescription(
          "Use `" + client.prefix + command.id + "` `[sub-command]` to get detailed info."
        )
        .setFooter(client.footer, client.avatar)
      
      let categories = ["General", "Actions", "Utilities", "Server Management"];
      let categories_emojis = ["🍪", "☢️", "📋", "⚙️"];
      let categories_admin = ["🛠️", "Admin"];
      let categories_nsfw = ["🔞", "NSFW"];
      let cmds = [];
      if (client.admin.concat(client.owner.split()).includes(message.author.id)) {
        categories.push(categories_admin[1]);
        categories_emojis.push(categories_admin[0]);
      }
      if (message.channel.nsfw) {
        categories.push(categories_nsfw[1]);
        categories_emojis.push(categories_nsfw[0]);
      }
      categories.forEach(c => {
        let commands_list = "`" + client.commands.filter(f => f.category === c).map(e => `${e.id}`).join("`, `") + "`";
        if (client.commands.filter(f => f.category === c))
          cmds.push(commands_list)
      })
      for(count=0;count<cmds.length;count++) {
        embed.addField(`${categories_emojis[count]} **|** ${categories[count]}`, cmds[count]);
      }
      message.channel.send(embed);
    } else {
      const subcommand = client.commands.get(args[0])
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
      if (subcommand) {
        if ((message.channel.nsfw && subcommand.nsfw == true) || subcommand.nsfw == false) {
          let usage;
          if (subcommand.usage.length) usage = "`" + client.prefix + subcommand.id + "` `" + subcommand.usage.join("` `") + "`";
          else usage = "`" + client.prefix + subcommand.id + "`";
          const embed = new Discord.MessageEmbed()
            .setTitle(`**${subcommand.name}**`)
            .setAuthor(client.name, client.avatar)
            .setColor(client.color.default)
            .addField("**Category**", subcommand.category, true)
            .addField("**Aliases**", '`' + subcommand.aliases.join("`, `") + '`', true)
            .addField("**Cooldown**", `${subcommand.cooldown / 1000} seconds`, true)
            .addField("**Usage**", usage)
            .addField("**Examples**", '`' + subcommand.examples.join("`\n`") + '`')
            .addField("**Permissions**", '`' + subcommand.permissions.join("`, `") + '`')
            .addField("**User Required Permissions**", '`' + subcommand.memberPermissions.join("`, `") + '`')
            .setFooter(client.footer, client.avatar);
          if (subcommand.admin) embed.setDescription(subcommand.description + "\n**This command is admin-only.**");
          else embed.setDescription(subcommand.description);
          message.channel.send(embed);
        } else {
          const string = "NSFWError: You can only use this subcommand in an NSFW Channel.";
          const embed = Essentials.constructNoticeEmbed(client, "alert", string);
          message.channel.send(embed);
        }
      } else {
        const string = client.emoji.false + " That's not a valid Command!" +
          "\nType " + client.prefix + command.id + " to get the list of all Commands.";
        const embed = Essentials.constructNoticeEmbed(client, "alert", string);
        message.channel.send(embed);
      }
    }
  }
};
