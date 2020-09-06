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

const mongoose = require("mongoose");
const def = require("../extensions/defaults.json");

const guildSchema = mongoose.Schema({
  guildId: String,
  welcomeChannelId: String,
  welcome: {type: Boolean, default: false},
  prefix: {type: String, default: def.prefix},
  loggingChannelId: String,
  logging: {type: Boolean, default: false},
  banned: {type: Boolean, default: false},
  levelingChannelId: String,
  levelUp: {type: Boolean, default: false},
  bannedFor: {type: Number, default: 0},
  bannedSince: {type: Number, default: 0}
});

module.exports = mongoose.model("Guild", guildSchema)
