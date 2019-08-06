const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack")

// Plugin Constants
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (args, env) => {

    let mode = env.mode || "development";

    return {
        mode: mode,
        devtool: "inline-source-map",
        devServer: {
            hot:true,
            contentBase: './dist',
            index: "home.html"
        },

        resolve: {
            modules: [
                'node_modules',
                path.resolve(__dirname, 'src/js/modules'),
                path.resolve(__dirname, "src/js/components")
            ],
            alias: {
                "scss": path.resolve(__dirname, 'src/scss'),
                "fonts": path.resolve(__dirname, 'src/fonts'),
            }
        },

        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },

        context: path.resolve(__dirname, 'src'),

        entry: {
            "js/main": "./js/main",
            "js/home": "./js/home",
            "js/academics": "./js/academics"
        },

        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [
                        
                        (mode === "development" ? { 
                            loader: "style-loader",
                            options: {
                                "sourceMap": true
                            }
                        } : {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                "sourceMap": true
                            }
                        }),
                        {
                            loader: "css-loader",
                            options: {
                                "sourceMap": true
                            }
                        },
                        {
                            loader: "postcss-loader"
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                "sourceMap": true
                            }
                        }
                    ]
                },

                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader' // options set in babelrc
                },

                // Font files
                {
                    test: /fonts[\/\\].*\.(woff2?|svg|eot|ttf)/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[contenthash:8].[ext]',
                            outputPath: "fonts",
                            publicPath: "/fonts"
                        }
                    }
                },

                // Image files
                {
                    test: /\.(jpg|png|gif|jpeg|svg)$/,
                    exclude: [ path.resolve(__dirname, "src/fonts") ],
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[contenthash:8].[ext]',
                            outputPath: "images",
                            publicPath: "/images"
                        }
                    }
                },

                // Handlebars templates
                { 
                    test: /\.hbs$/, 
                    loader: "handlebars-loader" 
                },
            ],  
        },
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: "home",
                    to: path.join(__dirname, "dist/images/home"),
                    context: "images"
                }
            ]),
            new CopyWebpackPlugin([
                {
                    from: "about",
                    to: path.join(__dirname, "dist/images/about"),
                    context: "images"
                }
            ]),
            new CleanWebpackPlugin({
                verbose: true
            }),

            // Pages to emit
            new HtmlWebpackPlugin({
                filename: 'page_template.html',
                template: './html/interior-nav.hbs',
                chunks: 'js/main'
            }),
            new HtmlWebpackPlugin({
                filename: 'home.html',
                template: './html/home.hbs',
                chunks: [
                    'js/main',
                    "js/home"
                ]
            }),
            new HtmlWebpackPlugin({
                filename: 'academics.html',
                template: './html/academics.hbs',
                chunks: [
                    "js/main",
                    "js/academics"
                ]
            }),
            new HtmlWebpackPlugin({
                filename: 'academic-programs/business.html',
                template: './html/academics.hbs',
                chunks: [
                    "js/main",
                    "js/academics"
                ]
            }),
            new HtmlWebpackPlugin({
                filename: 'styleguide.html',
                template: './html/styleguide.hbs',
                chunks: 'js/main'
            }),
            new HtmlWebpackPlugin({
                filename: 'about.html',
                template: './html/about.hbs',
                chunks: 'js/main'
            }),
            new HtmlWebpackPlugin({
                filename: 'center.html',
                template: './html/interior-nav.hbs',
                templateParameters: require('./src/html/contexts/images.json')
            }),


            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css',
                outputPath: "css"
            }),
            new webpack.HotModuleReplacementPlugin()
        ]
   }
    
}