// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmission = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getID(submissions) { //Puts learner IDs into an array without repeats
  let learnerID = [];
  for (let i = 0; i < submissions.length; i++) {

    if (i == 0) {
      learnerID.push(submissions[i].learner_id);
    } else if (submissions[i].learner_id != submissions[i - 1].learner_id) {
      learnerID.push(submissions[i].learner_id);
    } else {
      continue
    }

  }
  return learnerID;
}

  function getLearnerData(course, ag, submissions) {

    const result = []
    if (course.id == ag.course_id) {

      let learnerID = getID(submissions);

      for (let i = 0; i < learnerID.length; i++) { // Grabs grades from learner submissions

        let grades = [];

        for (let x = 0; x < submissions.length; x++) {

          if (learnerID[i] == submissions[x].learner_id) {  //Attempt on skipping final assignment from average grade
            for (let z = 0; z < ag.assignments.length; z++) {
              if (submissions[x].assignment_id == ag.assignments[z].id) {

                let learnerSubmit = new Date(submissions[x].submission.submitted_at);
                let dueDate = new Date(ag.assignments[z].due_at);
                let today = new Date(ag.assignments[1].due_at)
                let late = submissions[x].submission.score * .10;
                if (today < dueDate) {
                  continue;
                } else if (learnerSubmit > dueDate) {
                  grades.push((submissions[x].submission.score - late) / ag.assignments[z].points_possible);
                } else {
                  grades.push(submissions[x].submission.score / ag.assignments[z].points_possible);
                }
              }
            }
          } else {
            continue
          }

        }

        // Makes objects for each student's grades and average
        
        let temp = []
        let obj = {}

        let average = grades.reduce((accumulator, currentValue) => accumulator + currentValue, 0,) / grades.length;

        obj.id = learnerID[i],
          obj.avg = average;

        for (let x = 1; x <= grades.length; x++) {
          temp.push(x);
        }

        for (let x = 0; x < temp.length; x++) {
          let arr = temp[x];
          let grade = grades[x]
          obj[arr] = grade;

        }

        result.push(obj)
      }

    } else {
      throw console.error("Course info ID does not match assignment group!");
    }

    return result;
  }

  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmission);

  console.log(result);
