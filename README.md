<h1 align="center"> Assignment for SBA 308 </h1>

The program currently has two functions. The first function puts both learner IDs into an array. Second function grabs both learner IDs and puts their grades into a second array called "grades". Those grades are then averaged out and put into a "result" array. The final console log shows the result of the second function, which prints out two objects representing the two students, their grades for two assignments, and their average overall.

<h3 align="center">Issues</h3>

As the third assignment isn't due yet, it is not counted in the average. The first student has submitted the third assignment while the second student has not. I attempted to mitigate the issue and stop the third assignment from calculating into the first student's average and I am unsure if it was implemented correctly.

I should have used a find function to see if there are any repeats in the getID() function. This problem does not appear in this particular array but if the submissions.learner_id happen to be disorganized, the program would likely not work the way it should.
