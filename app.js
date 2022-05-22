const tinderApi = require('./TinderApi');

// thả like user 
tinderApi.getUser();

// gửi tin nhắn khi đã match

// # recall rep tin nhắn sau 20s
setInterval(() => {
    tinderApi.getMatch(100);
}, 20000);