const express = require('express');
const path = require('path');

const app = express();

// ejs 相关
app.engine('.html', require('ejs').__express);

app.set('view engine', 'html');

// 静态文件
app.set('views', './');
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/zheyearhey', (req, res, next) => {
  res.render('dev.html');
});

app.listen(2234);
console.log(`listening port 2234`);

module.exports = app;
