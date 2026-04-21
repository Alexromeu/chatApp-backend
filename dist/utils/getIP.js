"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getLocalIP;
const os = require('os');
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal && iface.address.startsWith('192.')) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}
