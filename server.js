//Простейший сервер
const http = require("http")
const url = require("url")
// const server = http.createServer((req, res) => {
//         res.statusCode = 200
//         res.setHeader("Content-Type", "text/plain")
//         res.end("hello world")
//     }
// )
const server = new http.Server((req, res) => {
    console.log(req.method, req.url)
    const parsedUrl = url.parse(req.url, true)
    if (parsedUrl.pathname === "/echo" && parsedUrl.query.msg) {
        res.end(parsedUrl.query.msg)
    } else {
        res.statusCode = 404
        res.end("not found")
    }
    res.end(`${req.method} ${req.url}`)
}).listen(3211, "127.0.0.1"
    , () => {
        console.log("http://127.0.0.1:3211")
        // console.log(server)
    }
)

// server.on("request", (req, res) => {
//     res.end("Emmit message")
// })