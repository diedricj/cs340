module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getUsers(res, mysql, context, complete){
            mysql.pool.query("SELECT discord.discord_name, trainer.trainer_name, team.team_name FROM trainer JOIN discord on discord.id = trainer.discord_id JOIN team on trainer.team_id = team.id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users = results;
            complete();
        });
    }

    function getTeams(res, mysql, context, complete){
        mysql.pool.query("SELECT team.team_name FROM team", function(error, results, fields){
             if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.team = results;
            complete();
        });
    }

     function getDiscord(res, mysql, context, complete){
        mysql.pool.query("SELECT discord.discord_name FROM discord", function(error, results, fields){
             if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.discord = results;
            complete();
        });
    }

    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        console.log("trying here");
        var context = {};
        var mysql = req.app.get('mysql');
        getUsers(res, mysql, context, complete);
        getTeams(res, mysql, context, complete);
        getDiscord(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
              console.log("Rendering");
                res.render('users', context);
            }
        }
    });

    router.post('/', function(req, res){
        console.log("im in ur post")
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO trainer (trainer_name, discord_id, team_id) VALUES ('" + req.body.Trainer + "', (SELECT discord.id FROM discord WHERE discord.discord_name = '" + req.body.Discord + "'), (SELECT team.id FROM team WHERE team.team_name = '" + req.body.Team + "') );";
         console.log(sql);
        var inserts = [req.body.trainer_name, req.body.pokemon_name, req.body.shiny, req.body.regional];
        sql = mysql.pool.query(sql, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/pokedex');
            }
        });
    });

    return router;
}();