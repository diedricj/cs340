module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getAccepts(res, mysql, context, complete){
        //mysql.pool.query("SELECT bsg_people.character_id as id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_people INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id", function(error, results, fields){
        mysql.pool.query("SELECT pokedex.pokemon_name, discord.discord_name, trainer.trainer_name, pokedex.shiny, pokedex.regional FROM pokedex JOIN accepting on accepting.pokemon_id = pokedex.id LEFT JOIN trainer on trainer.id = accepting.trainer_id LEFT JOIN discord on discord.id = trainer.discord_id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.accepts = results;
            complete();
        });
    }

    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        console.log("trying here");
        var context = {};
        context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getAccepts(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
              console.log("Rendering");
              console.log(context.accepts);
                res.render('accept', context);
            }

        }
    });

    router.post('/', function(req, res){
        console.log("im in ur post")
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO accepting VALUES ((SELECT trainer.id FROM trainer WHERE trainer.trainer_name = '" +
         req.body.trainer_name + "'), (SELECT pokedex.id FROM pokedex WHERE pokedex.pokemon_name = '" +
         req.body.pokemon_name + "' and pokedex.regional = " +
         req.body.shiny + " and pokedex.shiny = " +
         req.body.regional + "));";
         console.log(sql);
        var inserts = [req.body.trainer_name, req.body.pokemon_name, req.body.shiny, req.body.regional];
        sql = mysql.pool.query(sql, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/accept');
            }
        });
    });

    return router;
}();
