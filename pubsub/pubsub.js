let subscribers = {};

module.exports = {
    /**
     * Вызов зарегистрированных колбеков
     * @param event
     * @param data
     */
    publish(event, data) {
        if (!subscribers.event) return;

        subscribers.event.forEach(subscriberCallback => subscriberCallback(data));
    },
    /**
     * регистрация колбека подписчика
     * @param event - имя события
     * @param callback
     * @returns {{unsubscribe(): void}}
     */
    subscribe(event, callback) {
        let index;

        if (!subscribers.event) {
            subscribers.event = [];
        }

        index = subscribers.event.push(callback) - 1;

        return {
            unsubscribe() {
                subscribers.event.splice(index, 1);
            }
        };
    }
};