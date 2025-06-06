const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const { updateEnv, readEnv } = require('../lib/database');

cmd({
    pattern: "about",
    alias: ["laki", "kaudame"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📟",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Config එකෙන් LANGUAGE කියවනවා
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        // භාෂාව අනුව පණිවිඩ
        const messages = {
            sinhala: {
                status: (pushname) => `*👋 ආයුබෝවන් ${pushname}*\n` +
                    `✨⃝⃚⃝⃚__ ආ_පැටියෝ_කොහමද?___⃝⃚⃝⃚💕\n` +
                    `*╔══════✮❁•°♛°•❁✮ ═══════╗*\n` +
                    `*💛❐... @DINU BB'h💗ྀི💛*\n` +
                    `*╚══════✮❁•°♛°•❁✮ ═══════╝*\n` +
                    `*❖╭─────────────···▸*\n` +
                    `*❖│▸➤⭕නම - දිනු🪄🤍*\n` +
                    `*❖│▸➤⭕රට - ශ්‍රී ලංකා*\n` +
                    `*❖│▸➤⭕වයස - 17+❣️*\n` +
                    `*❖│▸➤⭕උපන්දිනය - 08/20✨*\n` +
                    `*❖╰────────────···▸▸*\n` +
                    `*╔══════✮❁•°♛°•❁✮ ═══════╗*\n` +
                    `*❖https://wa.me/+94727163302?text=හායි_Dinu+BB'h😩⃝⃚💗⃝⃚🍓🪄🤍*\n` +
                    `*╚══════✮❁•°♛°•❁✮ ═══════╝*\n` +
                    `♡ ㅤ      ❍ㅤ      ⎙ㅤ      ⌲\n` +
                    `ˡᶦᵏᵉ     ᶜᵒᵐᵐᵉⁿᵗ     ˢᵃᵛᵉ     ˢʰᵃʳᵉ*\n` +
                    `*╔═════ °❀•°✮°•❀°═══════╗*\n` +
                    `  *┈━═☆  𝐋𝐎𝐃 𝐗 𝐌𝐃 ☆═━┈*\n` +
                    `*╚══════✮❁•°❀°•❁✮══════╝*\n` +
                    `> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ʟᴏᴅ ᴛᴇᴍ`,
                error: (e) => `කණගාටුයි, දෝෂයක් ඇති වුණා: ${e.message}`
            },
            english: {
                status: (pushname) => `*👋 HELLO ${pushname}*\n` +
                    `✨⃝⃚⃝⃚__ How are you?___⃝⃚⃝⃚💕\n` +
                    `*╔══════✮❁•°♛°•❁✮ ═══════╗*\n` +
                    `*💛❐... @DINU💗ྀི💛*\n` +
                    `*╚══════✮❁•°♛°•❁✮ ═══════╝*\n` +
                    `*❖╭─────────────···▸*\n` +
                    `*❖│▸➤⭕Name - DINU🪄🤍*\n` +
                    `*❖│▸➤⭕From - SRI LANKA*\n` +
                    `*❖│▸➤⭕Age - 17+❣️*\n` +
                    `*❖│▸➤⭕Birthday - 08/20✨*\n` +
                    `*❖╰────────────···▸▸*\n` +
                    `*╔══════✮❁•°♛°•❁✮ ═══════╗*\n` +
                    `*❖https://wa.me/+94727163302?text=HEY_DINU+BB'h😩⃝⃚💗⃝⃚🍓🪄🤍*\n` +
                    `*╚══════✮❁•°♛°•❁✮ ═══════╝*\n` +
                    `♡ ㅤ      ❍ㅤ      ⎙ㅤ      ⌲\n` +
                    `ˡᶦᵏᵉ     ᶜᵒᵐᵐᵉⁿᵗ     ˢᵃᵛᵉ     ˢʰᵃʳᵉ*\n` +
                    `*╔═════ °❀•°✮°•❀°═══════╗*\n` +
                    `  *┈━═☆  𝐋𝐎𝐃 𝐗 𝐌𝐃 ☆═━┈*\n` +
                    `*╚══════✮❁•°❀°•❁✮══════╝*\n` +
                    `> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ʟᴏᴅ ᴛᴇᴍ`,
                error: (e) => `An error occurred: ${e.message}`
            }
        };

        const msg = messages[language] || messages.english; // භාෂාව හමු නොවුණොත් ඉංග්‍රීසි default ලෙස

        // පණිවිඩය යවනවා
        await conn.sendMessage(from, { 
            image: { url: "https://i.imgur.com/O7IN8mD.jpeg" },  // රූප URL
            caption: msg.status(pushname),
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363401755639074@newsletter',
                    newsletterName: '❮❮ QUEEN DINU MD FORWARD ❯❯',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in about command:", e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error(e));
    }
});
