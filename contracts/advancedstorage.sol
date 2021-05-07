
pragma solidity ^0.5.0;

contract AdvancedStorage{
    
    uint[] public arr;
    
    function set_arr(uint data) public{
        arr.push(data);
    }
    
    function getOne_arr(uint index) view public returns(uint)
    {
        return arr[index];
    }
    
    function getAll_arr() view public returns(uint[] memory)
    {
        return arr;
    }
    
    function getLength_arr() view public returns(uint)
    {
        return arr.length;
    }
}