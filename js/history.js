const bookingList =
    document.getElementById("bookingList");


const loadBookings = async () => {

    const bookings = await getBookings();


    if (bookings.length === 0) {

        bookingList.innerHTML = `
            <p>No bookings found.</p>
        `;

        return;
    }


    bookingList.innerHTML = "";


    for (const booking of bookings) {

        const card =
            document.createElement("div");

        card.className = "event-card";


        const event =
            await getEventById(booking.eventId);


        card.innerHTML = `

            <h3>
                ${event ? event.name : "Event"}
            </h3>

            <p>
                <strong>Seats:</strong>
                ${booking.selectedSeats.join(", ")}
            </p>

            <p>
                <strong>Number of Seats:</strong>
                ${booking.numberOfSeats}
            </p>

            <p>
                <strong>Payment:</strong>
                ${booking.paymentMethod}
            </p>

            <p>
                <strong>Total Amount:</strong>
                ₹${booking.totalAmount}
            </p>

            <p>
                <strong>Status:</strong>
                ${booking.status}
            </p>

            <p>
                <strong>Booking Date:</strong>
                ${new Date(
                    booking.bookingDate
                ).toLocaleString()}
            </p>

            ${
                booking.status === "Confirmed"
                ?
                `
                <button
                    onclick="cancelTicket('${booking.id}')">
                    Cancel Booking
                </button>
                `
                :
                `
                <p>
                    <strong>This booking is cancelled.</strong>
                </p>
                `
            }

        `;


        bookingList.appendChild(card);

    }

};


const cancelTicket = async (id) => {

    const confirmCancel =
        confirm(
            "Are you sure you want to cancel this booking?"
        );


    if (!confirmCancel) {

        return;

    }


    const booking =
        await getBookingById(id);


    if (!booking) {

        alert("Booking not found.");

        return;

    }


    if (booking.status === "Cancelled") {

        alert("Booking is already cancelled.");

        return;

    }


    const event =
        await getEventById(booking.eventId);


    if (!event) {

        alert("Event not found.");

        return;

    }


    const updatedEvent = {

        availableSeats:
            Number(event.availableSeats) +
            Number(booking.numberOfSeats)

    };


    try {

        await axios.patch(
            `${API_BASE_URL}/events/${booking.eventId}`,
            updatedEvent
        );


        await cancelBooking(id);


        alert(
            "Booking cancelled successfully."
        );


        await loadBookings();

    } catch (error) {

        console.log(error);

        alert(
            "Failed to cancel booking."
        );

    }

};


loadBookings();