const router = require('express').Router();
const md = require('markdown-it')({typographer: true});
const fs = require('fs');
const env = {};

md.use(require("markdown-it-anchor"));
md.use(require("markdown-it-table-of-contents"), { "includeLevel": [2, 3], "listType": "ol" });
md.use(require('markdown-it-title'));

router.get('/', (req, res) => {
    res.render('index')
});

router.get('/faq', (req, res) => {
    res.render('faq');
});

router.get('/guides', (req, res) => {
    res.render('guides');
});

router.get('/guides/:guideId', (req, res) => {
  let data = fs.readFileSync(`./guides/${req.params.guideId}.md`, "utf8", (err, data) => {
    if (err) throw err;
    return data;
  });

  let content = md.render(data, env);
  res.render(`guide`, { title: `${env.title} - Keyoxide`, content: content })
});

module.exports = router;
