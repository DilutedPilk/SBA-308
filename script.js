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
const LearnerSubmissions = [
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


function getLearnerData(course, ag, submissions) {

  const result = []
  if (course.id == ag.course_id) {

    let learnerID = [];
    for (let i = 0; i < LearnerSubmissions.length; i++) {

      if (i == 0) {
        learnerID.push(LearnerSubmissions[i].learner_id);
      } else if (LearnerSubmissions[i].learner_id != LearnerSubmissions[i - 1].learner_id) {
        learnerID.push(LearnerSubmissions[i].learner_id);
      } else {
        continue
      }

    }

    for (let i = 0; i < learnerID.length; i++) {

      let grades = [];

      for (let x = 0; x < LearnerSubmissions.length; x++) {

        if (learnerID[i] == LearnerSubmissions[x].learner_id) {
          for (let z = 0; z < AssignmentGroup.assignments.length; z++){
            if (LearnerSubmissions[x].assignment_id == AssignmentGroup.assignments[z].id){
              grades.push(LearnerSubmissions[x].submission.score/AssignmentGroup.assignments[z].points_possible);
            }
          }
        } else {
          continue
        }

      }

      let average = grades.reduce((accumulator, currentValue) => accumulator + currentValue, 0,)/grades.length;
      result.push({id: learnerID[i], avg: average});
    }

  } else {
    throw console.error("Course info ID does not match assignment group!");
  }

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
// here, we would process this data to achieve the desired result.
//   const result = [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0 // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833 // late: (140 - 15) / 150
//     }
//   ];
