var divContainer = document.getElementById('container'); //initialize variable mapping with div#container
var divContent;//initialize variable mapping with div#content
var bodyDate;//initialize varable mapping with tag tbody#content-body
var inputDate;//initialize varable mapping with tag input#input-date
var months;//initialize varable mapping with tag select#months
var years;//initialize varable mapping with tag select#years
var dayOfWeeks;//initialize varable mapping with tag tr#day-of-weeks
var trDates; //define varable array contain element tr  date

var now = new Date(); //initalize variable get time now
var currentDate = now.getDate(); //initialize value current date
var currentMonth = now.getMonth(); //initialize value current month
var currentYear = now.getFullYear(); //initialize value curren year

const MAX_YEAR = currentYear + 50; //define constant varable MAX YEAR can show 
const MIN_YEAR = currentYear - 50; //define constant varable MIN YEAR can show

//define constant array varable contain months of the year
const ARR_MONTHS = [
    "Janurary",
    "Februray",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
//define constant array varable contain days of the week
var ARR_DAY_OF_WEEKS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Firday",
    "Saturday"
];

(function init() {
    initDivContent();
    initOptionMonth();
    initOptionYear();
    initDayOfWeeks();
    initDayOfMonth();
    inputDate.value = currentDate + "/" + (currentMonth + 1) + "/" + currentYear;
})();

function initDivContent() {
    var strContentHTML = "<div id='content' class='content'>"
                +   "<table class='show-date'>"
                +       "<thead>"
                +           "<tr class='controll'>"
                +               "<th><button type='button' onclick='prevYear()'>⇇</button></th>"
                +               "<th><button type='button' onclick='prevMonth()'>←</button></th>"
                +               "<th colspan='2'>"
                +                   "<select id='months' onchange='selectMonth()'></select>"
                +               "</th>"
                +               "<th>"
                +                   "<select id='years' onchange='selectYear()'></select>"
                +               "</th>"
                +               "<th><button type='button' onclick='nextMonth()'>→</button></th>"
                +               "<th><button type='button' onclick='nextYear()'>⇉</button></th>"
                +           "</tr>"
                +       "</thead>"
                +       "<tbody id='content-body'>"
                +           "<tr id='day-of-weeks' class='title'></tr>"
                +       "</tbody>"
                +   "</table>"
                +   "<div class='background' onclick='hideDate(event)'></div>"
                + "</div>";
    divContainer.innerHTML += strContentHTML;
    divContent = document.getElementById('content');
    bodyDate = document.getElementById('content-body');
    inputDate = document.getElementById('input-date');
    months = document.getElementById('months');
    years = document.getElementById('years');
    dayOfWeeks = document.getElementById('day-of-weeks');
}

/**
 * Add data to tag select#months with content in array ARR_MONTHS
 */
function initOptionMonth() {
    for (i = 0; i < ARR_MONTHS.length; i++) {
        months.innerHTML += "<option value='" + i + "'>" + ARR_MONTHS[i] + "</option>";
    }
    months.value = currentMonth;
}
/**
 * Add data to tag select#years with number year bigger than current year -50
 * and smaller than current year + 50
 */
function initOptionYear() {
    for (i = MIN_YEAR; i <= MAX_YEAR; i++) {
        years.innerHTML += "<option value='" + i + "'>" + i + "</option>";
    }
    years.value = currentYear;
}
/**
 * Add data tog tag tr#day-of-weeks with content in array ARR_DAY_OF_WEEKS
 */
function initDayOfWeeks() {
    for (i = 0; i < ARR_DAY_OF_WEEKS.length; i++) {
        dayOfWeeks.innerHTML += "<td>" + ARR_DAY_OF_WEEKS[i] + "</td>";
    }
}
/**
 * Add more content of table with day of current month and some day of prevent month
 * and the next month
 */
