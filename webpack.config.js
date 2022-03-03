import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import MiniCssExtractPlugin from "mini-css-extract-plugin"

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
                }
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