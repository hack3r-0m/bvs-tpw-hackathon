const fetch = require('node-fetch');
 
fetch('https://pg-app-gbqap934o1ljag1iyc43d92z6y7cq4.scalabl.cloud/1/classes/emails', {
        method: 'post',
        body: JSON.stringify({'email': 'ran@dom.com'}),
        headers: { 'X-Parse-Application-Id':'bnWm3uyrDRWXc5ypb4NOpkdRKOkVINbTKPRUQeOV', 'X-Parse-REST-API-Key': 'AyOwmvBNe7vDJtGj1pyQrKlVkOReQOUKI3KEOVSb', 'X-Parse-Revocable-Session': "1", 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log((json)));
