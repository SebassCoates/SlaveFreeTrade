pragma solidity ^0.4.16;

contract Worker {
        bool validated;
        bool employed;
        uint salary;
        uint balance;
        address workerAddress;

        function Worker(uint _salary, address _workerAddress) {
                workerAddress = _workerAddress;
                salary = _salary;
                validated = true;
                employed = true;
                balance = 0;
        }

        function fireWorker() {
                assert(employed);
                assert(validated);

                employed = false;
        }

        function payWorker(uint payment) {
                assert(employed);
                assert(validated);

                balance += payment;
                validated = false;
        }

        function validatePayment() {
                assert(employed);
                assert(!validated)
                assert(msg.sender == workerAddress);

                validated = true;
        }
}
