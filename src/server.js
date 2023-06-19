console.log("Hallo kita akan membuat RESTful API");

const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async () => {
  const server = Hapi.server({
    port: 5001,
    host: "localhost",
    routes: {
      cors: true,
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
