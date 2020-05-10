const { override, fixBabelImports, addLessLoader, addWebpackPlugin, addWebpackAlias } = require("customize-cra");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const path = require('path')

module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true,
    }),
    // 定制主题
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { "@primary-color": "#1DA57A" },
    }),
    // 减小打包大小
    addWebpackPlugin(new AntdDayjsWebpackPlugin()),
    // 配置路径别名
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src')
    }),
);
