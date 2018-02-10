this file
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

	//  variable declarations
	int payRate = 0;
	int grievanceRate = 0;
	int injuryReport = 0;
	int respPerWorker = 0;
	int outPerWorker = 0;  

	// order is as seen above
	// seed rand
	srand (time(NULL));
	for (int i = 0; i <= 10000; i++)
	{	
		// sim some shit:
		payRate = rand() % 101;
		outfile << payRate << " ";

		grievanceRate = rand() % 101;
		outfile << grievanceRate << " ";

		injuryReport = rand() % 101;
		outfile << injuryReport << " ";

		respPerWorker = rand() % 101;
		outfile << respPerWorker << " ";

		outPerWorker = rand() % 101;
		outfile << outPerWorker << endl;

	}

	// close the outfile
	outfile.close();

	return 0;
}
