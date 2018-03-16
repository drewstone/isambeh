// @flow
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dharma from "@dharmaprotocol/dharma.js";

import getWeb3 from './utils/getWeb3'

import Landing from './Landing'
import LoadingPage from './LoadingPage'


class App extends Component {
  state = {
    web3: null,
    // AccountsInstance: null,
    // accounts: null
  }

  async instantiateDharma() {
    const networkId = await promisify(this.state.web3.version.getNetwork)();
    const accounts = await promisify(this.state.web3.eth.getAccounts)();
    
    if (!(networkId in DebtKernel.networks &&
          networkId in RepaymentRouter.networks &&
          networkId in TokenTransferProxy.networks &&
          networkId in TokenRegistry.networks && 
          networkId in DebtToken.networks &&
          networkId in TermsContractRegistry.networks)) {
        throw new Error("Cannot find Dharma smart contracts on current Ethereum network.");
    }
    
    const dharmaConfig = {
        kernelAddress: DebtKernel.networks[networkId].address,
        repaymentRouterAddress: RepaymentRouter.networks[networkId].address,
        tokenTransferProxyAddress: TokenTransferProxy.networks[networkId].address,
        tokenRegistryAddress: TokenRegistry.networks[networkId].address,
        debtTokenAddress: DebtToken.networks[networkId].address,
        termsContractRegistry: TermsContractRegistry.networks[networkId].address
    }
    
    const dharma = new Dharma(this.state.web3.currentProvider, dharmaConfig);
    
    this.setState({ dharma, accounts });
  }

  async componentWillMount() {
    try {
      const results = await getWeb3;
      this.setState({ web3: results.web3 })

      // // configure and include the smart contract
      // const contract = require('truffle-contract')
      // const Accounts = contract(AccountsContract)
      
      // Accounts.setProvider(this.state.web3.currentProvider)
    
      // // Get accounts.
      // this.state.web3.eth.getAccounts(async (error, accounts) => {
      //   const instance = await Accounts.deployed();
      //   this.setState({ accounts: accounts, AccountsInstance: instance });
      // })
    } catch (e) {
      console.log('Error finding web3.')
    }
  }

  render() {
    return (
      <Router>
        { this.state.web3 === null ? <LoadingPage /> : <div>
          <Route exact path="/" render={(props) => ( <Landing {...props} {...this.state} /> )} />
          {/*<Route exact path="/student/signup" render={(props) => ( <StudentSignup {...props} {...this.state} /> )} />*/}
        </div> }
      </Router>
    )
  }
}

export default App;
