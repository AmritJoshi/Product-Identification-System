pragma solidity >=0.4.22 <0.9.0;

contract prodidentify{

    struct Product{
        uint price;
        string name;
        string product_type;
    }   

    mapping(string => Product) products;

    function createTask(string memory qrcode ,uint _price,string memory _name,string memory _product_type) public{
        products[qrcode]=Product(_price,_name,_product_type);
    }

    function getProduct(string memory qrcode) public view returns(uint, string memory,string memory){
            return (products[qrcode].price , products[qrcode].name,products[qrcode].product_type);
    }
}
