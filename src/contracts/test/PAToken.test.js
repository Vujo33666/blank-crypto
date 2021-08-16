const PAToken = artifacts.require("./PAToken.sol");

contract("PAToken", accounts => {

    before(async () => {
        pat=await PAToken.deployed()
    })

    it("should return correct balance", async()=>{
        let balance = await pat.balanceOf(accounts[0]);
        balance = web3.utils.fromWei(balance,"ether");
        assert.equal(balance,"0.1", "The balance should be 0.2")
    })

    it("should transfer tokens between accounts", async()=>{

        let amount = web3.utils.toWei("0.02","ether");

        let starting_balance_acc1 = await pat.balanceOf(accounts[0]);
        starting_balance_acc1 = web3.utils.fromWei(starting_balance_acc1,"ether");

        let starting_balance_acc2 = await pat.balanceOf(accounts[1]);
        starting_balance_acc2 = web3.utils.fromWei(starting_balance_acc2,"ether");

        await pat.transfer(accounts[1], amount, {from:accounts[0]})

        let ending_balance_acc1 = await pat.balanceOf(accounts[0]);
        ending_balance_acc1 = web3.utils.fromWei(ending_balance_acc1,"ether");

        let ending_balance_acc2 = await pat.balanceOf(accounts[1]);
        ending_balance_acc2 = web3.utils.fromWei(ending_balance_acc2,"ether");

        assert.equal(starting_balance_acc1 - web3.utils.fromWei(amount,"ether") ,ending_balance_acc1, "Amount was correctly taken from the sender");
        assert.equal(starting_balance_acc2 + web3.utils.fromWei(amount,"ether") ,ending_balance_acc2, "Amount was correctly sent from the receiver")
    })

    it("should mint tokens", async()=>{
        let amount = web3.utils.toWei("0.02","ether");
        let starting_balance = await pat.balanceOf(accounts[0]);
        starting_balance = web3.utils.fromWei(starting_balance,"ether");
        await pat.mint(accounts[0], amount, {from:accounts[0]})

        let ending_balance = await pat.balanceOf(accounts[0]);
        ending_balance = web3.utils.fromWei(ending_balance,"ether");
        assert.equal(ending_balance,starting_balance + amount, "The ending balance should be 0.1")
    })

    
});