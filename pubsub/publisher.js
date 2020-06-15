const pubSub = require("./pubsub");

module.exports = {
    publishEvent(data) {
        pubSub.publish("anEvent", data);
    }
};