const Discord = require('discord.js')
const translate = require('translate-google')
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
                required: false,
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
                        value: 'links_cmd'
                    },
                ]
            },
        ]
    })

    commands?.create({
        name: 'translate',
        description: 'Translate text to language',
        options: [
            /* {
                name: 'from',
                description: 'Your text language code',
                type: 'STRING',
                required: true,
            }, */
            {
                name: 'to',
                description: 'Language to translate your text',
                type: 'STRING',
                required: true,
            },
            {
                name: 'text',
                description: 'Text to translate',
                type: 'STRING',
                required: true,
            },
        ]
    })

    commands?.create({
        name: 'links',
        description: 'Bot links',
    })
})

client.login(process.env.TOKEN)


client.on('interactionCreate', i => {
    if (!i.isCommand()) return;

    if (i.commandName === 'translate') {
        let options = {
            from: i.options.getString("from"),
            to: i.options.getString("to"),
            text: i.options.getString("text"),
        }

        translate(options.text, { to: options.to }).then(res => {
            let e = new Discord.MessageEmbed()
            .setAuthor(i.user.username, i.user.avatarURL({ dynamic: true }))
            .setDescription("```"+res+"```")
            .setColor("RANDOM")
            i.reply({
                embeds: [e]
            })
        }).catch(err => {
            
        })
    }
})