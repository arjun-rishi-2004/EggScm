import React, { useState, useEffect } from "react";
import Web3 from "web3";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [eggId, setEggId] = useState("");
  const [stageName, setStageName] = useState("");
  const [stages, setStages] = useState([]);
  const [productionDate, setProductionDate] = useState("");
  const [stage, setStage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [totalEggs, setTotalEggs] = useState(0);
  const [gradedDate, setGradedDate] = useState('');
  const [packagedDate, setPackagedDate] = useState('');
  const [distributedDate, setDistributedDate] = useState('');
  useEffect(() => {
    connectToWeb3();
  }, []);

  const connectToWeb3 = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3Instance = new Web3(window.ethereum);
        setAccount(accounts[0]);
        window.ethereum.on("accountsChanged", (accounts) => {
          setAccount(accounts[0]);
        });
        const contractInstance = new web3Instance.eth.Contract(
          [
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "eggId",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "distributedDate",
                  "type": "uint256"
                }
              ],
              "name": "EggDistributed",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "eggId",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "gradedDate",
                  "type": "uint256"
                }
              ],
              "name": "EggGraded",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "eggId",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "packagedDate",
                  "type": "uint256"
                }
              ],
              "name": "EggPackaged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "eggId",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "productionDate",
                  "type": "uint256"
                }
              ],
              "name": "EggProduced",
              "type": "event"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "eggs",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "productionDate",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "gradedDate",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "packagedDate",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "distributedDate",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "eggId",
                  "type": "uint256"
                }
              ],
              "name": "getEggDates",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "produceEgg",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "eggId",
                  "type": "uint256"
                }
              ],
              "name": "setDistributedDate",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "eggId",
                  "type": "uint256"
                }
              ],
              "name": "setGradedDate",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "eggId",
                  "type": "uint256"
                }
              ],
              "name": "setPackagedDate",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "totalEggs",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            }
          ],"0x5FbDB2315678afecb367f032d93F642f64180aa3"
        );
        setContract(contractInstance);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert(
        "Please install MetaMask or another Ethereum-compatible browser extension."
      );
    }
  };
 
  const updateTotalEggs = async () => {
    if (contract) {
      const total = await contract.methods.totalEggs().call();
      setTotalEggs(total);
    }
  };

  const produceEgg = async () => {
    if (contract) {
      await contract.methods.produceEgg().send({ from: account });
      updateTotalEggs();
    }
  };

  const setGraded = async () => {
    if (contract && eggId) {
      await contract.methods.setGradedDate(eggId).send({ from: account });
      updateEggDates();
    }
  };

  const setPackaged = async () => {
    if (contract && eggId) {
      await contract.methods.setPackagedDate(eggId).send({ from: account });
      updateEggDates();
    }
  };

  const setDistributed = async () => {
    if (contract && eggId) {
      await contract.methods.setDistributedDate(eggId).send({ from: account });
      updateEggDates();
    }
  };
  const updateEggDates = async () => {
    if (contract && eggId) {
      const dates = await contract.methods.getEggDates(eggId).call();
      setProductionDate(new Date(Number(dates[0]) * 1000).toLocaleString());
      setGradedDate(dates[1] > 0 ? new Date(Number(dates[1]) * 1000).toLocaleString() : '');
      setPackagedDate(dates[2] > 0 ? new Date(Number(dates[2]) * 1000).toLocaleString() : '');
      setDistributedDate(dates[3] > 0 ? new Date(Number(dates[3]) * 1000).toLocaleString() : '');
    }
  };
  
  const getEggDates = async () => {
    try {
      const dates = await contract.methods.getEggDates(eggId).call();
      setProductionDate(new Date(Number(dates[0]) * 1000).toLocaleString());
      setGradedDate(dates[1] > 0 ? new Date(Number(dates[1]) * 1000).toLocaleString() : '');
      setPackagedDate(dates[2] > 0 ? new Date(Number(dates[2]) * 1000).toLocaleString() : '');
      setDistributedDate(dates[3] > 0 ? new Date(Number(dates[3]) * 1000).toLocaleString() : '');
    } catch (error) {
      console.error('Failed to get egg dates. Check console for details.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Egg Supply Chain</h1>
      <button onClick={produceEgg}>Produce Egg</button>
      <hr />
      <input
        type="text"
        placeholder="Egg ID"
        value={eggId}
        onChange={(e) => setEggId(e.target.value)}
      />
      <button onClick={setGraded}>Set Graded</button>
      <button onClick={setPackaged}>Set Packaged</button>
      <button onClick={setDistributed}>Set Distributed</button>
      <button onClick={getEggDates}>Get Dates</button>

      <hr />
      <h2>Egg Dates</h2>
      <p>Production Date: {productionDate}</p>
      <p>Graded Date: {gradedDate}</p>
      <p>Packaged Date: {packagedDate}</p>
      <p>Distributed Date: {distributedDate}</p>


      {/* <div>
        <label htmlFor="eggId">Egg ID:</label>
        <input
          type="text"
          id="eggId"
          value={eggId}
          onChange={(e) => setEggId(e.target.value)}
        />
      </div> */}
      {/* <div>
        <h2>Dates for Egg ID {eggId}:</h2>
        <p>Production Date: {productionDate}</p>
        <p>Graded Date: {gradedDate}</p>
        <p>Packaged Date: {packagedDate}</p>
        <p>Distributed Date: {distributedDate}</p>
      </div> */}
    </div>
    
  );
};

export default App;