function validateSearch() {
    const errors = [];

    const carType = document.getElementById("type").value;
    const pickup = document.getElementById("pickup").value;
    const returnDate = document.getElementById("return").value;

    if (!carType) {
        errors.push("Please select a car type.");
    }

    if (!pickup) {
        errors.push("Please select a pickup date.");
    }

    if (!returnDate) {
        errors.push("Please select a return date.");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (pickup) {
        const pickupDate = new Date(pickup + "T00:00:00");

        if (pickupDate <= today) {
            errors.push("The pickup date must be in the future.");
        }
    }

    if (pickup && returnDate) {
        const pickupDate = new Date(pickup + "T00:00:00");
        const returnDateValue = new Date(returnDate + "T00:00:00");

        if (returnDateValue <= pickupDate) {
            errors.push("The return date must be after the pickup date.");
        }
    }

    return errors;
}

const searchForm = document.querySelector(".rental-form-container form");
const searchButton = searchForm.querySelector('button[type="submit"]');

searchButton.addEventListener("click", function(event) {
    const errors = validateSearch();

    const oldErrors = document.getElementById("search-errors");

    if (oldErrors) {
        oldErrors.remove();
    }

    if (errors.length > 0) {
        event.preventDefault();

        const errorList = document.createElement("ul");
        errorList.id = "search-errors";

        errors.forEach(function(error) {
            const listItem = document.createElement("li");
            listItem.textContent = error;
            errorList.appendChild(listItem);
        });

        searchForm.appendChild(errorList);
    }
});