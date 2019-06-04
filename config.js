/* eslint-disable prefer-destructuring */
const { get, set } = require('lodash');

const yamlConfig = require('node-yaml-config');
const resolve = require('path').resolve;
const argv = require('yargs').argv;

// This is for the local environment only.
// chooses environment based on flag or else
// default to the 'development' environment in env.yml

const envKey = argv.stage || 'default';

const envPath = resolve(__dirname, 'env.yml');

const config = yamlConfig.load(envPath, envKey);

// assign each environment variable to process.env[variable] = [value]
Object.keys(config).forEach(key => {
  const value = get(config, key);
  set(process.env, key, value);
});
