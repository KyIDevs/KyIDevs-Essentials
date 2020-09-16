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
    client.defaultAvatar = client.user.defaultAvatarURL;
    if (client.config.client.image.avatar && client.config.client.image.avatar !== "<>") client.avatar = client.config.client.image.avatar;
    else client.avatar = client.user.avatarURL({format: "png", size: 1024, dynamic: true}) || client.defaultAvatar;
    try {
      client.user.setStatus(client.config.client.presence.activity.status);
      setInterval(() => {
        client.user.setActivity(
          Essentials.placeHolder(client, client.config.client.presence.activity.default.name), {
            type: client.config.client.presence.activity.default.type
          }
        );
        client.footer = Essentials.placeHolder(client, client.config.client.settings.footer);
      }, 5000);
  
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
