const bookingForm = document.getElementById("bookingForm");

const bookingMessage =
    document.getElementById("bookingMessage");


const params =
    new URLSearchParams(window.location.search);


const eventId = params.get("id");


let currentEvent = null;

let selectedSeats = [];


const loadEvent = async () => {

    currentEvent = await getEventById(eventId);


    if (!currentEvent) {

        document.getElementById("eventName")
            .textContent = "Event not found";

        return;
    }


    document.getElementById("eventName")
        .textContent = currentEvent.name;


    document.getElementById("eventLocation")
        .textContent = currentEvent.location;


    document.getElementById("eventDate")
        .textContent = currentEvent.date;


    document.getElementById("eventTime")
        .textContent = currentEvent.time;


    document.getElementById("eventPrice")
        .textContent =
        `Gold: ₹${currentEvent.goldPrice} | Silver: ₹${currentEvent.silverPrice}`;


    document.getElementById("availableSeats")
        .textContent = currentEvent.availableSeats;


    setupSeats();

};


const setupSeats = () => {

    const seats =
        document.querySelectorAll(".seat");


    seats.forEach(seat => {

        seat.addEventListener("click", () => {

            const seatNumber =
                seat.dataset.seat;


            if (selectedSeats.includes(seatNumber)) {

                selectedSeats =
                    selectedSeats.filter(
                        item => item !== seatNumber
                    );

                seat.classList.remove("selected");

            } else {

                if (
                    selectedSeats.length >=
                    currentEvent.availableSeats
                ) {

                    alert(
                        "You cannot select more seats than available."
                    );

                    return;
                }


                selectedSeats.push(seatNumber);

                seat.classList.add("selected");

            }


            updateBookingDetails();

        });

    });

};


const calculateTotalAmount = () => {

    let total = 0;


    selectedSeats.forEach(seat => {

        if (seat.startsWith("G")) {

            total += currentEvent.goldPrice;

        }


        if (seat.startsWith("S")) {

            total += currentEvent.silverPrice;

        }

    });


    return total;

};


const updateBookingDetails = () => {

    document.getElementById("selectedSeats")
        .textContent =
        selectedSeats.length > 0
            ? selectedSeats.join(", ")
            : "None";


    document.getElementById("numberOfSeats")
        .textContent =
        selectedSeats.length;


    document.getElementById("totalAmount")
        .textContent =
        `₹${calculateTotalAmount()}`;

};


bookingForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        if (selectedSeats.length === 0) {

            bookingMessage.innerHTML =
                "<p>Please select at least one seat.</p>";

            return;
        }


        const paymentMethod =
            document.querySelector(
                'input[name="paymentMethod"]:checked'
            );


        if (!paymentMethod) {

            bookingMessage.innerHTML =
                "<p>Please select a payment method.</p>";

            return;
        }


        const allBookings =
            await getBookings();


        const confirmedBookings =
            allBookings.filter(
                booking =>
                    booking.eventId == eventId &&
                    booking.status === "Confirmed"
            );


        const bookedSeats =
            confirmedBookings.flatMap(
                booking => booking.selectedSeats
            );


        const alreadyBooked =
            selectedSeats.filter(
                seat =>
                    bookedSeats.includes(seat)
            );


        if (alreadyBooked.length > 0) {

            bookingMessage.innerHTML = `
                <p>
                    These seats are already booked:
                    ${alreadyBooked.join(", ")}
                </p>
            `;

            return;
        }


        const bookingData = {

            userId: "user1",

            eventId: eventId,

            selectedSeats: selectedSeats,

            numberOfSeats: selectedSeats.length,

            totalAmount: calculateTotalAmount(),

            paymentMethod: paymentMethod.value,

            bookingDate:
                new Date().toISOString(),

            status: "Confirmed"

        };


        const result =
            await createBooking(bookingData);


        if (!result) {

            bookingMessage.innerHTML =
                "<p>Booking failed.</p>";

            return;
        }


        const newAvailableSeats =
            currentEvent.availableSeats -
            selectedSeats.length;


        await axios.patch(
            `${API_BASE_URL}/events/${eventId}`,
            {
                availableSeats:
                    newAvailableSeats
            }
        );


        bookingMessage.innerHTML = `

            <p>
                <strong>
                    Ticket booked successfully!
                </strong>
            </p>

            <p>
                Selected Seats:
                ${selectedSeats.join(", ")}
            </p>

            <p>
                Number of Seats:
                ${selectedSeats.length}
            </p>

            <p>
                Payment Method:
                ${paymentMethod.value}
            </p>

            <p>
                Total Amount:
                ₹${calculateTotalAmount()}
            </p>

        `;


        currentEvent.availableSeats =
            newAvailableSeats;


        document.getElementById("availableSeats")
            .textContent =
            newAvailableSeats;


        selectedSeats = [];


        document.querySelectorAll(".seat")
            .forEach(seat => {

                seat.classList.remove("selected");

            });


        document.querySelectorAll(
            'input[name="paymentMethod"]'
        ).forEach(input => {

            input.checked = false;

        });


        updateBookingDetails();

    }
);


loadEvent();