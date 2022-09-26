// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler =  MiniCssExtractPlugin.loader;

const config = {
	entry: {
		main: ['./src/pages/main/index.ts', './src/pages/main/style.scss'],
		donate: ['./src/pages/donate/index.ts', './src/pages/donate/style.scss'],
	},
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'pages/[name]/[name].js',
		assetModuleFilename: './assets/[name][ext]',
	},
	devServer: {
		open: true,
		host: 'localhost',
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'pages/main/index.html',
			template: 'src/pages/main/index.html',
			chunks: ['main'],
		}),

		new HtmlWebpackPlugin({
			filename: 'pages/donate/index.html',
			template: 'src/pages/donate/index.html',
			chunks: ['donate'],
		}),
		new MiniCssExtractPlugin({
			filename: 'pages/[name]/[name].css',
		}),

		new CopyPlugin({
			patterns: [
				{from: 'src/assets/svg', to: 'assets/icons'},
			],
		}),

		new CleanWebpackPlugin(),

		// Add your plugins here
		// Learn more about plugins from https://webpack.js.org/configuration/plugins/
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: 'ts-loader',
				exclude: ['/node_modules/'],
			},
			{
				test: /\.css$/i,
				use: [stylesHandler, 'css-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [stylesHandler, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(svg|png|jpg|gif)$/i,
				type: 'asset',
				generator: {
					filename: 'assets/img/[name][ext]'
			}
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/i,
				type: 'asset',
				generator: {
					filename: 'assets/font/[name][ext]'
			}
			},

			// Add your rules for custom modules here
			// Learn more about loaders from https://webpack.js.org/loaders/
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
	},
};

module.exports = () => {
	if (isProduction) {
		config.mode = 'production';

	} else {
		config.mode = 'development';
	}

	return config;
};
