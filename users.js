module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getUsers(res, mysql, context, complete){
            mysql.pool.query("SELECT discord.discord_name, trainer.trainer_name, team.team_name, trainer.id FROM trainer JOIN discord on discord.id = trainer.discord_id JOIN team on trainer.team_id = team.id", function(error, results, fields){
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

    function getUser(res, mysql, context, id, complete){
        //mysql.pool.query("SELECT bsg_people.character_id as id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_people INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id", function(error, results, fields){
        mysql.pool.query("SELECT trainer.trainer_name, team.team_name from trainer join team on team.id = trainer.team_id where trainer.id =" + id, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.user = results[0];
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

    router.get('/:id', function(req, res){
        console.log(req.params);
        console.log("IM IN THE UPDATE");
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedplanet.js", "updateoffer.js", "selectoptions.js", "updatepokedex.js"];
        var mysql = req.app.get('mysql');
        getUser(res, mysql, context, req.params.id, complete);
        getTeams(res, mysql, context, complete);
        //getPlanets(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-users', context);
            }

        }
    });

    router.post('/', function(req, res){
        if (req.body['add']){
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
        }else if (req.body['search']){
            console.log("User Search");
            var callbackCount = 0;
            var context = {};
            context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js", "deleteoffer.js"];
            var mysql = req.app.get('mysql');
            var sql = "SELECT discord.discord_name, trainer.trainer_name, team.team_name FROM trainer JOIN discord on discord.id = trainer.discord_id JOIN team on trainer.team_id = team.id WHERE " +
            req.body.searchType + " = '" + req.body.searchInput + "' ORDER BY discord.discord_name;";
            sql = mysql.pool.query(sql, function(error, results, fields){
                if(error){
                res.write(JSON.stringify(error));
                res.end();
<<<<<<< HEAD
=======
            }else{
                res.redirect('/users');
>>>>>>> edaa1d425d247521d6dadd8adc93d03498b77056
            }
            context.users = results;
            })
            console.log(context);
            getTeams(res, mysql, context, complete);
            getDiscord(res, mysql, context, complete);
            function complete(){
                callbackCount++;
                if(callbackCount >= 2){
                    res.render('users', context);
                }

            }
            }
    });
    return router;
}();
