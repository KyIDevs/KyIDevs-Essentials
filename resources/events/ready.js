

client.footer = Essentials.placeHolder(client, config.client.settings.footer);
  client.footer = await Essentials.placeHolder(client, config.client.settings.footer);
  let activity = {};
  activity.name = await Essentials.placeHolder(client, config.client.presence.activity.default.name);
  activity.type = config.client.presence.activity.default.name;
  activity.status = config.client.presence.activity.status;
  try {
    // Set Activity every 30 seconds
    setInterval(() => {
      client.user.setActivity(
        activity.name, {
          type: activity.type
        }
      );
      client.user.setStatus(activity.status);
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
