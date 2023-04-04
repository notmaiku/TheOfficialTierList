import { EnvironmentPlugin } from "webpack";
const DotEnv = require('dotenv-webpack')
module.exports = {
    plugins: [
        new DotEnv()
    ],
}