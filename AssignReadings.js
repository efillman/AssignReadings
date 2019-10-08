//Course Object
function Course(courseTitle) {
  this.courseTitle = courseTitle;
  this.courseDays = [];
  this.courseReadings = []; //each course has one set of readings
  this.coursePeople = []; //each course has one set of people
}

//load course people based off of course people json
Course.prototype.loadCoursePeople = function(coursePeopleJSON) {
  var people = JSON.parse(coursePeopleJSON);
  for (var i = 0; i < people.length; i++) {
    this.coursePeople.push(new Person(people[i].first, people[i].last, people[i].skill));
  }
}

//load course people based off of course people json
Course.prototype.loadCoursePeopleInput = function(peopleInput) {
  for (var i = 0; i < peopleInput.length; i++) {
    this.coursePeople.push(new Person(peopleInput[i], "Person", "1"));
  }
}

//load course days based off of course days json
Course.prototype.loadCourseDays = function(courseDaysJSON) {
  var days = JSON.parse(courseDaysJSON);
  for (var i = 0; i < days.length; i++) {
    this.courseDays.push(new CourseDay(days[i].courseDayTitle, days[i].courseDayDate));
  }
}

//load readings based off of readings JSON
Course.prototype.loadCourseReadings = function(courseReadingsJSON) {
  var readings = JSON.parse(courseReadingsJSON);
  for (var i = 0; i < readings.length; i++) {
    this.courseReadings.push(new Reading(readings[i].readingDate, readings[i].readingAuthors, readings[i].readingTitle, readings[i].readingPages));
  }
}

//move readings to course days via date match
Course.prototype.sortReadings = function() {
  //check to make sure there are coursedays and coursereadings
  if (this.courseDays.length > 0 && this.courseReadings.length > 0) {
    for (var i = 0; i < this.courseDays.length; i++) {
      for (var j = 0; j < this.courseReadings.length; j++) {
        if (this.courseDays[i].courseDayDate == this.courseReadings[j].readingDate) {
          this.courseDays[i].courseDayReadings.push(this.courseReadings[j]);
          //TODO remove reading from original place array?
        }
      }
    }
  } else {
    return console.log(this.courseTitle + ": there were no course days or course readings");
  }
}

//add people to each course day
Course.prototype.sortPeopleAllPerDay = function() {
  if (this.courseDays.length > 0 && this.coursePeople.length > 0) {
    for (var i = 0; i < this.courseDays.length; i++) {
      for (var j = 0; j < this.coursePeople.length; j++) {
        this.courseDays[i].courseDayPeople.push(this.coursePeople[j]);
      }
    }
  } else {
    return console.log(this.courseTitle + ": there no people or days loaded");
  }
}

//function to allocate two people per readings
Course.prototype.sortPeopleTwoPerReading = function() {
  this.coursePeople.sort(function(a, b) {
    return 0.5 - Math.random()
  });
  if (this.courseDays.length > 0 && this.coursePeople.length > 0) {
    var l = 0;
    for (var i = 0; i < this.courseDays.length; i++) {
      var j = this.coursePeople.length;
      for (var k = 0; k < this.courseDays[i].courseDayReadings.length; k++) {
        this.courseDays[i].courseDayPeople.push(this.coursePeople[l % j]);
        l++;
        this.courseDays[i].courseDayPeople.push(this.coursePeople[l % j]);
        l++;
      }
      }
    }
   else {
    return console.log(this.courseTitle + ": there no people or days loaded");
  }
}

//function to allocate one person per reading
Course.prototype.sortPeopleOnePerReading = function() {
  this.coursePeople.sort(function(a, b) {
    return 0.5 - Math.random()
  });
  if (this.courseDays.length > 0 && this.coursePeople.length > 0) {
    var l = 0;
    for (var i = 0; i < this.courseDays.length; i++) {
      var j = this.coursePeople.length;
      for (var k = 0; k < this.courseDays[i].courseDayReadings.length; k++) {
        this.courseDays[i].courseDayPeople.push(this.coursePeople[l % j]);
        l++;
      }
      }
    }
   else {
    return console.log(this.courseTitle + ": there no people or days loaded");
  }
}


//function to allocate one person per day
Course.prototype.sortPeopleOnePerDay = function() {
  this.coursePeople.sort(function(a, b) {
    return 0.5 - Math.random()
  });
  if (this.courseDays.length > 0 && this.coursePeople.length > 0) {
    for (var i = 0; i < this.courseDays.length; i++) {
      var j = this.coursePeople.length;
      for (var k = 0; k < this.courseDays[i].courseDayReadings.length; k++) {
        this.courseDays[i].courseDayPeople.push(this.coursePeople[i % j]);
      }
      }
    }
   else {
    return console.log(this.courseTitle + ": there no people or days loaded");
  }
}

//run create assignments for each course day
Course.prototype.assignReadings = function() {
  for (var i = 0; i < this.courseDays.length; i++) {
    this.courseDays[i].createAssignments();
  }
}

