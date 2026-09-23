const getEvents = async () => {

    try {

        const response = await axios.get(
            `${API_BASE_URL}/events`
        );

        return response.data;

    } catch (error) {

        console.log("Failed to get events");
        console.log(error.message);

        return [];

    }
};


const getEventById = async (id) => {

    try {

        const response = await axios.get(
            `${API_BASE_URL}/events/${id}`
        );

        return response.data;

    } catch (error) {

        console.log("Failed to get event");
        console.log(error.message);

        return null;

    }
};


const addEvent = async (eventData) => {

    try {

        const response = await axios.post(
            `${API_BASE_URL}/events`,
            eventData
        );

        return response.data;

    } catch (error) {

        console.log("Failed to add event");
        console.log(error.message);

        return null;

    }
};


const deleteEvent = async (id) => {

    try {

        const response = await axios.delete(
            `${API_BASE_URL}/events/${id}`
        );

        return response.data;

    } catch (error) {

        console.log("Failed to delete event");
        console.log(error.message);

        return null;

    }
};