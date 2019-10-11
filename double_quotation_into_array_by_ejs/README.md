本内容を利用した場合の一切の責任を私は負いません。

# バージョン
- OS  
OS 名:                  Microsoft Windows 10 Home  
OS バージョン:          10.0.18362 N/A ビルド 18362   
システムの種類:         x64-based PC  
- Chrome  
バージョン: 77.0.3865.90（Official Build） （64 ビット）
- node.js  
node-v10.16.0-win-x64  
ejs@2.6.2  
express@4.17.1  

# 本題
ejsが古いためかもしれないが、文字列の配列(?)をテンプレートに渡すと、文字列の「"」(ダブルクォーテーション)括りが削られてエラーになってしまう。
その回避方法。

```Javascript:server.js
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
```

```Javascript:views/client.ejs
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>double quotation into array by ejs</title>
<script id="script_1">
var no_good_1 = <%= ToTemplate %>;
var no_good_2 = [<%= ToTemplate %>];
<%
var no_good_3 = [];
var good = [];

for (var i = 0; i < ToTemplate.length; i++)
{
    no_good_3.push(ToTemplate[i].toString());
    good.push("\"" + ToTemplate[i].toString() + "\"");
}
%>
var no_good_3 = [<%- no_good_3 %>];
var good = [<%- good %>];
</script>
</head>
<body>
「&lt;script id="script_1"&gt;」タグ内<br>
<br>
<script>
var content = document.getElementById("script_1");
document.write(content.text);
</script>
</body>
</html>
```

上記の結果。

```HTML:out.htm
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>double quotation into array by ejs</title>
<script id="script_1">
var no_good_1 = ab,cd,ef;
var no_good_2 = [ab,cd,ef];

var no_good_3 = [ab,cd,ef];
var good = ["ab","cd","ef"];
</script>
</head>
<body>
「&lt;script id="script_1"&gt;」タグ内<br>
<br>
<script>
var content = document.getElementById("script_1");
document.write(content.text);
</script>
</body>
</html>
```

```TEXT:display.txt
「<script id="script_1">」タグ内

var no_good_1 = ab,cd,ef; var no_good_2 = [ab,cd,ef]; var no_good_3 = [ab,cd,ef]; var good = ["ab","cd","ef"];
```

上記は下記のgithubに。
https://github.com/github895439/other_qiita/double_quotation_into_array_by_ejs
