const Discord = require("discord.js");
const db = require('quick.db');
const owner = new db.table("Owner");
const config = require("../config.js");

module.exports = {
    name: 'dmall',
    usage: 'dmall <message>',
    description: `Permet d'envoyer un message privé à tous les membres du serveur.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            const msg = args.join(" ");

            if (!msg) return message.reply(`Veuillez écrire le message qui sera envoyé.`);

            const members = message.guild.members.cache.filter(member => !member.user.bot);

            let sentCount = 0;
            let failedCount = 0;

            members.forEach(member => {
                member.send(msg).then(() => {
                    sentCount++;
                }).catch(() => {
                    failedCount++;
                });
            });

            return message.reply(`Message envoyé à tous les membres.\n**Succès :** ${sentCount}\n**Échecs :** ${failedCount}`);
        } else {
            return message.reply(`Vous n'avez pas les permissions nécessaires pour utiliser cette commande.`);
        }
    }
};