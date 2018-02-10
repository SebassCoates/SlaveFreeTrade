/
/*
Copyright 2018 Sebastian Coates, John Tagliaferro, Mateo Guaman, & Logan Herodes

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
// Logan Herodes
// Simulation of Data Sets
// SlaveFreeTrade Hackathon Project

#include <iostream>
#include <fstream>
#include <stdlib.h>
#include <time.h>     
using namespace std;

int main()
{
	// ofstream
	ofstream outfile;
	outfile.open("sim_results.txt");
	//ofstream outfile2;
	//outfile2.open("sim_results2.txt");

	//  variable declarations
	int payRate = 0;
	int grievanceRate = 0;
	int injuryReport = 0;
	int respPerWorker = 0;
	int outPerWorker = 0;  
	double avg = 0.0;
	int shady [10000];

	// order is as seen above
	// seed rand
	srand (time(NULL));
	for (int i = 0; i <= 10000; i++)
	{	
		shady[i] = 0;

		// sim some shit:
		payRate = rand() % 101;

		grievanceRate = rand() % 101;

		injuryReport = rand() % 101;

		respPerWorker = rand() % 101;

		outPerWorker = rand() % 101;

		avg = (payRate + grievanceRate + injuryReport + respPerWorker + outPerWorker)/5;

		if (avg >= 80.0)
		{
			shady[i] = 1;
		}

		outfile << payRate << " " << grievanceRate << " " << injuryReport << " " << respPerWorker << " " << outPerWorker<< " " << shady[i] << endl;

	}

	//for (int i = 0; i < 10000; i++)
	//{
		//outfile2 << shady[i] << endl;
	//}

	// close the outfile
	outfile.close();
	//outfile2.close();
	return 0;
}
