module.exports = {
    apps: [
        {
            name: "HealthGallery",
            script: "./bin/www",
            watch: true,
            watch_options: {
                followSymlinks: false
            },
            env: {
                NODE_ENV: 'development',
                DATABASE: 'HealthGallery',
                USERNAME: 'root',
                PASSWORD: '1234',
                SECRET_KEY: 'secret_key'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};