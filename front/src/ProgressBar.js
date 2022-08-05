import React from "react";
import "./ProgressBar.css";
import image from './cccc.png';


function ProgressBar() {
    return ( 
        <div>
        <div className="main">
        <div className="image-container">
        <img src={image} className="image" alt="Eth illustration" />
        </div>
        <div className="ul-container">
        <ul>
            <li>
                <div className="progress one">
                </div>
                <p className="text">Connect to the <br />Rinkeby testnet</p>
            </li>
            <li>
                <div className="progress two">
                </div>
                <p className="text relative">Get fund on the <br /> Rinkeby faucet</p>
            </li>
            <li>
                <div className="progress three">
                </div>
                <p className="text">Be sure you <br />are whitelisted</p>
            </li>
            <li>
                <div className="progress four">
                </div>
                <p className="text relative">Choose one and<br />send transaction</p>
            </li>
            <li>
                <div className="progress five">
                </div>
                <p className="text">Check below</p>
            </li>
        </ul>
        </div>
        </div>
        </div>
     );
}

export default ProgressBar;

