const testAdvancedStorage = artifacts.require('AdvancedStorage');

contract('Description of contract', () => {

    let contract_instance = null; //let is bcz this value should be changable;

    before(async () => {
        contract_instance = await testAdvancedStorage.deployed();
    });
    //"before" function will run first before any other it function


    it('should add element to array', async () => {
        await contract_instance.set_arr(10);
        await contract_instance.set_arr(20);
        const result = await contract_instance.arr(0); //this can be written IFF arr is public
        assert(result.toNumber() === 10);
    })
    //toNumber(): to convert the bignumber Object(solidity special) to regular Object(JS supportable number)

    it('should get one element from array', async () => {
        const result = await contract_instance.getOne_arr(1);
        assert(result.toNumber() === 20);
    })

    it('should get length of array', async () => {
        const result = await contract_instance.getLength_arr();
        assert(result.toNumber() === 2);
    })

    it('should get all element of array', async () => {
        const raw_arr = await contract_instance.getAll_arr();
        const JS_arr = raw_arr.map(i => i.toNumber());
        assert.deepEqual(JS_arr, [10, 20]); //for comparing arrays
    })


});