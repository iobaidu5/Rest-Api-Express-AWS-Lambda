// lambda.js
const serverlessExpress = require('@vendia/serverless-express')
const app = require('./server/server.js')
exports.handler = serverlessExpress({ app })