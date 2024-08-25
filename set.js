const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0cyUnRJYzh4M1JiaFpwdFVua0UxRmlOWkJCSHRJUWp5T21aU0d1RFkzdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTDE2MnN3YWU4TVh5Q0tlSjg1aldPZVhQcXplYm05N1VRTWNCMlZoVmppWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJRy9iK0s5QzFGN2sxclZ4Ukl4WUxMeHNJSE4xSkFrcHhlN1Y3dkhaVVhrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMRmxEL3RjN3A3SlhBeHp4V2ZXRUhnRytuRDh5N2pkR08wK0UxR0NBY2lzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNOOWZ6VVpuMHM2dzRTQndmY1JXZmEzdTd6UnBMdXZYLzhVaXZpOTNJVWM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijc2dnJIUDQydDJMS2lUc2xGcmROVnAzOTdhUk9nR3JBNFZFTHE1dytURGs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUUxMzVuaFllTWdkbnFoY3R4cGNiUm1ZUHZpYitUVzVPVkR5L0pCYUtYND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUFScEVmdW0vV1JmS0VidXRmbk9KVXFJamFYcHZXanhPUVBla0M1ZkVVWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBLZWFqcEVtUW9EYUxMYzY4c0lFbFBpemhiWThIS0VSWkRVdTFLeG9NK2NJVWwrTFl3VkhsSVd2aFZySyt2cmpHVWVjM0lJUlVQVDRvUnk0VnR6Z0NBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE2LCJhZHZTZWNyZXRLZXkiOiJvd1JlMithZTd2dEdQMzlvdU1LMFloMWJlSmFLeUdKUVFVUHZob1IrSlJVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2MzcxMDI5Mjk2MkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0OUY1Q0JBNkJFQURCMTRCQzQ1OUY4Q0Q3NzBDQ0RBRiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI0NjE5MTg2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3MTAyOTI5NjJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOTU3NDc0OThDQTIyQzZFNkEwQkZBOTJCRjM5MjQwRkYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNDYxOTE4Nn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiM3YwVjBnSUlTWHFoaFA0RWM0U2F4USIsInBob25lSWQiOiI0MTI5Y2I5NC02Nzc1LTRlNjItODBiNC0zZmQ4M2ZjOTM5NjYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVWdrZ01BekR1NFQzbEJxak42S0JYSllkc1E0PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkV5WjdDYWlGUjVMSHpOa3J0cXJtSlpKQklTTT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJIUjZMWVdaMiIsIm1lIjp7ImlkIjoiMjYzNzEwMjkyOTYyOjdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQmxhcSBCb3kifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ08vRjZ0a0NFS096cnJZR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkgrRzdQZVdIdkRvY0ZoMzZCaE04emY4NkxmT09vMTh6YzNpVWZNSDB4Z3c9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjlOUmh1MDRpV3pSa3g4Z1VhTUFuOVVMcStBY2tUWW1IOThhd3lDTlRzeG5zc3pEcjZqQU1ib3FpY2VJRnBIcmxSTFhyVTBKUzNXMklPYmdKVkFoUkJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ0c0VMTVJBSVlLOXlRQllKVFdQR3RwTHZNazFGSzdOMHcxS09pRnVhd0JTQVQyQndzYllFVGN3T2JEY2ZrekxxZ3ZkTWxaV2xYNG5qcmF4UWVyT3NCUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxMDI5Mjk2Mjo3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlIvaHV6M2xoN3c2SEJZZCtnWVRQTTMvT2kzempxTmZNM040bEh6QjlNWU0ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQ2MTkxODQsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQy92In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "keithkeizzah",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " keithkeizzah",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
