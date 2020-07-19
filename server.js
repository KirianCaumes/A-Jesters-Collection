//Dev server
require("live-server").start({
    port: 3000,
    host: "0.0.0.0",
    root: "./public",
    open: true,
    ignore: './public/scss',
    file: "index.html",
    wait: 0,
    // mount: [['/node_modules', './node_modules']],
    logLevel: 2,
    middleware: [function (req, res, next) { next(); }]
})