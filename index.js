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
            to: i.options.getString("to"),
            text: i.options.getString("text"),
        }

        translate(options.text, { to: options.to }).then(res => {
            let e = new Discord.MessageEmbed()
            .setAuthor(i.user.username+"#"+i.user.discriminator, i.user.avatarURL({ dynamic: true }))
            .setDescription("```"+res+"```")
            .setColor("RANDOM")
            i.reply({
                embeds: [e]
            })
        }).catch(err => {
            let l = new Discord.MessageEmbed()
            .setAuthor(i.user.username+"#"+i.user.discriminator, i.user.avatarURL({ dynamic: true }))
            .setDescription("```Error```")
            .setColor("RED")
            i.reply({
                embeds: [l]
            })
        })
    }

    if (i.commandName === 'help') {
        let options = {
            commands: i.options.getString("commands"),
        }

        if (options.commands === "help_cmd") {
            let f = new Discord.MessageEmbed()
            .setAuthor("Request By "+i.user.username+"#"+i.user.discriminator, i.user.avatarURL({ dynamic: true }))
            .setDescription(`Use **/help** to get the commands.`)
            .setColor("RANDOM")

            return i.reply({
                embeds: [f]
            })
        }

        if (options.commands === "translate_cmd") {
            let f = new Discord.MessageEmbed()
            .setAuthor("Request By "+i.user.username+"#"+i.user.discriminator, i.user.avatarURL({ dynamic: true }))
            .setDescription(`Use **/translate** to translate text.`)
            .setColor("RANDOM")

            return i.reply({
                embeds: [f]
            })
        }

        if (options.commands === "links_cmd") {
            let f = new Discord.MessageEmbed()
            .setAuthor("Request By "+i.user.username+"#"+i.user.discriminator, i.user.avatarURL({ dynamic: true }))
            .setDescription(`Use **/links** to get bot links.`)
            .setColor("RANDOM")

            return i.reply({
                embeds: [f]
            })
        }
            let e = new Discord.MessageEmbed()
            .setAuthor("Request By "+i.user.username+"#"+i.user.discriminator, i.user.avatarURL({ dynamic: true }))
            .setDescription(`How to use Translator? To translate a text use **/translate** and enter the required options.`)
            .setColor("RANDOM")

            i.reply({
                embeds: [e]
            })
    }

    if (i.commandName === 'links') {
            let e = new Discord.MessageEmbed()
            .setAuthor(i.user.username+"#"+i.user.discriminator, i.user.avatarURL({ dynamic: true }))
            .setDescription(`These are the most important and useful links of the bot:
**INVITE ➜** [Here](https://discord.com/api/oauth2/authorize?client_id=934810188731527238&permissions=8&scope=applications.commands%20bot)
**SUPPORT SERVER ➜** [Join](https://discord.gg/TAdzr7m4bS)
**GITHUB ➜** [Repository](https://github.com/BotGround/Translator)`)
            .setColor("RANDOM")
            i.reply({
                embeds: [e]
            })
    }
})