import { resolve } from 'path';

// eslint-disable-next-line no-undef
module.export = {
    entry: {
        main: './src/index.js'
    },
    output: {
        // eslint-disable-next-line no-undef
        path: resolve(__dirname, './dist'),
        filename: '[name].js',
        publicPath: '/dist'
    }
};
