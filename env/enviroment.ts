const prod = true;
export const env = {
    baseurl: prod ? process.env['SERVER_URL'] : process.env['LOCAL_URL'],
    domain: process.env['DOMAIN'] ? process.env['DOMAIN'] : '',
    clientID: process.env['CLIENT_ID'] ? process.env['CLIENT_ID'] : '',
    clientSecret: process.env['CLIENT_SECRET'] ? process.env['CLIENT_SECRET'] : '',
};
