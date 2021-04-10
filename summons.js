let courseInfoPromise;

document.getElementById("course-select").addEventListener("change", (event) => {
  const courseId = event.target.value;
  courseInfoPromise = getCourseInfo(courseId);
  courseInfoPromise.then((course) => {
    teeSelect(course);
    displayCourse(course, course.data.holes[0].teeBoxes[0].teeTypeId);
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
  // yrdg
  document.getElementById(
    "yardage gTotal"
  ).innerHTML = course.data.holes.reduce((total, hole) => {
    return hole.teeBoxes[teeId].yards + total;
  }, 0);
  document.getElementById(
    "yardage outTotal"
  ).innerHTML = course.data.holes.reduce((total, hole) => {
    if (hole.hole < 10) {
      return hole.teeBoxes[teeId].yards + total;
    } else {
      return total;
    }
  }, 0);
  document.getElementById(
    "yardage inTotal"
  ).innerHTML = course.data.holes.reduce((total, hole) => {
    if (hole.hole > 9) {
      return hole.teeBoxes[teeId].yards + total;
    } else {
      return total;
    }
  }, 0);

  // par
  document.getElementById("par gTotal").innerHTML = course.data.holes.reduce(
    (total, hole) => {
      return hole.teeBoxes[teeId].par + total;
    },
    0
  );
  document.getElementById("par outTotal").innerHTML = course.data.holes.reduce(
    (total, hole) => {
      if (hole.hole < 10) {
        return hole.teeBoxes[teeId].par + total;
      } else {
        return total;
      }
    },
    0
  );
  document.getElementById("par inTotal").innerHTML = course.data.holes.reduce(
    (total, hole) => {
      if (hole.hole > 9) {
        return hole.teeBoxes[teeId].par + total;
      } else {
        return total;
      }
    },
    0
  );

  let total = 0;
  let inTotal = 0;
  let out = 0;
  for (let i = 1; i <= 9; i++) {
    let score = document.getElementById(`p1${i}`).value
      ? document.getElementById(`p1${i}`).value
      : 0;
    total += score;
    if (i < 10) {
      out += score;
    } else {
      inTotal += score;
    }
  }
  document.getElementById("p1 gTotal").innerHTML = total;
}

// line 89 properly gets the value of p input console log
// line 99 check proper spot
// document.getElementById("p19")
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
