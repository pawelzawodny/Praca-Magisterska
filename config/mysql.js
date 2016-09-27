var host     = process.env.MYSQL_HOST   || 'localhost';
var port     = process.env.MYSQL_PORT   || 3306;
var db       = process.env.MYSQL_DB     || 'mwv';
var user     = process.env.MYSQL_USER   || 'root';
var password = process.env.MYSQL_PASS   || "root";

exports['default'] = {
    mysql: {
        "logging": false,
        "database"    : db,
        "dialect"     : "mysql",
        "port"        : port,
        "pool"        : {
            "maxConnections" : 10,
            "maxIdleTime"    : 30000
        },
        "replication" : {
            "write": {
                "host"     : host,
                "username" : user,
                "password" : password,
                "pool"     : {}
            },
            "read": [
                {
                    "host"     : host,
                    "username" : user,
                    "password" : password,
                    "pool"     : {}
                }
            ]
        }
    }
};
