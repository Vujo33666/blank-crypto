// SPDX-License-Identifier: MIT
pragma solidity 0.8.1;

contract VujoBank{
    int balance;
    
    constructor(){
        balance=156;
    }
    
    function getBalance() view public returns(int){
        return balance;
    }
    
    function withdraw(int amount) public{
        balance=balance-amount;
    }
    
    function deposit(int amount) public{
        balance= balance+amount;
    }

    function transferEther(int amount) public{
        balance=amount;
    }
    
    
}