//print html table of data
Course.prototype.printTable = function() {

  var table = document.createElement("table");
  var tr = table.insertRow(-1);
  var col = ["CourseDay", "Date", "People", "Author", "Title", "Pages"];

  //create headers
  for (var i = 0; i < col.length; i++) {
    var th = document.createElement("th");
    th.innerHTML = col[i];
    tr.appendChild(th);
  }

  //create table content
  for (var i = 0; i < this.courseDays.length; i++) {
    for (var j = 0; j < this.courseDays[i].courseDayAssignments.length; j++) {
      //add row
      var tr = table.insertRow(-1);

      //add cells to row
      var tabCellCourseDay = tr.insertCell(-1);
      tabCellCourseDay.innerHTML = this.courseDays[i].courseDayTitle;
      var tabCellDate = tr.insertCell(-1);
      tabCellDate.innerHTML = this.courseDays[i].courseDayAssignments[j].assignmentDate;
      var tabCellNames = tr.insertCell(-1);
      tabCellNames.innerHTML = this.courseDays[i].courseDayAssignments[j].assignmentPeople;
      var tabCellReadingAuthor = tr.insertCell(-1);
      tabCellReadingAuthor.innerHTML = this.courseDays[i].courseDayAssignments[j].assignmentReading.printAuthors();
      var tabCellReadingTitle = tr.insertCell(-1);
      tabCellReadingTitle.innerHTML = this.courseDays[i].courseDayAssignments[j].assignmentReading.printTitle();
      var tabCellReadingPages = tr.insertCell(-1);
      tabCellReadingPages.innerHTML = this.courseDays[i].courseDayAssignments[j].assignmentReading.printPages();
    }
  }

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  var divContainer = document.getElementById("showData");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);

}

//courseDay Object Type
function CourseDay(courseDayTitle, courseDayDate) {
  this.courseDayTitle = courseDayTitle;
  this.courseDayDate = courseDayDate;
  this.courseDayAssignments = []; //each assignment is one reading with many people
  this.courseDayReadings = [];
  this.courseDayPeople = [];
}

//assign people to readings with some type of logic
CourseDay.prototype.createAssignments = function() {
  if (this.courseDayReadings.length > 0 && this.courseDayPeople.length > 0) {

    //create assignments
    for (var i = 0; i < this.courseDayReadings.length; i++) {
      this.courseDayAssignments.push(new Assignment(this.courseDayDate, this.courseDayReadings[i]));
    }

    //sort and randomize people array
    this.courseDayPeople.sort(function(a, b) {
      return 0.5 - Math.random()
    });
    this.courseDayPeople.sort(function(a, b) {
      return a.skill - b.skill
    });
    this.courseDayPeople.reverse();

    //load people to assignments
    while (this.courseDayPeople.length > 0) {
      for (var j = 0; j < this.courseDayAssignments.length; j++) {
        if (this.courseDayPeople.length == 0) {
          break;
        }
        this.courseDayAssignments[j].assignmentPeople.push(this.courseDayPeople.pop());
      }
    }
    //randomize again
    for (var k = 0; k < this.courseDayAssignments.length; k++) {
      this.courseDayAssignments[k].assignmentPeople.sort(function(a, b) {
        return 0.5 - Math.random()
      });
    }

  } else {
    return console.log(this.courseDayTitle + ": there no people or readings loaded");
  }
}

//Assignment Object
function Assignment(assignmentDate, assignmentReading) {
  this.assignmentDate = assignmentDate;
  this.assignmentReading = assignmentReading;
  this.assignmentPeople = [];
}

//Reading Object
function Reading(readingDate, readingAuthors, readingTitle, readingPages) {
  this.readingDate = readingDate;
  this.readingAuthors = readingAuthors; //array of authors ['Valpiani, V','Connelly, J']
  this.readingTitle = readingTitle;
  this.readingPages = readingPages; //array of pages ['1-10','15-20']

  //this.readingTotalPages = function() { return (this.endPage - this.startPage + 1);};
}

//toString of Reading
Reading.prototype.toString = function readingToString() {
  return '' + this.readingAuthors + ', ' + this.readingTitle + ', ' + this.readingPages;
}

//Print just authors
Reading.prototype.printAuthors = function() {
  return '' + this.readingAuthors;
}

//Print just title
Reading.prototype.printTitle = function() {
  return '' + this.readingTitle;
}

//Print just pages
Reading.prototype.printPages = function() {
  return '' + this.readingPages;
}

//Person Object
function Person(first, last, skill) {
  this.name = {
    first: first,
    last: last
  };
  this.skill = skill;
  this.fullName = function() {
    return (this.name.first + ' ' + this.name.last);
  };
}

//toString of Person
Person.prototype.toString = function personToString() {
  return '' + this.name.first;
}

function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name];

    // loop through list of radio buttons
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val; // return value of checked radio or undefined if none checked
}

function parseCommaInput(name) {
  var input = name.value;
  var parsed = input.split(/[ ,]+/).filter(Boolean);
  return parsed;
}
