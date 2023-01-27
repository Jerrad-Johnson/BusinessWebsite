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
### Creation

```
CREATE DATABASE Business;
```

### User

```
CREATE USER 'REPLACEME'@'localhost' IDENTIFIED WITH mysql_native_password BY 'REPLACEME';
```

```
GRANT ALL PRIVILEGES ON Business.* TO 'REPLACEME'@'localhost'; 
```

### Tables

```
USE Business; 
```

```
create table admin_account
(
    username char(5)      null,
    password varchar(120) null
);

create table gallery_geo_data
(
    id        int auto_increment
        primary key,
    folder    varchar(255) null,
    file_name varchar(255) null,
    lat_lon   point        not null,
    altitude  mediumint    not null,
    constraint id
        unique (id)
);

create spatial index lat_lon
    on gallery_geo_data (lat_lon);

create table gallery_lg_images
(
    id             int auto_increment
        primary key,
    url            varchar(510) null,
    base64url      varchar(510) null,
    folder         varchar(255) not null,
    file_name      varchar(255) not null,
    file_name_full varchar(255) not null,
    alt_text       varchar(510) not null,
    camera_model   varchar(255) null,
    lens_model     varchar(255) null,
    focal_length   varchar(255) null,
    exposure_time  varchar(255) null,
    iso            smallint     null,
    photo_capture  datetime     null,
    height         varchar(255) null,
    width          varchar(255) null,
    constraint id
        unique (id)
);

create table gallery_sm_images
(
    id             int auto_increment
        primary key,
    url            varchar(510) null,
    base64url      varchar(510) null,
    folder         varchar(255) not null,
    file_name      varchar(255) not null,
    file_name_full varchar(255) not null,
    alt_text       varchar(510) not null,
    camera_model   varchar(255) null,
    lens_model     varchar(255) null,
    focal_length   varchar(255) null,
    exposure_time  varchar(255) null,
    iso            smallint     null,
    photo_capture  datetime     null,
    height         varchar(255) null,
    width          varchar(255) null,
    constraint id
        unique (id)
);

create table gallery_tiny_images
(
    id             int auto_increment
        primary key,
    url            varchar(510) null,
    base64url      varchar(510) null,
    folder         varchar(255) not null,
    file_name      varchar(255) not null,
    file_name_full varchar(255) not null,
    alt_text       varchar(510) not null,
    camera_model   varchar(255) null,
    lens_model     varchar(255) null,
    focal_length   varchar(255) null,
    exposure_time  varchar(255) null,
    iso            smallint     null,
    photo_capture  datetime     null,
    height         varchar(255) null,
    width          varchar(255) null,
    constraint id
        unique (id)
);
```

### Entry
```
INSERT INTO admin_account (username, password) values ('admin', 'REPLACEME');   
```

### Adding photos

In the backend/photographs directory, add folders containing images. Example:

```
photographs/Studio Portraits/img_2241-Rockabilly-.jpg
photographs/Studio Portraits/img_2242-High School Senior-.jpg
photographs/Macro/img_3000-Butterfly-.jpg
```


### Filename Format

Filename is split via `-` 

`[1]` is used as alt text. `[0]` and `[2]` are rejoined as the file name--thus reconstituting the original file name.

Example: `IMG_1022-Butterfly at Reiman Gardens-.jpg` becomes `IMG_1022.jpg` and `Butterfly at Reiman Gardens`--for the filename and alt text, respectively. 

## Known Issues

When running `npm i`, an error will occur related to `sharp`. Solution is to then run `npm install --ignore-scripts=false --foreground-scripts --verbose sharp`

When running `npm i` in an ubuntu distro, an error related to node-linux-x64 may occur. Run `npm i cjs` to resolve the issue.