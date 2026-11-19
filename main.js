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
if (searchForm) {
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
}
const cars = [
    {
        type: "sedan",
        name: "Toyota Camry",
        description: "Comfortable and reliable for everyday driving.",
        year: 2024,
        image: "car_1.jpg"
    },
    {
        type: "sedan",
        name: "Honda Accord",
        description: "A stylish sedan with a spacious interior.",
        year: 2023,
        image: "car_2.jpg",
    },
    {
        type: "suv",
        name: "Toyota RAV4",
        description: "A versatile SUV for family trips.",
        year: 2024,
        image: "car_3.jpg",
    },
    {
        type: "suv",
        name: "Honda CR-V",
        description: "A spacious SUV with plenty of room.",
        year: 2023,
        image: "car_4.jpg",
    },
    {
        type: "truck",
        name: "Ford F-150",
        description: "A strong truck for work and travel.",
        year: 2024,
        image: "car_5.jpg",
    },
    {
        type: "truck",
        name: "Chevrolet Silverado",
        description: "A dependable truck with great capability.",
        year: 2023,
        image: "car_6.jpg",
    },
    {
        type: "van",
        name: "Honda Odyssey",
        description: "A comfortable van for family travel.",
        year: 2024,
        image: "car_7.jpg",
    },
    {
        type: "van",
        name: "Toyota Sienna",
        description: "A spacious van for long journeys.",
        year: 2023,
        image: "car_8.jpg",
    },
    {
        type: "sedan",
        name: "Nissan Altima",
        description: "A practical and comfortable sedan.",
        year: 2022,
        image: "car_9.jpg",
    },
    {
        type: "suv",
        name: "Ford Explorer",
        description: "A roomy SUV for everyday adventures.",
        year: 2024,
        image: "car_10.jpg",
    }
];

function displayCars(carArray) {
    const carList = document.querySelector(".featured-cars");

    if (!carList) {
        return;
    }

    carList.innerHTML = "";

    carArray.forEach(function(car) {
        const carCard = document.createElement("div");
        carCard.className = "car-card";
        const image = document.createElement("img");
        image.src = car.image;
        image.alt = car.name;
        carCard.appendChild(image);

        const heading = document.createElement("h3");
        heading.textContent = car.name;

        const description = document.createElement("p");
        description.textContent = car.description +
            " Type: " + car.type.toUpperCase() +
            " | Year: " + car.year;

        carCard.appendChild(heading);
        carCard.appendChild(description);
        const confirmButton = document.createElement("button");
confirmButton.textContent = "Confirm Rental";

confirmButton.addEventListener("click", function() {
    const params = new URLSearchParams(window.location.search);

    document.dispatchEvent(new CustomEvent("confirm-rental", {
        detail: {
            carType: car.type,
            startDate: params.get("pickup"),
            returnDate: params.get("return")
        }
    }));
});

carCard.appendChild(confirmButton);

        carList.appendChild(carCard);
    });
}

function listCars() {
    const params = new URLSearchParams(window.location.search);

    if (params.has("type")) {
        const type = params.get("type");

        const filteredCars = cars.filter(function(car) {
            return car.type === type;
        });

        displayCars(filteredCars);
    } else {
        displayCars(cars);
    }
}