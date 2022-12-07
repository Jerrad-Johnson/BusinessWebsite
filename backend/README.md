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
CREATE TABLE admin_account (username CHAR(5), password VARCHAR(120));
```

```
INSERT INTO admin_account (username, password) values ('admin', 'REPLACEME');   
```

## Images for Leaflet

### Filename Format

Filename is split via `-` 

`[1]` is used as alt text. `[0]` and `[2]` are rejoined as the file name--thus reconstituting the original file name.

Example: `IMG_1022-Butterfly at Reiman Gardens-.jpg` becomes `IMG_1022.jpg` and `Butterfly at Reiman Gardens`--for the filename and alt text, respectively. 

