const eventForm = document.getElementById("eventForm");

const eventMessage =
    document.getElementById("eventMessage");


eventForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const eventData = {

            name:
                document.getElementById("eventName").value,

            location:
                document.getElementById("location").value,

            date:
                document.getElementById("date").value,

            time:
                document.getElementById("time").value,

            goldPrice:
                Number(
                    document.getElementById("goldPrice").value
                ),

            silverPrice:
                Number(
                    document.getElementById("silverPrice").value
                ),

            availableSeats:
                Number(
                    document.getElementById("availableSeats").value
                )

        };


        const result =
            await addEvent(eventData);


        if (!result) {

            eventMessage.innerHTML = `
                <p>
                    Failed to add event.
                </p>
            `;

            return;
        }


        eventMessage.innerHTML = `
            <p>
                Event added successfully!
            </p>
        `;


        eventForm.reset();

    }
);