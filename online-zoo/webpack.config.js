// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
	entry: {
		main: ['./src/pages/main/index.ts', './src/pages/main/style.scss'],
		donate: ['./src/pages/donate/index.ts', './src/pages/donate/style.scss'],
	},
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'dist', 'pages'),
		filename: '[name]/[name].js',
		assetModuleFilename: './assets/[name][ext]',
	},
	devServer: {
		open: true,
		host: 'localhost',
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'main/index.html',
			template: 'src/pages/index.html',
			chunks: ['main'],
		}),

		new HtmlWebpackPlugin({
			filename: 'donate/index.html',
			template: 'src/pages/index.html',
			chunks: ['donate'],
		}),

		new CopyPlugin({
			patterns: [
				{from: 'src/assets/images', to: 'dest/assets/images'},
				//   { from: "other", to: "public" },
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
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
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

		config.plugins.push(new MiniCssExtractPlugin({
			filename: '[name]/[name].css',
		}));
	} else {
		config.mode = 'development';
	}

	return config;
};
