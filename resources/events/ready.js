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
const Essentials = require("../utils/essentials.js");

module.exports = {
  name: "ready", // Event Name
  async execute(
    client, event
  ) {
    let activity = {};
    async function setActv() {
      activity.type = client.config.client.presence.activity.default.name;
      activity.status = client.config.client.presence.activity.status;
      activity.name = await Essentials.placeHolder(client, client.config.client.presence.activity.default.name);
      client.user.setActivity(activity.name, {
        type: activity.type
      });
      client.user.setStatus(activity.status);
    }
    client.footer = Essentials.placeHolder(client, client.config.client.settings.footer);
    try {
      // Set Activity every 30 seconds
      setInterval(async () => {
        await setActv().catch(err => Essentials.log(client, error))
      }, 5000);
    } catch (error) {
      Essentials.log(client, error);
    }
  
    // Bot Ready Log //
    console.log(
      `Logged in as ${client.user.tag}.\n`
      + `There are ${client.users.cache.size} users and/or bots online.\n`
      + `${client.user.tag} connected to:\n${client.guilds.cache
        .map(g => g.name)
        .join(", ")}`
    );
  }
};
