const {EventEmitter} = require('events');

class MessageBroker extends EventEmitter {
    constructor() {
        super();
        this.subscriberList = {};
    }

    subscribe(eventName, subscriber, listener) {
        if (!this.subscriberList.hasOwnProperty(eventName)) {
            this.subscriberList[eventName] = [];
        }
        if (!this.subscriberList[eventName].hasOwnProperty(subscriber)) {
            this.subscriberList[eventName][subscriber] = [];
        }
        this.subscriberList[eventName][subscriber].push(listener);
        super.on(`${eventName}.${subscriber}`, listener);
    }

    publish(event, ...args) {
        if (!this.subscriberList[event]) return;
        for (const subscriber in this.subscriberList[event]) {
            const subEvent=`${event}.${subscriber}`
            super.emit(subEvent, ...args)
        }
    }

    unsubscribe(eventName, subscriber) {
        if (!this.subscriberList[eventName] || !this.subscriberList[eventName][subscriber] || !this.subscriberList[eventName][subscriber].length) return;
        for (const listener in this.subscriberList[eventName][subscriber]) {
            super.removeListener(`${eventName}.${subscriber}`, this.subscriberList[eventName][subscriber][listener])
        }
        delete this.subscriberList[eventName][subscriber]
    }
}

const mb = new MessageBroker()

// ПОдписывается первый на эвент
mb.subscribe("event", "sub1", (msg) => {
    console.log("event sub 1: ", msg)
})

//подписывается второй на эвент
mb.subscribe("event", "sub2", (msg) => {
    console.log("event sub 2: ", msg)
})

// первая побликация по эвенту
mb.publish("event", "message1")

//перывый решил отписаться от эвента
mb.unsubscribe("event", "sub2")

// вторая побликация по эвенту
mb.publish("event", "message2")