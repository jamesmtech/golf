let courseInfoPromise;

document.getElementById("course-select").addEventListener("change", (event) => {
  const courseId = event.target.value;
  courseInfoPromise = getCourseInfo(courseId);
  courseInfoPromise.then((course) => {
    teeSelect(course);
  });
});

document.getElementById("tee-select").addEventListener("change", (event) => {
  const teeId = event.target.value;
  courseInfoPromise.then((course) => {
    displayCourse(course, teeId);
  });
});

async function getAvailableCourses() {
  return fetch("https://golf-courses-api.herokuapp.com/courses/").then(
    function (response) {
      let data = response.json();
      return data;
    }
  );
}
async function getCourseInfo(courseId) {
  return fetch(
    "https://golf-courses-api.herokuapp.com/courses/" + courseId
  ).then((response) => response.json());
}
getAvailableCourses().then((data) => {
  const courseSelect = document.getElementById("course-select");
  console.log(data);

  data.courses.forEach(function (value) {
    courseSelect.innerHTML += `<option value="${value.id}">${value.name}</option>`;
  });
});

function teeSelect(course) {
  const TeeSelect = document.getElementById("tee-select");
  console.log(course);

  course.data.holes[0].teeBoxes.forEach(function (value) {
    TeeSelect.innerHTML += `<option value="${value.teeTypeId}">${value.teeType}</option>`;
  });
}

function displayCourse(course, teeId) {
  console.log(course);

  course.data.holes.forEach((hole) => {
    console.log(hole);
    document.getElementById(`yardage${hole.hole}`).innerHTML =
      hole.teeBoxes[teeId].yards;
    document.getElementById(`par${hole.hole}`).innerHTML =
      hole.teeBoxes[teeId].par;
    document.getElementById(`handicap${hole.hole}`).innerHTML =
      hole.teeBoxes[teeId].hcp;
  });
}

// let outYards = 0
// let inYards = 0
// for ( ) {
// if (i<9)
// outYards += hole[i]+[]yards
// if i > 9
// inYards
// }

// let courseOptionsHtml = '';
// courses.forEach((course) => {
//  courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
// });
// document.getElementById('course-select').innerHTML = courseOptionsHtml;

// let teeBoxSelectHtml = ''
// teeBoxes.forEach(function (teeBox, index) {
//    teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${
//      teeBox.totalYards
//    } yards</option>`
// });
// document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
