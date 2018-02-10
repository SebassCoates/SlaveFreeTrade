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
}