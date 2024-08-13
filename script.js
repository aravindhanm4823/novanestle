// script.js

function calculateEarnings() {
    const hourlyRate = parseFloat(document.getElementById("hourlyRate").value) || 0;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;

    // Check if both start time and end time are provided
    if (!startTime || !endTime) {
        alert("Please provide both the start time and the end time.");
        return;  // Stop the function execution
    }

    // Convert times to Date objects
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    // Calculate the difference in hours
    const totalHours = (end - start) / (1000 * 60 * 60);

    // Ensure totalHours is non-negative (handles cases like crossing midnight)
    const positiveTotalHours = totalHours >= 0 ? totalHours : 24 + totalHours;

    const totalEarnings = hourlyRate * positiveTotalHours;
    const earningsInWords = numberToWords(totalEarnings);

    document.getElementById("totalEarnings").textContent = `${totalEarnings.toFixed(2)} (${earningsInWords})`;
}

// Function to convert number to words
function numberToWords(number) {
    const ones = [
        '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
        'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
    ];
    const tens = [
        '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];
    const thousands = ['','Thousand', 'Million', 'Billion', 'Trillion'];

    function convertToWords(n) {
        if (n === 0) return 'Zero';
        let words = '';
        let i = 0;
        while (n > 0) {
            if (n % 1000 !== 0) {
                words = convertHundreds(n % 1000) + thousands[i] + ' ' + words;
            }
            n = Math.floor(n / 1000);
            i++;
        }
        return words.trim();
    }

    function convertHundreds(n) {
        let str = '';
        if (n > 99) {
            str += ones[Math.floor(n / 100)] + ' Hundred ';
            n %= 100;
        }
        if (n > 0) {
            if (str !== '') str += 'and ';
            if (n < 20) {
                str += ones[n];
            } else {
                str += tens[Math.floor(n / 10)];
                if (n % 10 > 0) {
                    str += '-' + ones[n % 10];
                }
            }
        }
        return str;
    }

    return convertToWords(Math.round(number));
}

// Function to handle Enter key press and focus management
function handleEnterPress(event, nextElementId) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the form from submitting if it's inside a form
        const nextElement = document.getElementById(nextElementId);
        if (nextElement) {
            nextElement.focus();
        }
    }
}

// Add event listeners to handle Enter key press and move focus
document.getElementById("hourlyRate").addEventListener("keydown", (event) => handleEnterPress(event, "startTime"));
document.getElementById("startTime").addEventListener("keydown", (event) => handleEnterPress(event, "endTime"));
document.getElementById("endTime").addEventListener("keydown", (event) => handleEnterPress(event, "calculateButton"));

// Clear the form on page load
window.onload = () => {
    document.getElementById("hourlyRate").value = '';
    document.getElementById("startTime").value = '';
    document.getElementById("endTime").value = '';
    document.getElementById("totalEarnings").textContent = '';
    document.getElementById("description").value = '';
};
