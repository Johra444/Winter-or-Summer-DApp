import React, { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import abi from "./utils/WavePortal.json";
import classNames from "classnames";



const contractABI = abi.abi;


const App = () => {
  
  const [number, setNumber] = useState();
  const [input, setInput] = useState();
  const [time, setTime] = useState();
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0xA6439AbfA600901A9914B90A73190E3D4BE8a319";
  

const whitelist = async (address) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractAddress,contractABI, signer);

      const whitelist = await wavePortalContract.addUser(address);
      await whitelist.wait();
    }
  } catch (error) {
    console.log(error);
  }
}

const wave = async (x) => {
    try {
      const { ethereum } = window;
      
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress,contractABI, signer);

        let count = await wavePortalContract.getTotal();
        setNumber(count);
        setInput(x);

        const waveTxn = await wavePortalContract.wave(x);
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        console.log("Mined -- ", waveTxn);

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      setTime(true);
      setTimeout(function(){
        setTime(false);
      },5000)
    }
  }
  
  
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        console.log(number);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
  }
}

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
  
  const alert = classNames("alert", {
    "hide": (time !== true),
    "show": (time === true),
    "showAlert": (time === true)
  });


  const conditionalRed = classNames("App", {
    "red": (input === 'summer'),
    "grey": (input === 'winter')
  });

  const conditionalBlue = classNames("App", {
    "grey": (input === 'summer'),
    "blue": (input === 'winter')
  });
  
 return (
    <div className="mainContainer">
     {/* <button onClick={() => whitelist("0x0fc59e181244aC9bA1DaAC47fc4C7888FfefA391") }>whitelist</button> */}
      <div className="dataContainer">
      {currentAccount && (
    <div>
    <div className="buttonContainer">
      <div className="textButton">
          <button onClick={() => wave("winter") } className={conditionalBlue}>WINTER</button>

          {currentAccount && number == undefined && (
          <p className="total">{`Total : x`}</p>
        )}
        {currentAccount && number != undefined && (
          <p className="total">{`Total : ${number[2]}`}</p>
        )}

      </div>
      <div className="textButton">
          <button onClick={() => wave("summer") } className={conditionalRed}>SUMMER</button>
          {currentAccount && number == undefined && (
          <p className="total">{`Total : x`}</p>
        )}
        {currentAccount && number != undefined && (
          <p className="total">{`Total : ${number[1]}`}</p>
        )}
      </div>
    </div>
    </div> 
        )}

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
      <div className={alert}>
      <span className="fas fa-exclamation-circle"></span>
      <span className="msg">You have to be whitelisted !</span>
      <div className="close-btn" onClick={() => setTime(false)} >
         <span className="fas fa-times"></span>
      </div>
   </div>
    </div>
  );
}

export default App;