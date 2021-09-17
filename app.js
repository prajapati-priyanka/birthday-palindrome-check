var inputDate = document.querySelector("#bday-input");
var checkBtn = document.querySelector("#check-btn");
var outputEl = document.querySelector("#output");
var loader = document.querySelector("#loader");

function reverseStr(str) {
  var listOfChars = str.split("");
  var reverseListOfChars = listOfChars.reverse();
  var reversedStr = reverseListOfChars.join("");
  return reversedStr;
}

function convertDateToString(date) {
  var dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDatesFormat(date) {
  var dateStr = convertDateToString(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function isPalindrome(str) {
  var reverse = reverseStr(str);
  if (str === reverse) {
    return true;
  }
  return false;
}

function checkPalindromeforAllFormats(date) {
  var listOfPalindromes = getAllDatesFormat(date);
  var isAnyDateFormatPalindrome = false;
  for (var i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      isAnyDateFormatPalindrome = true;
      break;
    }
  }
  return isAnyDateFormatPalindrome;
}
function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  } else if (year % 100 === 0) {
    return false;
  } else if (year % 4 === 0) {
    return true;
  } else {
    return false;
  }
}

function getNextDate(date) {
  var day = date.day + 1;

  var month = date.month;
  var year = date.year;

  var listOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    // check for leap year
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = month + 1;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = month + 1;
      }
    }
  } else {
    if (day > listOfMonths[month - 1]) {
      day = 1;
      month = month + 1;
    }
  }
  if (month > 12) {
    month = 1;
    year = year + 1;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var counterNext = 0;
  var nextDate = getNextDate(date);

  while (1) {
    counterNext = counterNext + 1;

    var isPalindrome = checkPalindromeforAllFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [counterNext, nextDate];
}

function getPreviousDate(date) {
    var day = date.day - 1;
  
    var month = date.month;
    var year = date.year;
  
    var listOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 3) {
      if (isLeapYear(year)) {
        if (day < 1) {
          day = 29;
          month = month - 1;
        }
      } else {
        if (day < 1) {
          day = 28;
          month = month - 1;
        }
      }
    }
  
    if (month === 1) {
      if (day < 1) {
        day = 31;
        month = 12;
        year = year - 1;
      }
    } else {
      if (day < 1) {
        day = listOfMonths[month - 1];
        month = month - 1;
      }
    }
  
    return {
      day: day,
      month: month,
      year: year,
    };
  }
  
  function getPreviousPalindromeDate(date) {
    var counterPrevious = 0;
    var previousDate = getPreviousDate(date);
  
    while (1) {
      counterPrevious = counterPrevious + 1;
  
      var isPalindrome = checkPalindromeforAllFormats(previousDate);
      if (isPalindrome) {
        break;
      }
      previousDate = getPreviousDate(previousDate);
    }
    return [counterPrevious, previousDate];
  }





function clickHandler() {
   showLoader();
   hideOutput();
  setTimeout(() => {
    var bdayStr = inputDate.value;

    if (bdayStr !== "") {
      var listOfDate = bdayStr.split("-");

      var date = {
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0]),
      };
      var isPalindrome = checkPalindromeforAllFormats(date);

      if (isPalindrome) {
        hideLoader();
       
        showOutput("Yayy!! Your Birthday Is A Palindrome.🥳");
       
      } else {
        var [counterNext, nextDate] = getNextPalindromeDate(date);
        var [counterPrevious, previousDate] = getPreviousPalindromeDate(date);
        if( counterNext > counterPrevious){

            hideLoader();
         
            showOutput(`Oops!! Your Birthday is not a Palindrome. The previous palindrome date is ${previousDate.day}-${
                previousDate.month
              }-${previousDate.year}, you missed it by ${counterPrevious} ${
                counterPrevious === 1 ? "day" : "days"
              } 😔`);
          }else{
           hideLoader();
           
            showOutput(
                `Oops!! Your Birthday  is not a Palindrome. The next palindrome date is ${nextDate.day}-${
                   nextDate.month
                 }-${nextDate.year}, you missed it by ${counterNext} ${
                   counterNext === 1 ? "day" : "days"
                 } 😔`);
          }


        }
        
       
    } else {
      
      showOutput("Hey, You Missed To Enter A Date");
    }
    hideLoader();
  }, 4000);
}

function showLoader(){
    loader.style.display = "block";
}

function hideLoader(){
    loader.style.display = "none";

}
function showOutput(message){
    outputEl.style.display = "block";
    outputEl.innerText = message;

}
function hideOutput(){
    outputEl.style.display = "none";

}

checkBtn.addEventListener("click", clickHandler);
