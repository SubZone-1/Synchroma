const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        bundle: path.resolve(__dirname, "src/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        assetModuleFilename: "[name][ext]",
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist")
        },
        port: 3000,
        open: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
                type: "asset/resource"
            }
        ]
    },
    experiments: {
        topLevelAwait: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Synchroma: Audio-Synced Strobe Lighting",
            filename: "index.html",
            template: "src/template.html",
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "./node_modules/realtime-bpm-analyzer/dist/realtime-bpm-processor.js",
                    to: path.resolve(__dirname, 'dist'),
                }
            ]
        })
    ]
}