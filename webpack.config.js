const path = require('path');

module.exports = {
  mode: 'development', // or 'production' or 'none'
  entry: './server.ts', // Entry point of your application
  output: {
    filename: 'bundle.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Apply the rule to TypeScript files
        use: 'ts-loader', // Use ts-loader to compile TypeScript
        exclude: /node_modules/, // Exclude node_modules directory
      },
    ],
  },
};
