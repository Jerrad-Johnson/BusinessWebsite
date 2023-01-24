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

## Gallery Images (includes Leaflet).

### Table

```
CREATE TABLE gallery_lg_images ( id INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT, url VARCHAR(510), folder VARCHAR(255) NOT NULL, file_name VARCHAR(255) NOT NULL, file_name_full VARCHAR(255) NOT NULL, alt_text VARCHAR(510) NOT NULL, camera_model VARCHAR(255), lens_model VARCHAR(255), focal_length VARCHAR(255), exposure_time VARCHAR(255), iso SMALLINT, photo_capture DATETIME, height VARCHAR(255), width VARCHAR(255), lat_lon POINT NOT NULL, altitude MEDIUMINT NOT NULL, SPATIAL INDEX (lat_lon) );

CREATE TABLE gallery_sm_images ( id INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT, url VARCHAR(510), folder VARCHAR(255) NOT NULL, file_name VARCHAR(255) NOT NULL, file_name_full VARCHAR(255) NOT NULL, alt_text VARCHAR(510) NOT NULL, camera_model VARCHAR(255), lens_model VARCHAR(255), focal_length VARCHAR(255), exposure_time VARCHAR(255), iso SMALLINT, photo_capture DATETIME, height VARCHAR(255), width VARCHAR(255), lat_lon POINT NOT NULL, altitude MEDIUMINT NOT NULL, SPATIAL INDEX (lat_lon) );

CREATE TABLE gallery_tiny_images ( id INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT, url VARCHAR(510), folder VARCHAR(255) NOT NULL, file_name VARCHAR(255) NOT NULL, file_name_full VARCHAR(255) NOT NULL, alt_text VARCHAR(510) NOT NULL, camera_model VARCHAR(255), lens_model VARCHAR(255), focal_length VARCHAR(255), exposure_time VARCHAR(255), iso SMALLINT, photo_capture DATETIME, height VARCHAR(255), width VARCHAR(255), lat_lon POINT NOT NULL, altitude MEDIUMINT NOT NULL, SPATIAL INDEX (lat_lon) );
```

### Location

Create folders in the `public` folder and store images in those folders. Note: sub-folders are not supported.

### Filename Format

Filename is split via `-` 

`[1]` is used as alt text. `[0]` and `[2]` are rejoined as the file name--thus reconstituting the original file name.

Example: `IMG_1022-Butterfly at Reiman Gardens-.jpg` becomes `IMG_1022.jpg` and `Butterfly at Reiman Gardens`--for the filename and alt text, respectively. 
