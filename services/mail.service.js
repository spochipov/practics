"use strict";

const {ServiceBroker} = require("moleculer");
const MailService = require("moleculer-mail");
module.exports = {
    mixins :[MailService],
    settings: {
        from: "noreply@practics.test",
        transport: {
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        }
    }
}