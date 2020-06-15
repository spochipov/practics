const pubSub = require("./pubsub");
let subscription;
subscription = pubSub.subscribe("subEvent", data => {
    console.log(`"subEvent", Был опубликован с сообщением: "${data.msg}"`);

    // subscription.unsubscribe();
});


console.log(subscription)