const path = require('path');

module.exports = function override(config, env) {
    config["resolve"] = {
        alias: {
            components: path.resolve(
                __dirname,
                'src/components/'),

            routes: path.resolve(
                __dirname,
                'src/routes'),

            utils: path.resolve(
                __dirname,
                'src/utils/'),

            views: path.resolve(
                __dirname,
                'src/views/'),
        },
        extensions: ['.js']
    }
    return config;
}

