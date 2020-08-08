const express = require('express');
const md = require('markdown-it')({typographer: true});
const fs = require('fs');
const app = express();
const port = 3000;
const env = {};

md.use(require("markdown-it-anchor"));
md.use(require("markdown-it-table-of-contents"), { "includeLevel": [2, 3], "listType": "ol" });
md.use(require('markdown-it-title'));

app.set('view engine', 'pug');
app.use('/static', express.static('static'));
app.use('/favicon.svg', express.static('favicon.svg'));

app.use('/', require('./routes/main'));
app.use('/dep', require('./routes/dep'));
app.use('/encrypt', require('./routes/encrypt'));
app.use('/verify', require('./routes/verify'));
app.use('/proofs', require('./routes/proofs'));
app.use('/util', require('./routes/util'));
app.use('/', require('./routes/profile'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
