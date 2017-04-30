const path = require('path');
// const chalk = require('chalk');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin =require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const output_path = path.join(__dirname, 'dist');
const node_dir=path.join(__dirname,'/node_modules');
const plugins_dir = path.join(__dirname,'/src/plugins');
const core_dir = path.join(__dirname, 'src/core');


const DEV = process.env.NODE_ENV !== 'production';
//const dist = process.env.NODE_TITLE || 'dist';
const title=process.env.NODE_TITLE || 'yeeshock';
const address=process.env.NODE_ADDRESS || 'yeeshock.com:5678';
const port = process.env.NODE_PORT || 5000;
const constValue= process.env.NODE_TITLE || '';
const map =process.env.NODE_MAP==undefined?(process.env.NODE_ENV !=='production'):(process.env.NODE_MAP=='true')

// multiple extract instances
const extractCSS = new ExtractTextPlugin('[name].css');
const extractLESS = new ExtractTextPlugin('[name].less');

const config={

    devtool:'source-map',
    performance: { hints: false},
    resolve: {
        alias: {
            style:path.join(plugins_dir,'css/style.css'),
            ioscss:path.join(plugins_dir,'css/iosSelect.css'),
            fontstyle:path.join(plugins_dir,'css/fontstyle.css'),
            pager:path.join(plugins_dir,'css/pager.css'),
            index:path.join(plugins_dir,'css/index.less'),
            slick:path.join(node_dir,'slick-carousel/slick/slick.css'),
            'slick-theme':path.join(node_dir,'slick-carousel/slick/slick-theme.css'),
            _:path.join(node_dir,'lodash/core'),
            Q:path.join(node_dir,'q'),
            jquery:path.join(node_dir,'jquery'),
            inputmask:path.join(node_dir,'jquery.inputmask/dist/jquery.inputmask.bundle.js'),
        },
        extensions: ['.js', '.jsx','.json']
    },

    entry: {
        main: [
            'ioscss',
            'style',
            'fontstyle',
            'pager',
            'index',
            'slick',
            'slick-theme',
            'inputmask',
            './src/app.js'
        ]
    },

    // output: {
    //     path: path.join(__dirname, dist),
    //     filename: '[name].bundle.js',
    //     //publicPath: '/dist'
    // },

    module: {
        loaders: [
            {
                test: /\.js(x)?$/,
                loaders: ['babel-loader?compact=false'],
                exclude: /node_modules/,
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
                loader: "url-loader?limit=10000&name=fonts/[name].[ext]",
            },

        ],

        //noParse: [/moment-with-locales/]
    },

    plugins: [
        new webpack.ProvidePlugin({
            '$': "jquery",
            'jQuery':'jquery',
            'Q':'Q',
            '_':'_',
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            inject:true,
            title:title,
            address:address
        }),

        // new CopyWebpackPlugin([
        //         {from: 'src/plugins/img/userdefault.png', to:'img/userdefault.png'},
        //
        //     ]
        // ),

        new webpack.ProgressPlugin(function handler(percentage, msg) {
            var p = Math.floor(percentage * 100);
            if (config.percent !== p) {
                config.percent = p;
                console.log(msg, config.percent + '%');
            }
        }),




        //new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'}),

        //extractCSS,

    ],
}



if (!map){
    config.devtool='',
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false,
                },
            })
        )
}

if (DEV){


    config.entry.main.unshift('react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:'+port,
        'webpack/hot/only-dev-server');

    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    ),

        config.devServer={
            host:'0.0.0.0',
            port:port,
            //contextBase:dist,
            hot: true,
            historyApiFallback: true,
        }
    config.module.loaders.push(
        {
            test: /\.(less)$/,
            loaders: ['style-loader', 'css-loader','less-loader']
        }
    );
    config.module.loaders.push(
        {
            test: /\.(css)$/,
            loaders: ['style-loader', 'css-loader']
        }
    );
}

else {
    //config.devtool='source-map';
    const nowString=new Date().toLocaleString().replace(/\s|:|\//g,'-');
    var dist = 'yeeApp_'+nowString+ (constValue?('_'+constValue):'_yeeshock');
    config.output={
        path: path.join(__dirname, dist),
        filename: '[name].bundle.js',
        //publicPath: '/dist'
    };
    // config.plugins.push(
    //     new webpack.optimize.UglifyJsPlugin({
    //         compressor: {
    //             warnings: false,
    //         },
    //     })
    // );
    config.plugins.push(
        new webpack.LoaderOptionsPlugin({
            test: /\.(css)$/,
            minimize:true
        })
    );

    config.module.loaders.push(
        {
            test: /\.less$/,
            loader: extractCSS.extract(['css-loader','less-loader'])
        }
    );

    config.module.loaders.push(
        {
            test: /\.(css)$/,
            loader: extractCSS.extract(['css-loader']),
        }
    );

    config.plugins.push(
        extractCSS,
        extractLESS
    )

    config.plugins.push(
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    )
}

module.exports = config;





