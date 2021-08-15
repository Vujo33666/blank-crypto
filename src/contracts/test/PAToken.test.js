const PAToken = artifacts.require("./PAToken.sol");

contract("PAToken", accounts => {

    it("Should return balance",  () => {
        let token;
        PAToken.deployed()
        .then(instance => {
            token=instance;
            return token.balanceOf(accounts[0]);
        })
        .then(balance => {
            balance=web3.utils.fromWei(balance,"ether");
            console.log(balance)
            assert.equal(balance,0.2,"Balance values are not the same")
        });
    });

    it("Should transfer tokens between accounts", () => {
        let amount = web3.utils.toWei("0.1","ether");
        let token;
        let account_one_starting_balance;
        let account_two_starting_balance;
        let account_one_ending_balance;
        let account_two_ending_balance;
        PAToken.deployed()
        .then(instance => {
            token=instance;
            account_one_starting_balance =  token.balanceOf(accounts[0]);
            account_two_starting_balance =  token.balanceOf(accounts[1]);
            return token.transfer(accounts[1], amount, {from: accounts[0]});
        })
        .then(() => {
            return token.balanceOf(accounts[0]);
        })
        .then(result => {
            account_one_ending_balance = result.toNumber();
            return token.balanceOf(accounts[0]);
        })
        .then(result => {
            account_two_ending_balance = result.toNumber();

            assert.equal(
                account_one_ending_balance,
                account_one_starting_balance - amount,
                "Amount wasn't correctly taken from the sender"
             );
            assert.equal(
                account_two_ending_balance,
                account_two_starting_balance - amount,
                "Amount wasn't correctly sent to the receiver"
             );
    
        })
    })


    it("Should mint PATokens", () => {

        let token;
        let starting_balance;
        let ending_balance;
        let amount = web3.utils.toWei("0.1","ether");
    
        PAToken.deployed()
        .then((instance) => {
            token = instance;
            return token.balanceOf(accounts[0]);
        })
        .then(balance => {
            starting_balance = balance.toNumber();
            return token.mint(accounts[0], amount).send({ from: accounts[0] });
        })
        .then(() => {
            return token.balanceOf(accounts[0]);
        })
        .then((balance) => {
            ending_balance = balance.toNumber();
    
        assert.equal(
              starting_balance,
              ending_balance + amount,
              "Amount wasn't correctly minted"
            );
        });
    });

});