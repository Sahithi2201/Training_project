# Project - Ticket Booking System

## Project Description

This Project is a simple web-based ticket booking system developed using HTML, CSS, JavaScript, Axios, and JSON Server.

The system allows users to view available events, select Gold or Silver seats, choose a payment method, book tickets, cancel bookings, and view booking history.

## Features

- View available events
- Add new events
- View event details
- Select Gold and Silver seats
- Calculate ticket prices automatically
- Select payment method
- Book tickets
- Cancel bookings
- View booking history
- Update available seats after booking
- Restore seats after cancellation

## Technologies Used

- HTML
- CSS
- JavaScript
- Axios
- JSON Server

## Project Structure

```text
class-project/
│
├── db.json
├── package.json
│
├── views/
│   ├── index.html
│   ├── add-event.html
│   ├── booking.html
│   └── history.html
│
├── css/
│   └── style.css
│
└── js/
    ├── index.js
    ├── addEvent.js
    ├── booking.js
    ├── history.js
    │
    └── service/
        ├── apiConfig.js
        ├── eventService.js
        └── bookingService.js
