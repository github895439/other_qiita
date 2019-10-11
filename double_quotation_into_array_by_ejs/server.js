const express = require('express');
const ejs = require('ejs');

const App = express();

App.engine('ejs', ejs.renderFile);
App.get('/',
    function(req, res)
    {
        res.render('client.ejs',
            {
                ToTemplate: ["ab", "cd", "ef"]
            });
    });
App.listen(8080);
