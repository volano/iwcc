const merge = require("webpack-merge");
const path = require("path");

// Plugin Constants
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (args, env) => {
    return {
        mode: "development",
        devtool: "inline-source-map",
        devServer: {
            contentBase: './dist'
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

                // Image files
                {
                    test: /\.(jpg|png|gif|jpeg|svg)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[contenthash:8].[ext]',
                            outputPath: "images"
                        }
                    }
                },

                // Font files
                {
                    test: /\.(woff2?|svg|ttf)/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[contenthash:8].[ext]',
                            outputPath: "fonts"
                        }
                    }
                }
            ],
     
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'page_template.html',
                template: './html/home.html'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css',
                outputPath: "css"
            })
        ]
   }
    
}