const express = require('express');
const ejs = require('ejs');
const fs = require('fs');

const App = express();
const Setting = JSON.parse(fs.readFileSync("./data/setting.json", "utf-8"));

Setting.notificationsOrder = JSON.stringify(Setting.notificationsOrder);

App.engine('ejs', ejs.renderFile);
App.get('/',
    function(req, res)
    {
        res.render('client.ejs',
            {
                ToTemplate: ["ab", "cd", "ef"],
                ToTemplate_string: JSON.stringify(["ab", "cd", "ef"]),
                ToTemplate_from_file: Setting
            });
    });
App.listen(8080);
