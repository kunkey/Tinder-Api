require("dotenv").config();
const fs = require('fs');

let saveContentData = function (file, content, mode) {
    try {
        if (mode == "a") {
            fs.appendFileSync(process.cwd() + '/data/' + file, String(content) + "\n", function (err) { });
        } else if (mode == "w") {
            fs.writeFileSync(process.cwd() + '/data/' + file, String(content), function (err) { });
        }
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

let saveUserData = function (content) {
    try {
        fs.appendFileSync(process.cwd() + '/data/user_data.log', String(content) + "\n", function (err) { });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

let getDataContent = function () {
    try {
        let text = fs.readFileSync(process.cwd() + '/data/user_data.log', 'utf8');
        return text;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}

let saveJsonUserData = function (content) {
    try {
        fs.writeFileSync(process.cwd() + '/data/user_data.json', JSON.stringify(content), function (err) { });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}


module.exports = {
    saveContentData,
    saveUserData,
    getDataContent,
    saveJsonUserData
}