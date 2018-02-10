pragma solidity ^0.4.16;

contract Worker {
        bool validated;
        bool employed;
        uint salary;
        uint balance;
        address workerAddress;

        function Worker(uint _salary, address _workerAddress) public {
                workerAddress = _workerAddress;
                salary = _salary;
                validated = true;
                employed = true;
                balance = 0;
        }

        function fireWorker() public {
                assert(employed);
                assert(validated);

                employed = false;
        }

        function payWorker(uint payment) public {
                assert(employed);
                assert(validated);

                balance += payment;
                validated = false;
        }

        function validatePayment() public {
                assert(employed);
                assert(!validated);
                assert(msg.sender == workerAddress);

                validated = true;
        }
}
