// simple in-memory store

const urls = {};

function generateCode() {
    return Math.random().toString(36).substring(2, 8);
}

function saveUrl(originalUrl) {
    const code = generateCode();
    urls[code] = originalUrl;
    return code;
}

function getUrl(code) {
    return urls[code];
}

function getAll() {
    return urls;
}

module.exports = { saveUrl, getUrl, getAll };
