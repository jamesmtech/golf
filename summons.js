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
for (let j = 1; j <= 18; j++) {
  document.getElementById(`p1${j}`).addEventListener("change", playerTotal1);
  document.getElementById(`p2${j}`).addEventListener("change", playerTotal2);
  document.getElementById(`p3${j}`).addEventListener("change", playerTotal3);
  document.getElementById(`p4${j}`).addEventListener("change", playerTotal4);
}

const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const name3 = document.getElementById("name3");
const name4 = document.getElementById("name4");
const tion = document.querySelector(".tName1");
const tion2 = document.querySelector(".tName2");
const tion3 = document.querySelector(".tName3");
const tion4 = document.querySelector(".tName4");
const tion5 = document.querySelector(".tName5");
const tion6 = document.querySelector(".tName6");
const tion7 = document.querySelector(".tName7");
const tion8 = document.querySelector(".tName8");
const wrap = document.querySelector(".wrapper");

document.getElementById("nameBtn").addEventListener("click", () => {
  if (
    name1.value == name2.value ||
    name1.value == name3.value ||
    name1.value == name4.value ||
    name2.value == name3.value ||
    name2.value == name4.value ||
    name3.value == name4.value
  ) {
    alert("You cannot be two people!");
    return false;
  }

  tion.innerText = name1.value;
  tion2.innerText = name2.value;
  tion3.innerText = name3.value;
  tion4.innerText = name4.value;
  tion5.innerText = name1.value;
  tion6.innerText = name2.value;
  tion7.innerText = name3.value;
  tion8.innerText = name4.value;

  wrap.style.display = "none";
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
}

function playerTotal1() {
  let total = 0;
  let inTotal = 0;
  let out = 0;
  for (let i = 1; i <= 18; i++) {
    let score = document.getElementById(`p1${i}`).value
      ? parseInt(document.getElementById(`p1${i}`).value)
      : 0;
    total += score;
    if (i < 10) {
      out += score;
    } else {
      inTotal += score;
    }
  }
  document.getElementById("p1 gTotal").innerText = total;
  document.getElementById("p1 outTotal").innerText = out;
  document.getElementById("p1 inTotal").innerText = inTotal;
}

function playerTotal2() {
  let total = 0;
  let inTotal = 0;
  let out = 0;
  for (let i = 1; i <= 18; i++) {
    let score = document.getElementById(`p2${i}`).value
      ? parseInt(document.getElementById(`p2${i}`).value)
      : 0;
    total += score;
    if (i < 10) {
      out += score;
    } else {
      inTotal += score;
    }
  }
  document.getElementById("p2 gTotal").innerText = total;
  document.getElementById("p2 outTotal").innerText = out;
  document.getElementById("p2 inTotal").innerText = inTotal;
}

function playerTotal3() {
  let total = 0;
  let inTotal = 0;
  let out = 0;
  for (let i = 1; i <= 18; i++) {
    let score = document.getElementById(`p3${i}`).value
      ? parseInt(document.getElementById(`p3${i}`).value)
      : 0;
    total += score;
    if (i < 10) {
      out += score;
    } else {
      inTotal += score;
    }
  }
  document.getElementById("p3 gTotal").innerText = total;
  document.getElementById("p3 outTotal").innerText = out;
  document.getElementById("p3 inTotal").innerText = inTotal;
}

function playerTotal4() {
  let total = 0;
  let inTotal = 0;
  let out = 0;
  for (let i = 1; i <= 18; i++) {
    let score = document.getElementById(`p4${i}`).value
      ? parseInt(document.getElementById(`p4${i}`).value)
      : 0;
    total += score;
    if (i < 10) {
      out += score;
    } else {
      inTotal += score;
    }
  }
  document.getElementById("p4 gTotal").innerText = total;
  document.getElementById("p4 outTotal").innerText = out;
  document.getElementById("p4 inTotal").innerText = inTotal;
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
