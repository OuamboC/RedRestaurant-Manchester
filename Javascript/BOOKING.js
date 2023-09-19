//Client-side Javascript : Here the code validate the form validation and submitting the form data to the server.
function validateForm() {
    //Declare variables to retrieve the value of the diff label in the booking system
    var name = document.getElementById("Name").value;
    var email = document.getElementById("Email").value;
    var date = document.getElementById("Date").value;
    var time = document.getElementById("Time-of-bookings").value;
    var partySize = document.getElementById("Number-of-customers").value;

    // Condition: if all labels is not field ,alert the errors and return false
    if (name === ""|| email === "" || date === "" || time === "" || partySize === "") {
        alert("All fields are required.");
        return false;
    }

    // Email Format Validation
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Date and Time Validation
    var selectedDate = new Date(date + " " + time); // // this var is a Date obj representing the selected date and time
    var currentDate = new Date();
   
    
    if (selectedDate <= currentDate  ){
        alert("Please select a date and time in the future.");
        return false;
    }

    // Send a POST request to the server using the fetch API 
    fetch('http://localhost:3000/api/bookings', {
        method: 'POST',  // Use the POST HTTP method to send data to the server.
        headers: {
            'Content-Type': 'application/json',  // Set the content type to JSON
        },
        body: JSON.stringify({
            name,
            email,
            date,
            time,
            partySize,
        }),
    })
        .then((response) => {
            if (response.ok) {
           
                // Successful booking
                alert('Booking successful!'); // Display a success alert
                
            } else {
                // If the server responds with an error status, it means there was a problem with the booking.
                alert('Booking failed. Please try again later.'); // Display an error alert
            }
        })
        .catch((error) => {
            // If an error occurs during the HTTP request (e.g: network issues),
           // catch it and display a generic error message to the user.
            console.error('Error:', error);
            alert('An error occurred. Please try again later.'); // Display a generic error alert
        });

    // Prevent the form from submitting via its default behavior.
    return false;
}

