
module.exports ={
	entry: "./typescript/boot",
	output:{
		path: __dirname,
		filename: "./js/bundle.js",
	},
	resolve:{
		extensions: ['', '.js', '.ts']
	},
	module:{
		loaders: [{
			test:/\.ts/, 
			loaders: ['ts-loader'], 
			exclude: /node_modules/
		}]
	},
	devtool:"source-map"

}