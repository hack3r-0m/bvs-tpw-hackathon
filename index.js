const express = require('express')
const exphbs  = require('express-handlebars')
const app = express()
const port = 3000

const hbs = exphbs.create({ 
					defaultLayout: 'main',
					extname: '.html',
				});

app.engine('html', hbs.engine);
app.set('view engine', 'html');

app.use(express.static('public'));

app.get('/', function(req, res){ 
	    res.render('home'); 
})


app.get('/activity', function(req, res){ 

	const fetch = require('node-fetch');

	let x = null;
 
	fetch('https://pg-app-gbqap934o1ljag1iyc43d92z6y7cq4.scalabl.cloud/1/classes/stats', {
        method: 'GET',
        headers: { 'X-Parse-Application-Id':'', 'X-Parse-REST-API-Key': '', 'X-Parse-Revocable-Session': "1", 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => res.render('activity', {val: JSON.stringify(json.results[json.results.length -1], undefined, 8)} ));

})

app.get('/logs', function(req, res){ 

	const fetch = require('node-fetch');
	 
	fetch('https://pg-app-gbqap934o1ljag1iyc43d92z6y7cq4.scalabl.cloud/1/classes/emails', {
	        method: 'GET',
	        headers: { 'X-Parse-Application-Id':'', 'X-Parse-REST-API-Key': '', 'X-Parse-Revocable-Session': "1", 'Content-Type': 'application/json' },
	    })
	    .then(res => res.json())
	    .then(json => res.render('logs', { objs: JSON.stringify(json.results, undefined, 8)  } ));
})

app.listen(port, () => {
	  console.log(`Example app listening at http://localhost:${port}`)
})
