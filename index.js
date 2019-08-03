const Bot = require('./src/Equalizer');

const Equalizer = new Bot();

Equalizer.login('NDg0NTkwNjA0MTA2NDY1Mjkx.XUUsWA.9O5OJmq1nvVIKZYxvqrKHD715R4')
    .catch((error) => {
        console.error(error);
        process.exit();
    });