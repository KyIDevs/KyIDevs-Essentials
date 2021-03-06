const Discord = require('discord.js');
const User = require("../models/user.js");
const Guild = require("../models/guild.js");
const Channel = require("../models/channel.js");
const Cooldown = require("../models/cooldowns.js");
const Essentials = require("../utils/essentials.js");

module.exports = {
  name: "message", // Event Name
  async execute(
    client, event, message
  ) {
    // Set Status to Idle ////////
    // Can be Online, Idle, DND //
    // or Invisible.            //
    //////////////////////////////

    // Disallows self trigger //
    if (message.author === client.user) return

    // Begin Profiling and Blocking //
    // Block Stuff here, types, channels, and guilds, even people. //
    if (
      message.author.bot ||
      message.webhookID
    ) return;
    if (
      !message.guild ||
      message.channel.type === "dm"
    ) return message.author.send("Sorry, we don't support DMs yet.");
    
    const avtr = message.author.avatarURL() || client.defaultAvatar;

    const debug = true;
    if (debug) {
      const chnl = client.channels.cache.get(client.config.debug.chatlog);
      if (!chnl) return Essentials.log(client, "TypeError: The channel `chnl` doesn't exist or the bot isn't in the guild it's in!")
      if (message.content) {
        const embed = new Discord.MessageEmbed()
          .setAuthor(client.name, client.avatar)
          .setColor(client.color.purple)
          .setThumbnail(avtr)
          .addFields(
            { name: "Name", value: message.author.tag, inline: true },
            { name: "Time", value: message.createdAt, inline: true }
          )
          .addField("Content", message.content)
          .addFields(
            { name: "Guild", value: message.guild.name, inline: true },
            { name: "Channel", value: message.channel.name, inline: true },
            { name: "Message Link", value: `[Message Link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`, inline: true }
          )
          .setFooter(client.footer)
        chnl.send({ embed: embed });
      }
    }
  
    // Begin Command, Filtering, perms system, etc. //
    Guild.findOne({
      guildId: message.guild.id
    }, async (err, guild) => {
      if(err) Essentials.log(client, err);
      if(!guild){
        const newDoc = new Guild({
          guildId: message.guild.id,
          welcomeChannelId: message.channel.id,
          loggingChannelId: message.channel.id,
          levelingChannelId: message.channel.id
        })
        newDoc.save().catch(err => Essentials.log(client, err));
      }
      Channel.findOne({
        guildId: message.guild.id,
        channelId: message.channel.id
      }, async (err, channel) => {
        if(err) Essentials.log(client, err);
        if(!channel){
          const newDoc2 = new Channel({
            guildId: message.guild.id,
            channelId: message.channel.id
          })
          newDoc2.save().catch(err => Essentials.log(client, err));
        }
        User.findOne({
          userId: message.author.id
        }, async (err, auth) => {
          if(err) Essentials.log(client, err)
          if(!auth){
            const newDoc3 = new User({
              userId: message.author.id
            })
            newDoc3.save().catch(err => Essentials.log(client, err));
          }
          
            // Importing Commands //
            if (!guild) {
              client.prefix = client.def.prefix;
            } else {
              if (guild.banned !== false) return;
              client.prefix = guild.prefix;
            }
            if (auth) {
              if (auth.banned !== false) return;
            }
            if (channel) {
              if (channel.banned !== false) return;
              if (channel.disabled !== false) return;
            }
            if (message.content.toLowerCase().startsWith(client.prefix)) {
              const commandName = message.content
                .slice(client.prefix.length)
                .toLowerCase()
                .split(" ")[0]
                .toLowerCase();
              const args = message.content
                .slice(client.prefix.length)
                .split(" ")
                .slice(1);
              const command = client.commands.get(commandName)
                || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
              if (command) {
                Cooldown.findOne({
                  userId: message.author.id,
                  command: command.id
                }, async (err, cooldown) => {
                  if(err) Essentials.log(client, err)
                  if(!cooldown){
                    const newDoc4 = new Cooldown({
                      userId: message.author.id,
                      command: command.id,
                      time: message.createdTimestamp + command.cooldown
                    })
                    newDoc4.save().catch(err => Essentials.log(client, err));
                  }
                  if (!cooldown || (cooldown.time + command.cooldown) < message.createdTimestamp ) {
                    if (cooldown) {
                      cooldown.time = message.createdTimestamp;
                    }
                    let isAdmin = false;
                    let allowUsage = false;
                    if (client.config.admin.id.concat(client.config.admin.owner.id.split()).includes(message.author.id)) isAdmin = true;
                    if (command.admin) {
                      if (isAdmin === true) allowUsage = true;
                    } else allowUsage = true;
                    if (allowUsage) {
                      if (message.guild.members.cache.get(client.user.id).permissions.has(command.permissions)
                        || message.guild.members.cache.get(client.user.id).permissions.has('ADMINISTRATOR')
                      ) {
                        if (message.member.permissions.has(command.memberPermissions) || message.member.permissions.has('ADMINISTRATOR')) {
                          if ((message.channel.nsfw && command.nsfw == true) || command.nsfw == false) {
                            try {
                              await command.execute(
                                client, command, message, args, auth, channel, guild
                              );
                            } catch (err) {
                              Essentials.log(client, err)
                            }
                          } else {
                            const string = "NSFWError: You can only run this command in an NSFW Channel.";
                            const embed = Essentials.constructNoticeEmbed(client, "alert", string);
                            message.channel.send(embed);
                          }
                        } else {
                          const string = "PermissionsError: Check if you have these permissions:\n" + command.memberPermissions.join(", ");
                          const embed = Essentials.constructNoticeEmbed(client, "alert", string);
                          message.channel.send(embed);
                        }
                      } else {
                        const string = "BotPermissionsError: Check if the bot has these permissions:\n" + command.permissions.join(", ");
                        const embed = Essentials.constructNoticeEmbed(client, "alert", string);
                        message.channel.send(embed);
                      }
                    } else {
                      const string = "PermissionsError: This command is admin-only.";
                      const embed = Essentials.constructNoticeEmbed(client, "alert", string);
                      message.channel.send(embed);
                    }
                  } else if (cooldown && (cooldown.time + command.cooldown) > message.createdTimestamp) {
                    const time = Math.floor((cooldown.time + command.cooldown - message.createdTimestamp) / 1000);
                    alert = `${message.author.tag}, Please wait ${time} seconds before trying again!`;
                    const embed = Essentials.constructNoticeEmbed(client, "alert", alert);
                    return message.channel.send(embed);
                  }
                  if (cooldown) {
                    cooldown.save().catch(err => Essentials.log(client, err))
                  }
                })
              }
            }
            if (
              message.content.toLowerCase().startsWith(")prefix") &&
              guild.prefix !== ")"
            ) {
              const Prefix = new Discord.MessageEmbed()
                .setAuthor(client.name, client.avatar)
                .setColor(client.color.default)
                .setDescription("The Server's Current Prefix is " + client.prefix)
                .setFooter(client.footer, client.avatar);
              message.author.send(Prefix);
            }
            
            if (guild) {
              guild.save().catch(err => Essentials.log(client, err));
            }
            if (auth) {
              auth.save().catch(err => Essentials.log(client, err));
            }
            if (channel) {
              channel.save().catch(err => Essentials.log(client, err));
            }
        })
      })
    })
  }
};
