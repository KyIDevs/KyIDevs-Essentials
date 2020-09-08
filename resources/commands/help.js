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
      const general = "`" + client.commands.filter(f => f.category === "General").map(e => `${e.id}`).join("`, `") + "`";
      const utilities = "`" + client.commands.filter(f => f.category === "Utilities").map(e => `${e.id}`).join("`, `") + "`";
      const servmngmt = "`" + client.commands.filter(f => f.category === "Server Management").map(e => `${e.id}`).join("`, `") + "`";
      if (general) embed.addField("🍪 **| General**", general)
      if (servmngmt) embed.addField("⚙️ **| Server Managements**", servmngmt)
      if (utilities) embed.addField("🛠️ **| Utilities**", utilities)
      message.channel.send(embed);
    } else {
      const subcommand = client.commands.get(args[0])
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
      if (subcommand) {
        let usage;
        if (subcommand.usage.length) usage = "`" + client.prefix + subcommand.id + "` `" + subcommand.usage.join("` `") + "`";
        else usage = "`" + client.prefix + subcommand.id;
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
        const string = client.emoji.false + " **That's not a valid Command!**" +
          "\nType `" + client.prefix + command.id + "` to get the list of all Commands.";
        const embed = Essentials.constructNoticeEmbed(client, "alert", string);
        message.channel.send(embed);
      }
    }
  }
};
