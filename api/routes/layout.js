const express = require('express');
const router = express.Router();
const makePic = require('../snapshots');
const Layouter = require('../Layouter');
const layouter = new Layouter().getInstance();


router.get('/', function(req, res, next) {
    //todo get layout
    const fileBase = req.query.fileName;
    console.log("fileName: " + fileBase)
    layouter.setBaseName(fileBase);
    res.send(JSON.stringify(layouter.currentLayout()));
});

module.exports = router;
