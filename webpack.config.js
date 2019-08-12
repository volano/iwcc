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
        "mode": mode,
        "devtool": "inline-source-map",
        "devServer": {
            "hot":true,
            "contentBase": './dist',
            "index": "home.html"
        },

        "resolve": {
            "modules": [
                'node_modules',
                path.resolve(__dirname, 'src/js/modules'),
                path.resolve(__dirname, "src/js/components")
            ],
            "alias": {
                "scss": path.resolve(__dirname, 'src/scss'),
                "fonts": path.resolve(__dirname, 'src/fonts'),
            }
        },

        "output": {
            "filename": 'js/[name].bundle.js',
            "path": path.resolve(__dirname, 'dist')
        },

        "context": path.resolve(__dirname, 'src'),

        "entry": {
            "main": "./js/main",
            "home": "./js/home",
            "academics": "./js/academics",
            "about": "./scss/pages/about.scss",
        },

        "module": {
            "rules": [
                {
                    "test": /\.s?css$/,
                    "use": [

                        (mode === "development" ? { 
                            "loader": "style-loader",
                            "options": {
                                "sourceMap": true,
                            }
                        } : {
                            "loader": MiniCssExtractPlugin.loader,
                            "options": {
                                "sourceMap": true,
                                "outputPath": "css"
                            }
                        }),
                        {
                            "loader": "css-loader",
                            "options": {
                                "sourceMap": true
                            }
                        },
                        {
                            "loader": "postcss-loader"
                        },
                        {
                            "loader": "sass-loader",
                            "options": {
                                "sourceMap": true
                            }
                        }
                    ]
                },

                {
                    "test": /\.m?js$/,
                    "exclude": /(node_modules|bower_components)/,
                    "loader": 'babel-loader' // options set in babelrc
                },

                // Font files
                {
                    "test": /fonts[\/\\].*\.(woff2?|svg|eot|ttf)/,
                    "use": {
                        "loader": 'file-loader',
                        "options": {
                            "name": '[contenthash:8].[ext]',
                            "outputPath": "fonts",
                            "publicPath": "/fonts"
                        }
                    }
                },

                // Image files
                {
                    "test": /\.(jpg|png|gif|jpeg|svg)$/,
                    "exclude": [ path.resolve(__dirname, "src/fonts") ],
                    "use": {
                        "loader": 'file-loader',
                        "options": {
                            "name": '[contenthash:8].[ext]',
                            "outputPath": "images",
                            "publicPath": "/images"
                        }
                    }
                },

                // Handlebars templates
                {
                    "test": /\.hbs$/,
                    "loader": "handlebars-loader",
                    "options": {
                        "helperDirs": [
                            path.resolve(__dirname, "src/html/helpers")
                        ],
                        "partialDirs":[
                            path.resolve(__dirname, "src/html/partials"),
                            path.resolve(__dirname, "src/html/components")
                        ],
                        "precompileOptions": {
                            "knownHelpersOnly": false,
                        }
                    }
                },
            ],
        },
        "plugins": [
            new CopyWebpackPlugin([
                {
                    "from": "home",
                    "to": path.join(__dirname, "dist/images/home"),
                    "context": "images"
                }
            ]),
            new CopyWebpackPlugin([
                {
                    "from": "about",
                    "to": path.join(__dirname, "dist/images/about"),
                    "context": "images"
                }
            ]),
            new CleanWebpackPlugin({
                "verbose": true
            }),

            // Pages to emit
            new HtmlWebpackPlugin({
                "filename": 'page_template.html',
                "template": './html/interior-nav.hbs',
                "chunks": ['main']
            }),
            new HtmlWebpackPlugin({
                "filename": 'home.html',
                "template": './html/home.hbs',
                "chunks": [
                    'main',
                    "home"
                ]
            }),
            new HtmlWebpackPlugin({
                "filename": 'academics.html',
                "template": './html/academics.hbs',
                "templateParameters": require('./src/html/contexts/programs.all.json'),
                "chunks": [
                    "main",
                    "academics"
                ]
            }),
            new HtmlWebpackPlugin({
                "filename": 'academic-programs/business.html',
                "template": './html/academics.hbs',
                "templateParameters": require('./src/html/contexts/programs.business.json'),
                "chunks": [
                    "main",
                    "academics"
                ]
            }),
            new HtmlWebpackPlugin({
                "filename": 'academic-programs/industrial-technology-transportation.html',
                "template": './html/academics.hbs',
                "templateParameters": require('./src/html/contexts/programs.industrial.json'),
                "chunks": [
                    "main",
                    "academics"
                ]
            }),
            new HtmlWebpackPlugin({
                "filename": 'styleguide.html',
                "template": './html/styleguide.hbs',
                "chunks": 'main'
            }),
            new HtmlWebpackPlugin({
                "filename": 'about.html',
                "template": './html/about.hbs',
                "chunks": [
                    'main',
                    'about'
                ]
            }),
            new HtmlWebpackPlugin({
                "filename": 'center.html',
                "template": './html/interior-nav.hbs',
                "templateParameters": require('./src/html/contexts/images.json')
            }),


            new MiniCssExtractPlugin({
                "filename": 'css/[name].css',
                "chunkFilename": 'css/[id].css'
            }),

            new webpack.HotModuleReplacementPlugin()
        ]
   }

}