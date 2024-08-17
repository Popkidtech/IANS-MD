const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS01xNjNScGFNbGNCNUd6N1ZuWHoybFlDTndOUkowdU9xd3pKNVlRYkhsTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTzh0QkpQbGk4cllXL3lNcXpZdUpUYlRjQUswbzZHTWtUNXQxb1FCUWF6RT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjQ0ZVYndQRGtoQXNXOFh0WjJZcjY2WU1oSkVkWmJ6OGt4RDJ6bjk3MlU4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEUzdIalJlRFFDcmhpWE1sY0ZScHhsQjJVNmpBK2RMNkkrUFVHSjROKzJjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhMd2EwTGFQYWJaTTk0V2g0WXZuRDJUUW13cFFFTHhFVjBhZkdzWkdkWEk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkgzQ3FXa3kvQjlib1dXekt2VUxoanZ6VFdkRnQ3bmR6cEZNckFUWXNNWEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUNkNU1FV3JEb3BxdkVYdnhCekN2QU9Ud0VpV3Z4bTNuQWVRNXhUcUExbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoienkvckR4RjBGZzVqZXJ0aTVqK3p5T1BaaUNBS2VqSnc3RW85KzdNRnlVWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InExTVUrZi9kUjRUQy92VkZ1dXNuY0xLdVNHemJDVTA5TEVTc1hQZUxuQ3JSYTBOVUVrRHl0YjMvOHZsVnkxcGlzTExGZ2NReDZTaFNWejhQN0paMWpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA3LCJhZHZTZWNyZXRLZXkiOiJjNHQ1eTR2NHg3OWg0WkZJeEY5TVE5Y2dIdFhHVERxKzM2cFlvYUczaFpnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJjWW1Ydm16b1FQRzVQSkNMQ2NrWjR3IiwicGhvbmVJZCI6ImZlZGYxZTExLTUzNWItNGY1MS05NDgzLTc4ZDhmNDg1NDBiNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaQjZ5S2JWZnYxV25NSTBoNDRLaTFRcHRSeHM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaWpvL1YycW1JYlJkVWtoZmpsdndaS2V5dkJrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkFXMUNQSDUzIiwibWUiOnsiaWQiOiIyNTQ3NDM5ODIyMDY6ODFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoifmBgYEJFUkEgVEVDSGBgYH4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01qeDlOb0dFTG1naExZR0dBd2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImRPcVVvc3MwUjZWeUpFOWtNSWM2ZzBrV3duUkhGaHp3RUR3akZMZU9weEE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkFZOXJaTXdRMkl3TGJQanRRQm02ODh1aXk1c0RkMkZvOFRuWlBaL2xXMFNuVWZPR0pOT1NkWTZYelVJRVRicjZ5M0VmYngvdzlTY1V4ZWRiL2ZsTURBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJIVHdUaWh2Y0RRV3dzYkhabXNCdGh6VDZIZUlYaGFmS01CTzU2VkZqV1ZQampEM0hsVjFvWEVVRVl2WXM5d0VxNmFHbnlEQkVyaDJNYkRXUmxqdHFndz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc0Mzk4MjIwNjo4MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYVHFsS0xMTkVlbGNpUlBaRENIT29OSkZzSjBSeFljOEJBOEl4UzNqcWNRIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzOTI4NjQ2fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "BRUCE BERA",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254743982206",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BEST CODER MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/76337c73fe48a2aa4466b.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
