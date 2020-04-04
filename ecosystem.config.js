module.exports = {
  apps : [{
    name: 'API',
    script: 'node_modules/@angular/cli/bin/ng',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: 'serve',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
  }
};
