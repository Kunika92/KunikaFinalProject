function getApiCoursePercent(params = {}) {
  const {
    attendance: attendanceMarkOf100 = 100,
    homework: homeworkMarkOf100 = 0,
    final: finalMarkOf100 = 0,
  } = params;
  const attendanceWeight = ((attendanceMarkOf100 / 100) * (1 / 3) * 100);
  const homeworkWeight = ((homeworkMarkOf100 / 100) * (27 / 100) * 100);
  const finalWeight = ((finalMarkOf100 / 100) * (4 / 10) * 100);

  return Math.round(attendanceWeight + homeworkWeight + finalWeight);
}

function getJqueryCoursePercent(skillMarkOf100, attendanceMarkOf100 = 100) {
  const skills = ((skillMarkOf100 / 100) * (2 / 3) * 100);
  const attendance = ((attendanceMarkOf100 / 100) * (1 / 3) * 100);

  return Math.round(skills + attendance);
}

function getSkillPercent(homeworkMarks) {
  let earned = 0;
  let total = 0;

  homeworkMarks.forEach((assignmentMark) => {
    earned += assignmentMark[0];
    total += assignmentMark[1];
  });


  const skillMarkOf100 = Math.round((earned / total) * 100);
  return skillMarkOf100;
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getApiCoursePercent,
    getJqueryCoursePercent,
    getSkillPercent,
  };
}
