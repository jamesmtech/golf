function getAvailableCourses() {
 return fetch('https://golf-courses-api.herokuapp.com/courses/').then(
   function (response) {
     return response.json();
   }
 );
}

getAvailableCourses();

let courseOptionsHtml = '';
courses.forEach((course) => {
 courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
});
document.getElementById('course-select').innerHTML = courseOptionsHtml;



let teeBoxSelectHtml = ''
teeBoxes.forEach(function (teeBox, index) {
   teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${
     teeBox.totalYards
   } yards</option>`
});
document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
