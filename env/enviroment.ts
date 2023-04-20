const prod = false;
export const env = {
    baseurl: prod ? process.env['SERVER_URL'] : process.env['LOCAL_URL'],
    domain: process.env['DOMAIN'] ? process.env['DOMAIN'] : '',
    clientID: process.env['CLIENT_ID'] ? process.env['CLIENT_ID'] : '',
    clientSecret: process.env['CLIENT_SECRET'] ? process.env['CLIENT_SECRET'] : '',
    officialId: process.env['OFFICIAL_USER_ID'] ? process.env['OFFICIAL_USER_ID'] : '',
    graphqlUrl: prod ? 'http://127.0.0.1:3000/api/graphql' : process.env['LOCAL_GRAPH_URL']!,
};
