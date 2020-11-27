module.exports = function(app)
{
     
     app.get('/',function(req,res){
        res.render('signup.html');
	});
 app.get('/weight',function(req,res){
        res.render('weight.html');
    });
}