# Backend
## Pool

```
const mysql = require("mysql");

var pool = mysql.createPool({
    connectionLimit : 10,
    host: '',
    port: ,
    user: '',
    password: '',
    database: '',
});

exports.pool = pool;

```

## Session

Create file `session_secret.js` in the `common` folder, and add:
```
exports.sessionSecret = "YOUR-STRING-HERE";
```

## Database
### Administration

```
CREATE DATABASE Business;
```

```
CREATE USER 'REPLACEME'@'localhost' IDENTIFIED WITH mysql_native_password BY 'REPLACEME';
```

```
GRANT ALL PRIVILEGES ON Business.* TO 'REPLACEME'@'localhost'; 
```

```
USE Business; 
```

```
CREATE TABLE admin_account (username CHAR(5), password VARCHAR(30));
```

```
INSERT INTO admin_account (username, password) values ('admin', 'REPLACEME');   
```

