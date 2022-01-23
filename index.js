const Discord = require('discord.js')
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const env = require('dotenv').config()

client.on('ready', () => {
    console.log(`${client.user.username}#${client.user.discriminator} Online!`)

    const guild = client.guilds.cache.get('934811037520236614')
    let commands = guild.commands

    commands?.create({
        name: 'help',
        description: 'Help of commands',
        options: [
            {
                name: 'commands',
                description: 'Get information about commands',
                type: 'STRING',
                choices: [
                    {
                       name: 'help',
                       value: 'help_cmd'
                    },
                    {
                        name: 'translate',
                        value: 'translate_cmd'
                    },
                    {
                        name: 'links',
                        value: 'translate_cmd'
                    },
                ]
            },
        ]
    })
})

client.login(process.env.TOKEN)