function initDayOfMonth() {
    var dayOfCurrentMonth; //define array day in current month
    var dayOfPrevMonth; //definde array day in prevent month
    var dayOfNextMounth; //definde array day in next month
    var countDay = 0; //initialize value index of day in array current month
    var countNextDay = 0; //initialize value index of day in array current next month

    dayOfCurrentMonth = getDaysOfMonth(currentYear, currentMonth);
    if (currentMonth === 0) {
        dayOfPrevMonth = getDaysOfMonth(currentYear - 1, 11);
    } else {
        dayOfPrevMonth = getDaysOfMonth(currentYear, currentMonth - 1);
    }
    dayOfPrevMonth.splice(0, dayOfPrevMonth.length - 6);

    if (currentMonth === 11) {
        dayOfNextMounth = getDaysOfMonth(currentYear + 1, 0);
    } else {
        dayOfNextMounth = getDaysOfMonth(currentYear, currentMonth + 1);
    }
    var listClassCss;
    for (tr = 0; tr < 6; tr++) {
        var dataColum = "";
        for (th = 0; th < ARR_DAY_OF_WEEKS.length; th++) {
            if (dayOfCurrentMonth[countDay] != undefined ||
                dayOfCurrentMonth[countDay] != null) {
                if (dayOfCurrentMonth[countDay].getDay() === th) {
                    var date = dayOfCurrentMonth[countDay];
                    listClassCss = "date-num";
                    if (date.getDate() === now.getDate() &&
                        date.getMonth() === now.getMonth() &&
                        date.getFullYear() === now.getFullYear()) {
                        listClassCss += " current-date";
                    }
                    dataColum += "<td class='" + listClassCss + "' onclick='selectDay(event," + date.getDate() + "," + date.getMonth() + "," + date.getFullYear() + ")'>" + dayOfCurrentMonth[countDay].getDate() + "</td>";
                    countDay++;
                } else {
                    dayOfPrevMonth.forEach(date => {
                        if (date.getDay() === th) {
                            dataColum += "<td class='date-num date-prev' onclick='selectDay(event," + date.getDate() + "," + date.getMonth() + "," + date.getFullYear() + ")'>" + date.getDate() + "</td>";
                            return;
                        }
                    });
                }
            } else {
                var date = dayOfNextMounth[countNextDay];
                dataColum += "<td class='date-num date-next' onclick='selectDay(event," + date.getDate() + "," + date.getMonth() + "," + date.getFullYear() + ")'>" + dayOfNextMounth[countNextDay].getDate() + "</td>";
                countNextDay++;
            }
        }
        bodyDate.innerHTML += "<tr>" + dataColum + "</tr>";
    }
    trDates = document.querySelectorAll('.date-num');
}
/**
 * Get list day of the input month and the input year
 * @param {Number} year 
 * @param {Number} month 
 */
function getDaysOfMonth(year, month) {
    var date = new Date(year, month);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}
/**
 * Show the input value with input day, input month, input year
 * and change class css for this
 * @param {Event} event 
 * @param {Number} day 
 * @param {Number} month 
 * @param {Number} year 
 */
function selectDay(event, day, month, year) {
    trDates.forEach(tr => {
        tr.classList.remove('active');
    });
    event.target.className += " active";
    var value = day + "/" + (month + 1) + "/" + year;
    inputDate.value = value;
}
/**
 * Change content of tag tbody when select value of tag select#months changed
 */
function selectMonth() {
    currentMonth = Number(months.value);
    initBodyTable();
}
/**
 * Change content of tag tbody when select value of tag select#years changed
 */
function selectYear() {
    currentYear = Number(years.value);
    initBodyTable();
}

function prevMonth() {
    if (currentMonth > 0) {
        currentMonth--;
        initBodyTable();
    } else {
        currentMonth = 11;
        prevYear();
    }
    months.value = currentMonth;
}

function nextMonth() {
    if (currentMonth < 11) {
        currentMonth++;
        initBodyTable();
    } else {
        currentMonth = 0;
        nextYear();
    }
    months.value = currentMonth;
}

function prevYear() {
    if (currentYear > MIN_YEAR) {
        currentYear--;
    } else {
        currentYear = MAX_YEAR;
    }
    years.value = currentYear;
    initBodyTable();
}

function nextYear() {
    if (currentYear < MAX_YEAR) {
        currentYear++;
    } else {
        currentYear = MIN_YEAR;
    }
    years.value = currentYear;

    initBodyTable();
}
/**
 * Create content of taag tbody
 */
function initBodyTable() {
    bodyDate.innerHTML = "<tr id='dayOfWeeks' class='title'></tr>";
    dayOfWeeks = document.getElementById('dayOfWeeks');
    initDayOfWeeks();
    initDayOfMonth();
}

function showDate() {
    divContent.style.display = "block";
}

function hideDate(e) {
    divContent.style.display = "none";
}