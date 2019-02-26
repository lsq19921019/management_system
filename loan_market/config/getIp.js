let networkInterfaces = require('os').networkInterfaces();
let address = 'localhost';

for(let key in networkInterfaces) {
    let iface = networkInterfaces[key];
    if(address != 'localhost') break;
    for(let i=0; i<iface.length; i++) {
        let o = iface[i];
        if(o.family=='IPv4' && o.address!='127.0.0.1' && !o.internal) {
            address = o.address;
            break;
        }
    }
}

module.exports = address;