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
                USERNAME: 'username',
                PASSWORD: 'password'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};