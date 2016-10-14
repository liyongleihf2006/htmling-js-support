/**
 * Created by LiYonglei on 2016/10/12.
 */
var fs=require("fs");
var HTMLing=require("htmling");
var express=require("express");
var app=express();
/*
* 就是这一部分
* */
app.engine('html', function (filePath, options, callback) {
    fs.readFile(filePath, function (err, content) {
        if (err) return callback(new Error(err));
        var template = HTMLing.string(content.toString());
        var rendered=template.render(options).replace(/\{\{(.*?)\}\}/g,function(str, p1, offset, s){
            return JSON.stringify(options[p1]);
        });
        return callback(null, rendered);
    })
});
app.set('views', './views');
app.set('view engine', 'html');

app.use("/",function(req,res,next){
    res.render("index",{author:"liyonglei",users:[{
        name:"first"
    },{
        name:"second"
    },{
        name:"third"
    }]});
})
var server=app.listen(3000,"127.0.0.1",function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log(host,port);
});