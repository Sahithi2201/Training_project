const eventList = document.getElementById("eventList");


const loadEvents = async () => {

    const events = await getEvents();


    if (events.length === 0) {

        eventList.innerHTML = `
            <p>No events available.</p>
        `;

        return;
    }


    eventList.innerHTML = "";


    events.forEach(event => {

        const card = document.createElement("div");

        card.className = "event-card";


        card.innerHTML = `
            <h3>${event.name}</h3>

            <p>
                <strong>Location:</strong>
                ${event.location}
            </p>

            <p>
                <strong>Date:</strong>
                ${event.date}
            </p>

            <p>
                <strong>Time:</strong>
                ${event.time}
            </p>

            <p>
                <strong>Gold:</strong>
                ₹${event.goldPrice}
            </p>

            <p>
                <strong>Silver:</strong>
                ₹${event.silverPrice}
            </p>

            <p>
                <strong>Available Seats:</strong>
                ${event.availableSeats}
            </p>

            <button onclick="bookEvent('${event.id}')">
                Book Tickets
            </button>
        `;


        eventList.appendChild(card);

    });

};


const bookEvent = (id) => {

    window.location.href = `booking.html?id=${id}`;

};


loadEvents();