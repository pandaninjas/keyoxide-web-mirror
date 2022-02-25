const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = (env) => {
    let config
    if (env.static) {
        config = {
            mode: env.mode,
            entry: {
                main: {
                    import: './static-src/index.js',
                    dependOn: 'openpgp',
                },
                openpgp: './node_modules/openpgp/dist/openpgp.js',
            },
            output: {
                filename: '[name].js',
                path: path.resolve(__dirname, 'static'),
            },
            watch: env.mode == "development",
            module: {
                rules: [
                    {
                        test: /\.css$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader'
                        ]
                    }
                ]
            },
            plugins: [
                new MiniCssExtractPlugin(),
            ],
        }
    } else {
        return {}
    }

    if (env.mode == 'development') {
        config.plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: false
        }))
    }

    return config
}