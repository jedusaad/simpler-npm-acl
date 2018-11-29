/**
 * @description SIMPLER-ACL, THIS PACKAGE IS PART OF A BUNDLE OF SIMPLER PACKAGES MADE TO MAKE THE LIFE OF A DEVELOPER EASYER.
 * THIS ESPECIFIC PACKAGE IMPLEMENTS THE ACL MODULE WITH THE CONTROL OF USERS, GROUPS, AUTHORIZATION, RESOURCES AND ACTIONS
 * @author João Eduardo Saad
 * @since 29/11/2018
 */


const sMysql = require('simpler-mysql');
const logger = require('./assets/logger.js');
const sql = require('./assets/sqlQueries.json');

let databaseType = null;
let mysql = {};


module.exports.selectDatabase = async (type) => {
    switch (type) {
        case 'mysql':
            logger.success('MYSQL DATABASE SELECTED');
            databaseType = type;
            break;
        
        case 'mongodb':
            logger.success('MONGODB DATABASE SELECTED');
            databaseType = type;
            break;
        default:
            logger.warning('THE PASSED TYPE IS NOT ALLOWED OR NOT RECOGNIZED');
            break;
    }
}

module.exports.configureMysql = async (host, user, password, database) => {
    if (checkDatabaseNull()) return "err";

    if (databaseType == 'mysql') {
        mysql.config = {
            host: host,
            user: user,
            password: password,
            database: database
        };
        logger.success('MYSQL CONFIGURED');
        await sMysql.config(host, user, password, database);
        
        logger.info('EXECUTIGN SQL STATUP SCRIPTS');

        // await sMysql.connect();

        await sMysql.query(sql.USERS);
        await sMysql.query(sql.RESOURCES);
        await sMysql.query(sql.GROUPS);
        await sMysql.query(sql.ACTIONS);

        // await sMysql.close();

    } else {
        logger.warning(`TRYING TO CONFIGURE MYSQL BUT DATABASE SELECTED IS: ${databaseType}`);
    }
}

function checkDatabaseNull() {
    if (databaseType == null) {
        logger.warning('CANNOT EXECUTE FUNCTION IF DATABASE TYPE IS NOT SELECTED');
        return 1;
    } else {
        return 0;
    }
}