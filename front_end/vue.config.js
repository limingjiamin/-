const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    client:{
      WebSocketURL:'localhost:8080/ws',
    }
  }
});
