Copyright 2018 Sebastian Coates, John Tagliaferro, Mateo Guaman, & Logan Herodes

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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

        function validatePayment(address caller) public {
                assert(employed);
                assert(!validated)
                assert(caller == workerAddress);

                validated = true;
        }
}
