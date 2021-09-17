function reverseStr(str) {
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
}

function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse
}


function convertDateToStr(date) {
    var dateStr = { day: '', month: '', year: '' };
    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    }
    else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    }
    else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;

}

function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyy, mmddyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function checkPanlindromeForAllDateFormats(date) {
    var listOfPanlindormes = getAllDateFormats(date);
    var flag = false;

    for (var i = 0; i < listOfPanlindormes; i++) {
        if (isPalindrome(listOfPanlindormes[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

// check for leapyear
function isLeapyear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

// gets the next date
function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // check for feb
    if (month === 2) {
        //check for leapyear
        if (isLeapyear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        }
        else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }

    }
    else {
        // check if the day exceeds the days in the month
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    // increment for the year if month is greater than 12
    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };

}

function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while (1) {
        ctr++;
        var isPalindrome = checkPanlindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [ctr, nextDate];
}

var inputbd = document.querySelector('#input-birthday');
var btnCheck = document.querySelector('#check-btn');
var outputEl = document.querySelector('#output');

function clickHandler() {
    var bdayStr = inputbd.value;

    if (bdayStr !== '') {
        var listOfDate = bdayStr.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

        var isPalindrome = checkPanlindromeForAllDateFormats(date);

        if (isPalindrome) {
            outputEl.innerText = "your birthday is a palindrome!!..."
        }
        else {
            var [ctr, nextDate] = getNextPalindromeDate(date);
            
            outputEl.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate, year}, you missed it by ${ctr} days!.`
        }
    }
}


btnCheck.addEventListener("click", clickHandler);