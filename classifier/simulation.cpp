
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
