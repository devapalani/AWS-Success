```javascript
// Mobile Navigation
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });
});

// Bike Search
const bikeSearch = document.getElementById("bikeSearch");
const searchBtn = document.getElementById("searchBtn");
const bikeCards = document.querySelectorAll(".bike-card");
const noResults = document.getElementById("noResults");

function searchBikes() {
    const searchText = bikeSearch.value.toLowerCase().trim();
    let visibleCount = 0;

    bikeCards.forEach(function (card) {
        const bikeName = card.dataset.name.toLowerCase();

        if (bikeName.includes(searchText)) {
            card.style.display = "";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.hidden = visibleCount !== 0;
}

searchBtn.addEventListener("click", searchBikes);

bikeSearch.addEventListener("input", searchBikes);

bikeSearch.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchBikes();
    }
});

// Select bike from its card
const bikeModel = document.getElementById("bikeModel");

document.querySelectorAll(".book-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        bikeModel.value = button.dataset.bike;

        document.getElementById("contact").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Set minimum booking date to today
const bookingDate = document.getElementById("bookingDate");

const today = new Date();
const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

bookingDate.min = localDate;

// Booking Form Validation
const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");

bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const bike = bikeModel.value;
    const date = bookingDate.value;

    if (!name || !phone || !bike || !date) {
        formMessage.style.color = "#ff7777";
        formMessage.textContent = "Please fill in all the fields.";
        return;
    }

    if (!/^[6-9][0-9]{9}$/.test(phone)) {
        formMessage.style.color = "#ff7777";
        formMessage.textContent =
            "Enter a valid 10-digit Indian mobile number.";
        return;
    }

    if (date < localDate) {
        formMessage.style.color = "#ff7777";
        formMessage.textContent = "Please select today or a future date.";
        return;
    }

    formMessage.style.color = "#7dff9b";
    formMessage.textContent =
        "Form validated successfully! This demo does not send your booking.";

    console.log("Demo booking details:", {
        name: name,
        phone: phone,
        bike: bike,
        date: date
    });

    // This demo does not store or send the customer's details.
});

// Current year in footer
document.getElementById("currentYear").textContent =
    new Date().getFullYear();
```
