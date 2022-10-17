const add = document.getElementById("add");
const courseCode = document.getElementById("course-code");
const courseUnit = document.getElementById("course-unit");
const grade = document.getElementById("grade");
const tbody = document.getElementById("tbody");
const tfoot = document.getElementById("tfoot")
const table = document.getElementById("table");
const calcGP = document.getElementById("calc-gp");
const clear = document.getElementById("clear");
var gpArray = [];
var heading = document.querySelector('h1')

add.addEventListener("click", () => {
  if (
    courseCode.value === "" ||
    courseUnit.value <= 0 ||
    grade.selectedIndex === 0
  ) {
    alert("You haven't given any input");
  } else {
    const tbr = document.createElement("tr");

    const tdCourseCode = document.createElement("td");
    tdCourseCode.innerHTML = courseCode.value;

    const tdCourseUnit = document.createElement("td");
    tdCourseUnit.innerHTML = courseUnit.value;

    const tdGrade = document.createElement("td");
    tdGrade.innerHTML = grade.options[grade.selectedIndex].text;

    tbr.appendChild(tdCourseCode);
    tbr.appendChild(tdCourseUnit);
    tbr.appendChild(tdGrade);
    tbody.appendChild(tbr);
    table.classList.remove("display");
    calcGP.classList.remove("display");
    clear.classList.remove("display");
    gpArray.push({
      'courseUnit': courseUnit.value,
      'grade': grade.options[grade.selectedIndex].value,
    });
    courseCode.value = "";
    courseUnit.value = "";
    grade.selectedIndex = "";
  }
});

calcGP.addEventListener( "click", () => {
    var courseUnits = 0; 
    var unitLoadsAndGrades = 0;
    var sumOfunitLoadsAndGrades = 0; 

    gpArray.forEach(result => {
        courseUnits += parseInt(result.courseUnit);
        unitLoadsAndGrades = parseInt(result.courseUnit) * parseInt(result.grade);
        sumOfunitLoadsAndGrades += unitLoadsAndGrades;
    });
    const tr = document.createElement("tr");

    tdTotalUnitLoad = document.createElement("td");
    tdTotalUnitLoad.innerHTML = `Your total Course Unit is ${courseUnits}`;

    tdGpa = document.createElement("td");
    tdGpa.setAttribute("colspan", "2");
    var gpa = sumOfunitLoadsAndGrades / courseUnits;
    tdGpa.innerHTML = `Your GPA is ${(gpa).toFixed(2)} `;

    if (gpa >= 0.00 && gpa <= 1.49) {
            heading.textContent = "Agba, I no sure say you fit graduate oo";
    }
    else if (gpa >= 1.50 && gpa <= 2.48) {
            heading.textContent = "Omo, You dey third class oo agba";
    } else if (gpa >= 2.49 && gpa <= 3.49) {
            heading.textContent = "You have a Second Class Lower";
    } else if (gpa >= 3.5 && gpa <= 4.49) {
        heading.textContent =
            "Congratulations 🍻, You have a Second Class Upper";
    } else if (gpa >= 4.5) {
        heading.textContent =
            "Congratulations 🍻, You have a First Class. Agba Scholar🙌";
    }

    tr.appendChild(tdTotalUnitLoad);
    tr.appendChild(tdGpa);
    if (tfoot.querySelector("tr") !== null) {
        tfoot.querySelector("tr").remove();
    }
    tfoot.appendChild(tr);

    
});

clear.addEventListener("click", () => {
    gpArray = [];
    tbody.querySelectorAll("*").forEach((child) => child.remove());
    if (tfoot.querySelector("tr") !== null) {
        tfoot.querySelector("tr").remove();
    }

    table.classList.add("display");
    calcGP.classList.add("display");
    clear.classList.add("display");
    heading.textContent = "GPA Calculator";
});

