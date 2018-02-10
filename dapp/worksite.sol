Copyright 2018 Sebastian Coates, John Tagliaferro, Mateo Guaman, & Logan Herodes

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

pragma solidity ^0.4.16;

import "./worker.sol";

contract Worksite {
        address public boss;
        uint public budget;
        mapping(address => Worker) public employees;

        function Worksite(uint[] salaries, address[] workers, uint _budget) public {
                assert(salaries.length == workers.length);
                assert(_budget > 0);
                
                boss = msg.sender; // Contract created by boss!!
                budget = _budget;

                for (uint i = 0; i < salaries.length; i++) {
                        Worker w = new Worker(salaries[i], workers[i]);
                        employees[workers[i]] = w;
                }
        }

        function hire(uint salary, address worker) public {
                Worker w = new Worker(salary, worker);
                employees[worker] = w;
        }

        function fire(address worker) public {
                employees[worker].fireWorker();
        }

        function makePayt(address worker, uint payment) public {
                assert(budget - payment > 0);

                employees[worker].payWorker(payment);
                budget -= payment;
        }

        function adjustBudget(uint newBudget) public {
                assert(newBudget > 0);

                budget = newBudget;
        }
	
	function validatePayment() public {
		employees[msg.sender].validatePayment(msg.sender);
	}	
}
