const getBookings = async () => {

    try {

        const response = await axios.get(
            `${API_BASE_URL}/bookings`
        );

        return response.data;

    } catch (error) {

        console.log("Failed to get bookings");
        console.log(error.message);

        return [];

    }
};


const getBookingById = async (id) => {

    try {

        const response = await axios.get(
            `${API_BASE_URL}/bookings/${id}`
        );

        return response.data;

    } catch (error) {

        console.log("Failed to get booking");
        console.log(error.message);

        return null;

    }
};


const createBooking = async (bookingData) => {

    try {

        const response = await axios.post(
            `${API_BASE_URL}/bookings`,
            bookingData
        );

        return response.data;

    } catch (error) {

        console.log("Failed to create booking");
        console.log(error.message);

        return null;

    }
};


const updateBooking = async (id, bookingData) => {

    try {

        const response = await axios.patch(
            `${API_BASE_URL}/bookings/${id}`,
            bookingData
        );

        return response.data;

    } catch (error) {

        console.log("Failed to update booking");
        console.log(error.message);

        return null;

    }
};


const cancelBooking = async (id) => {

    return await updateBooking(id, {
        status: "Cancelled"
    });

};