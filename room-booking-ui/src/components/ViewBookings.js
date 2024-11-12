import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Card, Form, Button, Table, Spinner, Modal, Row, Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from "./Navbar";
import CreateBooking from "./CreateBooking";
import {Route, Routes} from "react-router-dom";

const ViewBookings = ({refresh,onOpenModal}) => {
    const [room, setRoom] = useState('');
    const [date, setDate] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [meetingRooms, setMeetingRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showValidationError, setShowValidationError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshBookings, setRefreshBookings] = useState(false);

    useEffect(() => {
        fetchMeetingRooms();
        fetchBookings();
    }, [refresh]);

    const fetchMeetingRooms = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/meetingRooms');
            setMeetingRooms(response.data);
        } catch (error) {
            console.error("There was an error fetching the bookings!", error);
        }
    };

    const fetchBookings = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/bookings/all');
            setBookings(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("There was an error fetching the bookings!", error);
        }
    };

    const searchBookings = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/bookings', {
                params: { room, date: date ? date.toISOString().split('T')[0] : '' }
            });
            setBookings(response.data);
        } catch (error) {
            console.error("There was an error fetching the bookings!", error);
        }
    };

    const handleCancel = async (bookingId) => {
        setLoading(true);
        try {
            await axios.delete(process.env.REACT_APP_API_URL + `/bookings/${bookingId}`);
            alert('Booking canceled successfully!');
            setBookings(bookings.filter(booking => booking.id !== bookingId));
        } catch (error) {
            const message = error.response?.data || 'Error while canceling booking';
            setErrorMessage(message); // Set the error message from the backend
            setShowErrorModal(true); // Show error modal
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (!room || !date) {
            setErrorMessage('Please select both a room and a date to search.');
            setShowValidationError(true);
        } else {
            searchBookings();
        }
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        fetchBookings();
    };

    return (
        <div className="app-container">
            <Row className="d-flex justify-content-between align-items-center">
                <Col xs="auto">
                    <h2>
                        <a href="#" onClick={fetchBookings}>Bookings</a>
                    </h2>
                </Col>
                <Col xs="auto">
                    <Button variant="primary" className="book-room-button" onClick={handleOpenModal}>
                        Book a room
                    </Button>
                </Col>
            </Row>
            <Card className="card-container-1">
                <Card.Body>
                    <Form className="filter-container d-flex">
                        <Form.Control
                            as="select"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            className="mr-2"
                        >
                            <option value="">Select room</option>
                            {meetingRooms.map((meetingRoom) => (
                                <option key={meetingRoom.id} value={meetingRoom.name}>
                                    {meetingRoom.name}
                                </option>
                            ))}
                        </Form.Control>
                        <DatePicker
                            selected={date}
                            onChange={(selectedDate) => setDate(selectedDate)}
                            dateFormat="yyyy-MM-dd"
                            className="form-control mr-2"
                            placeholderText="Select a date"
                        />
                        <Button className="search-btn" disabled={!room || !date || loading} onClick={handleSearch}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Search'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <Card className="card-container-2">
                <Card.Body>
                    <div className="table-container">
                        <Table responsive className="booking-table">
                            <thead>
                            <tr>
                                <th>Meeting Room</th>
                                <th>Booked by</th>
                                <th>Booking Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.meetingRoom.name}</td>
                                    <td>{booking.employeeEmail}</td>
                                    <td>{booking.date}</td>
                                    <td>{booking.timeFrom}</td>
                                    <td>{booking.timeTo}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            className="cancel-btn"
                                            onClick={() => handleCancel(booking.id)}
                                            disabled={loading}
                                        >
                                            {loading ? 'Canceling...' : 'Cancel'}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>

            {/* Error Modal */}
            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Unable to Cancel Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{errorMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Validation Error Modal */}
            <Modal show={showValidationError} onHide={() => setShowValidationError(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Validation Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{errorMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowValidationError(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Create Booking Modal */}
            <Modal show={isModalOpen} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateBooking onClose={handleCloseModal} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ViewBookings;
