# Replace new assets to dist file

```bash
  npm i --save-dev gulp-assets-replace
```

```bash
  yarn add --dev gulp-assets-replace
```

***webpack.config.js***
```js
const path = require('path')
const gulp = require('gulp')
const = require('gulp-rename'),
const assetsReplace = require('./gulp-assets-replace')

gulp.task('app', function() {
  gulp.src([
      "./src/js/app.js",
    ])
    .pipe(rename({suffix: ('.'+Date.now())}))
    .pipe(assetsReplace([
      path.resolve(__dirname, '../../../remix-server/templates/pc/index.html')
    ]))
    .pipe(gulp.dest('./js/'));
});
```
before this plugin work,you file may like:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <script src="{path}/static/main.125631635361.js"></script>
</body>
</html>
```
if new assets is:
- app.2894204284928.js

when plugin works done,file will look like:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <script src="{path}/static/main.2894204284928.js"></script>
</body>
</html>
```

### Params
|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**[``](#)**|`{Array}`|``|an array contains absolute file|
