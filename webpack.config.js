var path = require('path');
module.exports = {
    entry: ['./src/main/index.ts'],
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    externals: {
        'react': 'commonjs react'
    }
};
