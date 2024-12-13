import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Convert file URL to path for compatibility with Node.js path functions
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  resolve: {
    fallback: {
      tty: false,
      path: false,
    },
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    proxy: [
      {
        context: ['/users'], // Array of contexts to proxy
        target: 'http://localhost:5000', // Your backend server
        changeOrigin: true, // Necessary for proxying APIs
        timeout: 5000, // Optional: Timeout for requests
      },
    ],
  },
};
