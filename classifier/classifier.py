#
#Copyright 2018 Sebastian Coates, John Tagliaferro, Mateo Guaman, & Logan Herodes

#Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

#The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

#THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


#_arr = text[j].split(" ")
                digits = [0] * w
                for i in range(w):
                        #mat[i][j] = int(temp_arr[i])
                        digits[i] = int(temp_arr[i])
                arr.append(digits)

        file.close()
        return arr


data = file_to_mat("sim_results.txt", 5)
data_complete = file_to_mat("sim_results.txt",6)
##ydata = file_to_mat("sim_results2.txt", 1)
# print data
nbrs = NearestNeighbors(n_neighbors=5, algorithm='auto').fit(data)
print nbrs
#print dir(nbrs)
#ray = [100,100,100,100,100]
r1 = input("What percent of payments were validated? ")
r2 = input("What percent of grievances reported were validated? ")
r3 = input("What percent of injuries reported were validated? ")
r4 = input("What percent of workers responded to the questions? ")
r5 = input("What was the output per worker? ")

ray = [[r1,r2,r3,r4,r5]]
results = nbrs.kneighbors(ray,1, return_distance=False)[0]

fraud_val = data_complete[results[0]][5]
#print data_complete[index2][6]
if fraud_val == 1:
        print "Unlikely that there is fraud\n"
else:
        print "Possible fraud detected\n"
