/* 2.然后创建 src/setupProxy.js 并写入一下转发规则 */
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        ["/server"],
        createProxyMiddleware({
            target: "http://localhost:8085", //配置你要请求的服务器地址
            changeOrigin: true,
            pathRewrite: { "/server": "" }
        })
    );
    //   app.use(
    //     createProxyMiddleware("/manage/api", {
    //       target: "http://admintest.happymmall.com:7000",
    //       changeOrigin: true
    //     })
    //   );
};
