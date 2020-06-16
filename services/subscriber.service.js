const
    DbService = require("moleculer-db"),
    Adapter = require("../dbAdapter"),
    constants = require("../const");

module.exports = {
    name: "subscribers",
    mixins: [DbService],
    collection: "sfubscribers",
    adapter: Adapter,
    settings: {
        fields: ["_id", "name", "email", "themes"],
        entityValidator: {
            name: {type: "string", optional: [false, "Нужно имя"], min: 2},
            email: {type: "email"},
            themes: {type: "array", items: "string", enum: [...Object.values(constants.PUBLISHER_TYPES)]}
        }
    },
    async started() {
        this.broker.waitForServices(["subscribers"]).then(async () => {
            await this.dbSeed()
        })
    },
    actions: {}
    ,
    methods: {
        async dbSeed() {
            const seed = require("../subscribersSeed.json");
            const subscribers = await this.broker.call("subscribers.find", {})
            let needSubscribers = []
            seed.forEach(seedSubscriber => {
                let find = subscribers.find(value => value.name === seedSubscriber.name)
                if (!find) {
                    needSubscribers.push(seedSubscriber)
                }
            })
            if (needSubscribers.length > 0) {
                this.logger.info("Seeding subscribers!", needSubscribers.length);
                await this.broker.call("subscribers.insert", {entities: needSubscribers})
            }
        },
    }
    ,
    events: {}
}