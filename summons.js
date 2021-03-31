document.getElementById("course-select").addEventListener('change', (event) => {
  const courseId = event.target.value;
getCourseInfo(courseId).then(course => {
  displayCourse(course)
})
})


async function getAvailableCourses() {
 return fetch('https://golf-courses-api.herokuapp.com/courses/').then(
   function (response) {
     let data =response.json()
     return data;
   }
 );
}
async function getCourseInfo(courseId) {
return fetch('https://golf-courses-api.herokuapp.com/courses/' +courseId).then(
   response => response.json()
 );
}
getAvailableCourses().then(data=>{

  const courseSelect = document.getElementById("course-select")
  console.log(data)

  data.courses.forEach(function(value){
    courseSelect.innerHTML+= `<option value="${value.id}">${value.name}</option>`
  })

});

function displayCourse (course) {
    
     console.log(course);
     document.getElementById("yardage1").innerHTML=course.courseId;
    //  document.getElementById("yardage1").innerHTML=course.data.holes[0].teeBoxes[0].yards;
   }



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

