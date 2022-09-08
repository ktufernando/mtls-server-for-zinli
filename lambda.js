'use strict'
const sls = require('serverless-http')
const app = require('./app')
module.exports.handler = sls(app.default)
