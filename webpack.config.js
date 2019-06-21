const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack")

// Plugin Constants
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (args, env) => {
    return {
        mode: "development",
        devtool: "inline-source-map",
        devServer: {
            hot:true,
            contentBase: './dist',
            index: "page_template.html"
        },

        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },

        context: path.resolve(__dirname, 'src'),

        entry: {
            "js/main": "./js/main"
        },

        module: {
            rules: [
    
                {
                    test: /\.s?css$/,
                    use: [
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader"
                        },
                        { 
                            loader: "sass-loader"
                        }
                    ]
                },
        
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/preset-env']
                      }
                    }
                },

                // Font files
                {
                    test: /fonts\/.*\.(woff2?|svg|eot|ttf)/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[contenthash:8].[ext]',
                            outputPath: "fonts"
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
                }
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
            new CleanWebpackPlugin({
                verbose: true
            }),
            new HtmlWebpackPlugin({
                filename: 'page_template.html',
                template: './html/home.hbs'
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