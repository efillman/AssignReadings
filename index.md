<html>

<head>
  <meta charset="utf-8">
  <title>Term B Reading Gonkulator</title>
  <style>
    th,
    td,
    p,
    input {
      font: 12px Verdana;
    }

    table,
    th,
    td {
      border: solid 1px #DDD;
      border-collapse: collapse;
      padding: 2px 3px;
      text-align: left;
    }

    th {
      font-weight: bold;
    }
  </style>
  <script type="text/javascript" src="https://efillman.github.io/AssignReadings/AP1Data.js"></script>
  <script type="text/javascript" src="https://efillman.github.io/AssignReadings/IS1Data.js"></script>
  <script type="text/javascript" src="https://efillman.github.io/AssignReadings/AP2Data.js"></script>
  <script type="text/javascript" src="https://efillman.github.io/AssignReadings/IS2Data.js"></script>
  <script type="text/javascript" src="https://efillman.github.io/AssignReadings/JWData.js"></script>    
  <script type="text/javascript" src="https://efillman.github.io/AssignReadings/AssignReadings.js"></script>

</head>

<body>
  <h1>ACSC AY20 Readings Gonkulator</h1>
  <h6>By WAYST</h6>
  <p></p>
  <form action="#" method="post" class="peopleForm" id="peopleForm">
    <fieldset>
        <legend>Input Team Members First Names Comma Seperated</legend>

    <p>Input Team Members First Names Comma Seperated</p>
    <p>
        <input type="text" name="peopleInput" id="peopleInput" pattern="^([a-zA-Z0-9]+,?)+$" size="200" value="Joe,Bob,Alice" />
    </p>
    </fieldset>
</form>
<p></p>

  <form action="#" method="post" class="courseForm" id="courseForm">
    <fieldset>
        <legend>Select Course</legend>

    <p>Select Course:</p>
    <p>
        <label><input type="radio" name="course" value="AP1" checked />Air Power 1</label>
        <label><input type="radio" name="course" value="IS1" />International Security 1</label>
        <label><input type="radio" name="course" value="AP2" />Air Power 2</label>
        <label><input type="radio" name="course" value="IS2" />International Security 2</label>
        <label><input type="radio" name="course" value="JW" />Joint Warfighting</label>
    </p>
    </fieldset>
</form>
<p></p>
  <form action="#" method="post" class="sortForm" id="sortForm">
    <fieldset>
        <legend>Pick Assignment Type</legend>

    <p>Select a assignment method:</p>
    <p>
        <label><input type="radio" name="sort" value="oneperday" checked /> One Person Per Day</label>
        <label><input type="radio" name="sort" value="oneperreading" /> One Person Per Reading</label>
        <label><input type="radio" name="sort" value="twoperreading" /> Two People Per Reading</label>
        <label><input type="radio" name="sort" value="allperday" /> Use Everyone Each Day</label>
    </p>
    </fieldset>
</form>
<p></p>
  <p><input type="button" onclick="GenerateAssignments()" value="Generate Assignments" /> Copy and Paste this Table into an Excel for Distribution, it should import directly with paste</p>
  <p id="showData"></p>
</body>

<script>
  //test main
  function GenerateAssignments() {
    var courseTitle = "";
    var courseDays = "";
    var courseReadings = "";
    var coursePeople = "";
    var courseSelection = getRadioVal( document.getElementById('courseForm'), 'course' );
    var peopleInput = parseCommaInput( document.getElementById('peopleInput'));





    if (courseSelection === "AP1") {
      courseTitle = "Air Power 1";
      courseDays = AP1CourseDaysJSON;
      //coursePeople = peopleJSON;
      courseReadings = AP1ReadingsJSON;
    }

    if (courseSelection === "IS1") {
      courseTitle = "International Security 1";
      courseDays = IS1CourseDaysJSON;
      //coursePeople = peopleJSON;
      courseReadings = IS1ReadingsJSON;
    }

    if (courseSelection === "AP2") {
      courseTitle = "Air Power 2";
      courseDays = AP2CourseDaysJSON;
      //coursePeople = peopleJSON;
      courseReadings = AP2ReadingsJSON;
    }

    if (courseSelection === "IS2") {
      courseTitle = "International Security 2";
      courseDays = IS2CourseDaysJSON;
      //coursePeople = peopleJSON;
      courseReadings = IS2ReadingsJSON;
    }

    if (courseSelection === "JW") {
      courseTitle = "Joint Warfighting";
      courseDays = JWCourseDaysJSON;
      //coursePeople = peopleJSON;
      courseReadings = JWReadingsJSON;
    }

    const course1 = new Course(courseTitle);
    course1.loadCourseDays(JSON.stringify(courseDays));
    //course1.loadCoursePeople(JSON.stringify(coursePeople));
    course1.loadCoursePeopleInput(peopleInput);
    course1.loadCourseReadings(JSON.stringify(courseReadings));
    course1.sortReadings();

    var sortSelection = getRadioVal( document.getElementById('sortForm'), 'sort' );

    var random = false;
    var twoper = false;

    if (sortSelection === "oneperday") {
      course1.sortPeopleOnePerDay();
    }
    if (sortSelection === "oneperreading") {
      course1.sortPeopleOnePerReading();
    }
    if (sortSelection === "twoperreading") {
      course1.sortPeopleTwoPerReading();
      twoper = true;
    }
    if (sortSelection === "allperday") {
      course1.sortPeopleAllPerDay();
      random = true;
    }

    course1.assignReadings(random, twoper);
    course1.printTable();
  }
</script>

</html>
