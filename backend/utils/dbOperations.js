const db = require('../config/db'); // Your database connection

const getById = async (tableName, id) => {
    const table = db[tableName];
    if (!table) {
        throw new Error(`Table ${tableName} does not exist`);
    }
    return table.find((item) => item.id === id);
};

const getByName = async (tableName, name) => {
    const table = db[tableName];
    if (!table) {
        throw new Error(`Table ${tableName} does not exist`);
    }
    return table.find((item) => item.name === name);
};

const insertRecord = async (tableName, record) => {
    const table = db[tableName];
    if (!table) {
        throw new Error(`Table ${tableName} does not exist`);
    }
    table.push(record);
    return record;
};

module.exports = {
    getById,
    getByName,
    insertRecord
};