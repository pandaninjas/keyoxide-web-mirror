import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyPlugin from 'copy-webpack-plugin'

const __dirname = dirname(fileURLToPath(import.meta.url));
    
export default (env) => {
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
                path: resolve(__dirname, 'static'),
                clean: true
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
            resolve: {
                fallback: {
                    crypto: false,
                    assert: false,
                    util: false,
                    https: false,
                    http: false,
                    net: false,
                    url: false,
                    tls: false,
                    dns: false,
                    stream: false,
                    zlib: false,
                    querystring: false,
                    os: false,
                    child_process: false,
                    fs: false,
                    path: false,
                }
            },
            plugins: [
                new MiniCssExtractPlugin(),
                new CopyPlugin({
                    patterns: [
                        { from: './static-src/files/', to: '../static/' },
                    ],
                    options: {
                        concurrency: 10,
                    },
                }),
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