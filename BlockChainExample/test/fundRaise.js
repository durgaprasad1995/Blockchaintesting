const FundRaise = artifacts.require('./FundRaise.sol')

contract('FundRaise', function ([owner, donor]) {
    let fundRaise
    
    beforeEach('setup contract for each test', async function () {
        fundRaise = await FundRaise.new(owner)
    })

    it('has an owner', async function () {
        assert.equal(await owner, owner)
        console.log('Owner',owner)
       console.log("ddddddddddd",web3.eth.accounts)
    })

    
    it('accepts funds', async function () {
        await fundRaise.sendTransaction({ value: 1e+18, from: donor })
        console.log('send transcation detials',fundRaise.sendTransaction({ value: 1e+18, from: donor }))
        const fundRaiseAddress = await fundRaise.address
        assert.equal(web3.eth.getBalance(fundRaiseAddress).toNumber(), 1e+18)
        console.log('Balance of the donor',web3.eth.getBalance(fundRaiseAddress).toNumber())
        console.log('Address',fundRaiseAddress)
        console.log('Balance of my account',web3.eth.getBalance("0x46ac292b90c4f8286e6c3e1ba4ef26a4c3e46951").toNumber())
    })

    // it('is able to pause and unpause fund activity', async function () {
    //     await fundRaise.pause()

    //     try {
    //         await fundRaise.sendTransaction({ value: 1e+18, from: donor })
    //         assert.fail()
    //     } catch (error) {
    //         assert(error.toString().includes('invalid opcode'), error.toString())
    //     }
    //     const fundRaiseAddress = await fundRaise.address
    //     assert.equal(web3.eth.getBalance(fundRaiseAddress).toNumber(), 0)

    //     await fundRaise.unpause()
    //     await fundRaise.sendTransaction({ value: 1e+18, from: donor })
    //     assert.equal(web3.eth.getBalance(fundRaiseAddress).toNumber(), 1e+18)
    // })

    it('permits owner to receive funds', async function () {
        await fundRaise.sendTransaction({ value: 1e+18, from: donor })
        const ownerBalanceBeforeRemovingFunds = web3.eth.getBalance(owner).toNumber()
        console.log("owner balance ",ownerBalanceBeforeRemovingFunds)
        const fundRaiseAddress = await fundRaise.address
        assert.equal(web3.eth.getBalance(fundRaiseAddress).toNumber(), 1e+18)

        await fundRaise.removeFunds()

        assert.equal(web3.eth.getBalance(fundRaiseAddress).toNumber(), 0)
        console.log('Reciver balance',web3.eth.getBalance(fundRaiseAddress).toNumber())
        assert.isBelow(web3.eth.getBalance(owner).toNumber(), ownerBalanceBeforeRemovingFunds)
    })
})

