import express from 'express';
import Pool from 'pg-pool';
import config from './config.js';

const dataBase = config;

const pool = new Pool(dataBase);

pool.on('error', (err, client) => {
    console.error('idle client error', err.message, err.stack)
})

const query = (text, values, callback) => {
    console.log('query:', text, values);
    return pool.query(text, values, callback);
};

const connect = (callback) => {
    return pool.connect(callback);
};

export default connect;