const currentDate = document.querySelector(".current-date"),
daysTag = document.querySelector(".days"),
selectedDate = document.querySelector(".selected-date"),
prevNextIcon = document.querySelectorAll(".icons .chevron");

// getting new date, current year and month.
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

console.log(date, currYear, currMonth);

const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
];

const renderCalendar = () => {
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(), // getting the first day of the month.
    lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting the last date of the month.
    lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(), // getting the last day of the month.
    lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting the last date of the previous month.
    // console.log(lastDateOfMonth);

    let liTag = '';

    for (let i=firstDayOfMonth; i > 0; i--) { // creating li of previous month's last days.
        // console.log(i);
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`; // Append the li's.

    }

    for (let i=1; i <= lastDateOfMonth; i++) { // creating li of all days of current month.
        // console.log(i);
        let isToday = i === date.getDate() &&
        currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? 'active': '';
        liTag += `<li class="${isToday}">${i}</li>`; // Append the li's.

    }

    for (let i=lastDayOfMonth; i < 6; i++) { // creating li of next month first days.
        // console.log(i);
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`; // Append the li's.

    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag; // Place the li's in the daysTag.

    // Select all days li.
    let daysLi = document.querySelectorAll(".days li");


    // console.log(daysLi.length);
    // let activeDate = `${currMonth + 1}-${date.getDate()}-${currYear}`;

    // console.log(activeDate);

    // Loop through each day li.
    daysLi.forEach(day => {
        // day.setAttribute('class', 'inactive');
        //console.log(day.getAttribute('class'));
        if (day.getAttribute('class') === 'active') {
            // convert single digit days and months to have a zero in front of it.
            if (currMonth.toString().length <= 1) {
                var newMonth = `0${currMonth + 1}`

            } else {
                var newMonth = `${currMonth + 1}`
            };

            if (day.innerText.toString().length <= 1) {
                var newDay = `0${day.innerText}`

            } else {
                var newDay = `${day.innerText}`
            };

            // Build date and mark as active date.
            let activeDate = `${newMonth}-${newDay}-${currYear}`;

            // let activeDate = `${currMonth + 1}-${day.innerText}-${currYear}`;

            // We need to show that the
            selectedDate.innerText = activeDate;
        };

        // Search for the clicked li and switch it to active.
        // Add an event listener to it. (A click event).
        day.addEventListener('click', (event) => {
            // Search for the active li and switch it to "".
            // Loop through each day li.
            daysLi.forEach(selectedDay => {
                if (selectedDay.getAttribute('class') === 'active') {
                    // Reassign the current day.
                    selectedDay.setAttribute('class', ' ');
                    // console.log(selectedDay);
                };
            });

            // If the day is not inactive, then we can do something with it.
            // If it is inactive, we do nothing.
            if (day.getAttribute('class') !== 'inactive') {
                // set the attribute of day to active.
                day.setAttribute('class', 'active');

                // console.log(day.innerText);
                // convert single digit days and months to have a zero in front of it.
                if (currMonth.toString().length <= 1) {
                    var newMonth = `0${currMonth + 1}`

                } else {
                    var newMonth = `${currMonth + 1}`
                };

                if (day.innerText.toString().length <= 1) {
                    var newDay = `0${day.innerText}`

                } else {
                    var newDay = `${day.innerText}`
                };

                // Build date and mark as active date.
                activeDate = `${newMonth}-${newDay}-${currYear}`;

                // Build date and mark as active date.
                // activeDate = `${currMonth + 1}-${day.innerText}-${currYear}`;

                // console.log(activeDate);

                // Reassign selectedDate.
                selectedDate.innerText = activeDate;
            };
        });

        // console.log(day.innerText);
    });



    // console.log(daysLi);

}

renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener('click', () => { // Add click event on both icons.
        // console.log(icon);
        // If the icon clicked is the previous, then decrement the current month by one else increment by 1.
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        console.log(currMonth)
        // Show next year or previous year if current year ends.
        if (currMonth < 0 || currMonth > 11) {
            // Create a new date of current year and month and pass it as date value.
            date = new Date(currYear, currMonth);

            // console.log(date.getFullYear())
            // console.log(date.getMonth())
            currYear = date.getFullYear(); // updating the current year with the new date year.
            currMonth = date.getMonth(); // Updating the current month with the new date month.

        } else {
            date = new Date(); // Pass new Date as date value.
        }

        // Render the calendar with the new month.
        renderCalendar();
    });
});

