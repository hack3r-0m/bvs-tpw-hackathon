import 'regenerator-runtime/runtime';
import Portis from "@portis/web3";
import Web3 from "web3";

const portis = new Portis("2e30a7f4-e05d-4389-ae7f-ba03cf835a8a", "ropsten", {scope: ["email"] });
const web3 = new Web3(portis.provider);

const to1 = "0xb1690C08E213a35Ed9bAb7B318D114420FB57d8C"; // identifier of first candidate
const to2 = "0xb1690C08E213a35Ed9bAb7B318D114420FB57d8D"; // // identifier of second candidate


const amountInEther = 0.1;
const gasLimit = "0x0";
const gasPrice = "0x0";


function etherToHexWei(value) {
  const wei = value * 10 ** 18;
  const hexWei = wei.toString(16);
  return `0x${hexWei}`;
}


portis.onLogin( (walletAddress, email) => {
  console.log("User logged in");
  document.getElementById("app").innerHTML = `
  <div> Wallet Address: ${walletAddress} </div>
  <div> Email: ${email} </div>
`;

  const fetch = require('node-fetch');

  // update sashiDo
 
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


document.getElementById("candidate1").onclick = () => {
  portis.isLoggedIn().then(({ error, result }) => {
    

    if (result) {
      (async () => {
        const accounts = await portis.provider.enable(); // send trsaction to network after signing by user
        const response = await web3.currentProvider.send("eth_sendTransaction", [
        {
          from: accounts[0],
          to: to1,
          value: etherToHexWei(amountInEther),
          gas: gasLimit,
          gasPrice: gasPrice
        }
      ]);
        console.log(response);
      })();

      document.getElementById("vt1").innerHTML = `<div> VOTE CASTED FOR CANDIDATE 1 (wallet of candidate1 = ${to1} ) </div>`;

    }  else {
      document.getElementById("vt1").innerHTML = `<div> you are not logged in </div>`;
    }

  });
};

document.getElementById("candidate2").onclick = () => {
  portis.isLoggedIn().then(({ error, result }) => {

    if (result){

      (async () => {
        const accounts = await portis.provider.enable();
        const response = await web3.currentProvider.send("eth_sendTransaction", [
        {
          from: accounts[0],
          to: to2x,
          value: etherToHexWei(amountInEther),
          gas: gasLimit,
          gasPrice: gasPrice
        }
      ]);
        console.log(response);
      })();

        document.getElementById("vt2").innerHTML = `<div> VOTE CASTED FOR CANDIDATE 2 (wallet of candidate1 = ${to2} )</div>`;

    }  else {
      document.getElementById("vt2").innerHTML = `<div> you are not logged in </div>`;
    }

  });
};
