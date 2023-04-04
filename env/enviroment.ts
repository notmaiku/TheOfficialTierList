const prod = true;
export const env = {
    baseurl: prod ? process.env['SERVER_URL'] : process.env['LOCAL_URL']
};
