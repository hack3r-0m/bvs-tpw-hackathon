import 'regenerator-runtime/runtime';
import Portis from "@portis/web3";
import Web3 from "web3";

const portis = new Portis("2e30a7f4-e05d-4389-ae7f-ba03cf835a8a", "ropsten", {scope: ["email"] });
const web3 = new Web3(portis.provider);

portis.onLogin( (walletAddress, email) => {
  console.log("User logged in");
  document.getElementById("app").innerHTML = `
  <div> Wallet Address: ${walletAddress} </div>
  <div> Email: ${email} </div>
`;

  const fetch = require('node-fetch');
 
  fetch('https://pg-app-gbqap934o1ljag1iyc43d92z6y7cq4.scalabl.cloud/1/classes/emails', {
        method: 'post',
        body: JSON.stringify({'email': `${email}`}),
        headers: { 'X-Parse-Application-Id':'', 'X-Parse-REST-API-Key': '', 'X-Parse-Revocable-Session': "1", 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log((json)));
});

portis.onLogout(() => {
  console.log("User logged out");
  document.getElementById("app").innerHTML = ``;
});

document.getElementById("login").onclick = () => web3.eth.getAccounts();
document.getElementById("logout").onclick = () => {
  portis.isLoggedIn().then(({ error, result }) => {
    if (result) {
      console.log("Logging out user");
      portis.logout();
    } else if (error) {
      console.log(error);
    } else {
      console.log("User is already logged out!");
    }
  });
};

var bit = false;

document.getElementById("candidate1").onclick = () => {
  portis.isLoggedIn().then(({ error, result }) => {
    

    if (result) {
      if (!bit){
        document.getElementById("vt1").innerHTML = `<div> VOTE CASTED FOR CANDIDATE 1 </div>`;
        var bit = false;
      } else{
        document.getElementById("vt1").innerHTML = `<div> VOTE ALREDY CASTED </div>`;
      }

    }  else {
      document.getElementById("vt1").innerHTML = `<div> you are not logged in </div>`;
    }

  });
};

document.getElementById("candidate2").onclick = () => {
  portis.isLoggedIn().then(({ error, result }) => {

    if (result){
      if (!bit){
        document.getElementById("vt2").innerHTML = `<div> VOTE CASTED FOR CANDIDATE 2 </div>`;
        var bit = false;
      } else{
        document.getElementById("vt2").innerHTML = `<div> VOTE ALREDY CASTED </div>`;
      }

    }  else {
      document.getElementById("vt2").innerHTML = `<div> you are not logged in </div>`;
    }

  });
};
