/**
 * Environment configuration for the application
 */
const env = {
  port: process.env.PORT || 3009,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiBaseUrl: 'https://pokeapi.co/api/v2',
};

module.exports = env;
