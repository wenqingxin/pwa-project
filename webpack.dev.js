const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path');

module.exports = {
	watch: true,

	mode: 'development',

	devtool:'#eval-source-map',//设置source map选项

	entry: {
		index: './client/index.jsx'
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: [path.resolve(__dirname, 'client')],
				loader: 'babel-loader',
			},
			{
				test: /\.(less|css)$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{
						loader: 'css-loader',

						options: {
							sourceMap: true
						}
					},
					{
						loader: 'less-loader',

						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin(['dist']),

		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),

		new HtmlWebpackPlugin({
			template: './public/template.html'
		}),

		new CopyWebpackPlugin([
			{
				from: '**',
				ignore: [ 'template.html' ],
				context: 'public/'
			}
		])
	],
};
