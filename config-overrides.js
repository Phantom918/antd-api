const { override, fixBabelImports, addLessLoader, addWebpackPlugin } = require("customize-cra");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = override(
    fixBabelImports("antd", {
        libraryDirectory: "es",
        style: "css",
        // style: true, // 和上一行对立
    }),
    // // 定制主题
    // addLessLoader({
    //     javascriptEnabled: true,
    //     modifyVars: { "@primary-color": "#1DA57A" },
    // }),
    // 减小打包大小
    addWebpackPlugin(new AntdDayjsWebpackPlugin())
);
