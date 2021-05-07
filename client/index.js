import Web3 from 'web3';
import AdvancedStorage from '../build/contracts/AdvancedStorage.json';
const HDWalletProvider = require('@truffle/hdwallet-provider');

let web3;
let contractInstance;
const myaddress = "0x8521d3bcdc2103482f3a11a67b78576b60e560e7";
const myprivatekey = "de72ffe07700ee6120c4d411b947400207b3bcbe3a6ab74310f93c1082b15607";
let networkId;

const init_contract = async () => {

    networkId = await web3.eth.net.getId();

    contractInstance = new web3.eth.Contract(
        AdvancedStorage.abi,
        AdvancedStorage.networks[networkId].address
    );

    console.log(contractInstance);

};

const signeItBaby = async (tx) => {
    const gas = await tx.estimateGas({ from: myaddress });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(myaddress);

    const signedTx = await web3.eth.accounts.signTransaction(
        {
            to: contractInstance.options.address,
            data,
            gas,
            gasPrice,
            nonce,
            chainId: networkId
        },
        myprivatekey
    );

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(`Transaction hash: ${receipt.transactionHash}`);
}

const init_app = () => {

    // pushing data using set_arr method of contract
    document.getElementById('myform').addEventListener('submit', e => {

        e.preventDefault(); //so that form dont submited on their on

        const input = e.target.elements[0].value;

        const tx = contractInstance.methods.set_arr(input);
        signeItBaby(tx);
    });

    //show All array getAll_arr() using function of contract
    document.getElementById('showArray').addEventListener('click', e => {
        contractInstance.methods.getAll_arr().call()
            .then(_arr => {
                document.getElementById('output').innerHTML = _arr.join(', ');
            })
    })

    // length of array
    document.getElementById('showLength').addEventListener('click', e => {
        contractInstance.methods.getLength_arr().call()
            .then(_len => {
                document.getElementById('output').innerHTML = "Length of Array is " + _len;
            })
    })

}

document.addEventListener('DOMContentLoaded', () => {

    const provider = new HDWalletProvider(myprivatekey, 'https://rinkeby.infura.io/v3/b6f52620759b454cbe5d36fab23b8ed2');
    web3 = new Web3(provider);
    init_contract();
    init_app();
});