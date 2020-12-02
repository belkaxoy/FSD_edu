const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    // if (isProd) {
    //     config.minimizer = [
    //         new OptimizeCssAssetsPlugin(),
    //         new TerserWebpackPlugin()
    //     ]
    //     config.minimize = true
    // }

    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
    const loaders = [{
        loader: MiniCssExtractPlugin.loader
      }, 
      'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['@babel/polyfill', './index.js'],
        // analytics: './analytics.ts'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev 
    },
    devtool: isDev ? 'source-map' : '',
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: 'index.pug',
            //inject: false,
            // minify: {
            //     collapseWhitespace: isProd
            // }
        }),
        new HTMLWebpackPlugin({
            filename: 'colors-types.html',
            template: './pages/colors-types.pug'
        }),
        new HTMLWebpackPlugin({
            filename: 'form-elements.html',
            template: './pages/form-elements.pug'
        }),
        new HTMLWebpackPlugin({
            filename: 'cards.html',
            template: './pages/cards.pug'
        }),
        new HTMLWebpackPlugin({
            filename: 'headers-footers.html',
            template: './pages/headers-footers.pug'
        }),
        // PAGES.map((page) => new HtmlWebpackPlugin({
        //     template: `${PAGES_DIR}/${page}`,
        //     filename: `./${page}`,
        //     inject: true,
        // })),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/img/photo_01.png'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin ({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: ['pug-loader']
            },
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.(png|jpg|svg|ttf|woff)$/,
                use: ['file-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-typescript'
                ]
                    }
                }
            }
        ]
    }
}