// Get the modal.
const modal = document.querySelector(".modal"),
modalClose = document.querySelector(".close"),
modalButton = document.querySelector(".modal-button");

// Add a listener to the current date.
currentDate.addEventListener('click', () => {
    // If current date is clicked, a modal should be displayed for user to input the date. Modal should be specific.
    // 2 digits for day and month and 4 digits for year. If the selected is not a date, then we default to today's date.
    // alert(currentDate.innerText);

    // Show the modal.
    modal.style.display = "block";
});

modalClose.addEventListener('click', () => {
    // If current date is clicked, a modal should be displayed for user to input the date. Modal should be specific.
    // 2 digits for day and month and 4 digits for year. If the selected is not a date, then we default to today's date.
    // alert(currentDate.innerText);

    // Show the modal.
    modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  };
};

// Returns false if an input is negative.
function negativeInput(collectedData) {
    if (parseInt(collectedData) < 0) {
        return false;
    };
};

// Check if the input is an integer and not a decimal.
// Check and don't care about the type as the collectedData could be a string.
function checkInteger(collectedData) {
    if (parseInt(collectedData) != collectedData) {
        return false;
    };
};

// If modal button is clicked, get the input data and use.
modalButton.addEventListener('click', (event) => {
    // First we prevent the default function of the button.
    event.preventDefault();

    // Next we get the values of the input.
    const modalDay = document.querySelector(".modal-day-input"),
    modalMonth = document.querySelector(".modal-month-input"),
    modalYear = document.querySelector(".modal-year-input");

    // Print them out.
    console.log(modalDay.value);
    console.log(modalMonth.value);
    console.log(modalYear.value);

    // Create a new date of current year and month and pass it as date value.
    date = new Date(modalYear.value, `${modalMonth.value - 1}`);

    // console.log(date.toString());

    // If date is not invalid, move on else do nothing or display invalid date in modal header alert.
    if (date.toString() !== 'Invalid Date' && negativeInput(modalDay.value) !== false &&
        negativeInput(modalMonth.value) !== false && negativeInput(modalYear.value) !== false &&
        checkInteger(modalDay.value) !== false && checkInteger(modalMonth.value) !== false &&
        checkInteger(modalYear.value) !== false &&
        31 >= modalDay.value > 0 && 12 >= modalMonth.value > 0 && modalYear.value > 1799) {
        // close the modal
        modal.style.display = "none";
        // console.log(date.toString());

        // console.log(date.getFullYear())
        // console.log(date.getMonth())
        currYear = date.getFullYear(); // updating the current year with the new date year.
        currMonth = date.getMonth(); // Updating the current month with the new date month.

        // Render the calendar with the new month.
        renderCalendar();

        // We now have to get all the rendered data and make active the date.
        // Select all days li.
        let daysLi = document.querySelectorAll(".days li");

        // Loop through each day li.
        daysLi.forEach(day => {
            // if the day is equal to the day, we activate it.
            // Ensure that the day is not marked inactive. If inactive, we don't go to it in the first place.
            if (day.innerText === modalDay.value && day.getAttribute('class') !== 'inactive') {
                day.setAttribute('class', 'active')
            }
        });

        // convert single digit days and months to have a zero in front of it.
        if (currMonth.toString().length <= 1) {
            var newMonth = `0${currMonth + 1}`

        } else {
            var newMonth = `${currMonth + 1}`
        };

        if (modalDay.value.toString().length <= 1) {
            var newDay = `0${modalDay.value}`

        } else {
            var newDay = `${modalDay.value}`
        };

        // Build date and mark as active date.
        activeDate = `${newMonth}-${newDay}-${currYear}`;
        // console.log(activeDate);

        // Reassign selectedDate.
        selectedDate.innerText = activeDate;

    } else {
        // alert('Please correct the date you just input. It is not a date!!!!');
        const modalErrorAlert = document.querySelector(".modal-error-alert");
        modalErrorAlert.style.display = "block";
    };
});
