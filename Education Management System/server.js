const application = require('./app');

const serverPort = process.env.PORT || 3000;

application.listen(serverPort, () => {
  console.log(`Server is up and running on port ${serverPort}`);
});
