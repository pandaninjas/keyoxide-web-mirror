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
                    import: './static-src/index.js'
                }
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
                        test: /\.s[ca]ss$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            'sass-loader'
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
                    buffer: false,
                    perf_hooks: false,
                }
            },
            plugins: [
                new MiniCssExtractPlugin(),
                new CopyPlugin({
                    patterns: [
                        { from: './static-src/files/', to: '../static/' },
                        { from: './node_modules/openpgp/dist/openpgp.js', to: '../static/openpgp.js' },
                        { from: './node_modules/doipjs/dist/doip.core.js', to: '../static/doip.js' },
                        { from: './node_modules/doipjs/dist/doip.fetchers.minimal.js', to: '../static/doipFetchers.js' },
                    ],
                    options: {
                        concurrency: 10,
                    },
                }),
            ],
            externals: {
                doipjs: 'doip',
                openpgp: 'openpgp'
            }
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