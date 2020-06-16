const
    DbService = require("moleculer-db"),
    Adapter = require("../dbAdapter"),
    constants = require("../const");

module.exports = {
    name: "publications",
    mixins: [DbService],
    adapter: Adapter,
    collection: "publications",
    settings: {
        fields: ["_id", "theme", "text", "subscribers"],
        entityValidator: {
            theme: {type: "string", enum: [...Object.values(constants.PUBLISHER_TYPES)], optional: false},
            text: {type: "string", optional: false},
            subscribers: {type: "array", items: "string", optional: true}
        },
    },
    actions: {
        test:{
            async handler(ctx){
                await this.broker.call("mail.send", {
                    to: "stas.pochipov@gmail.com",
                    subject: "Hello Friends!",
                    html: "This is the <b>content</b>!"
                }).then(console.log);
            }
        }
    },
    methods: {
        async findSubs(theme) {
            return this.broker.call("subscribers.find", {
                query: {
                    "theme": theme
                }
            })
        }
    },
    events: {
        "publications.create"(pub) {

        }
    }
}