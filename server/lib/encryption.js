const bcrypt = require("bcrypt");

/** HASHING THE PASSWORD */
async function encrypt(text) {
    if (!text) return "";

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(text, salt);
    return hashedPass;
}

/** COMPARING THE HASHED PASSWORD WITH PLAIN TEXT PASSWORD */
async function compare(textPass, hashedPass) {
    return await bcrypt.compare(textPass, hashedPass);
}

module.exports = { encrypt, compare };