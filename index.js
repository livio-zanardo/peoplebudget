const server = require('./app/app');
server.listen(process.env.PORT, (message) =>
    console.log(`App listening on port:${process.env.PORT}`)
);
