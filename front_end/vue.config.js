const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  /* devServer:{
    client:{
      WebSocketURL:'ws://localhost:8080/ws',
    }
  } */
});
