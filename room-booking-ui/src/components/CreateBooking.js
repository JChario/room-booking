import React, { useState, useEffect } from 'react';
import {Form, Button, Spinner, Row, Col, Alert, Modal} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";

const CreateBooking = ({ onClose }) => {
    const [room, setRoom] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [date, setDate] = useState(null);
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [loading, setLoading] = useState(false);
    const [meetingRooms, setMeetingRooms] = useState([]);
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);

    const hourlyOptions = [
        "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
    ];

    const isFormComplete = room && employeeEmail && date && timeFrom && timeTo;

    useEffect(() => {
        fetchMeetingRooms();
    }, []);

    const handleBooking = async () => {
        setError(''); // Reset error message

        // Ensure both start and end times are set
        if (!timeFrom || !timeTo) {
            setError('Please select both start and end times.');
            return;
        }

        // Convert start and end times to Date objects for the selected date
        const startDateTime = new Date(date);
        startDateTime.setHours(...timeFrom.split(':'));

        const endDateTime = new Date(date);
        endDateTime.setHours(...timeTo.split(':'));

        // Calculate the difference in hours
        const diffInMs = endDateTime - startDateTime;
        const diffInHours = diffInMs / (1000 * 60 * 60);

        // Check if the duration is at least 1 hour and a whole multiple of 1 hour
        if (diffInHours < 1 || diffInHours % 1 !== 0) {
            setError('Bookings must be at least 1 hour and in consecutive multiples of 1 hour.');
            return;
        }

        // Proceed with booking logic if validation passes
        setLoading(true);
        const formattedDate = date ? date.toLocaleDateString('en-CA') : '';
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + '/bookings', {
                meetingRoom: { id: room },
                employeeEmail,
                date: formattedDate,
                timeFrom,
                timeTo
            });
            alert("Booking created successfully!");
            onClose();
        } catch (error) {
            const message = error.response?.data || 'Error while canceling booking';
            setErrorMessage(message); // Set the error message from the backend
            setShowErrorModal(true); // Show error modal
        } finally {
            setLoading(false);
        }
    };

    const fetchMeetingRooms = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/meetingRooms');
            setMeetingRooms(response.data);
        } catch (error) {
            console.error("There was an error fetching the bookings!", error);
        }
    };

    return (
        <Form className="create-booking-form">
            {error && (
                <Alert variant="danger" className="mb-3">
                    {error}
                </Alert>
            )}
            <Form.Group controlId="formRoom">
                <Form.Label>Room*</Form.Label>
                <Form.Control
                    as="select"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="mr-2"
                >
                    <option value="">Select room</option>
                    {meetingRooms.map((meetingRoom) => (
                        <option key={meetingRoom.id} value={meetingRoom.id}>
                            {meetingRoom.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Employee e-mail*</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Insert e-mail"
                    value={employeeEmail}
                    onChange={(e) => setEmployeeEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formDate">
                <Form.Label>Date*</Form.Label>
                <div className="w-100">
                    <DatePicker
                        selected={date}
                        onChange={(selectedDate) => setDate(selectedDate)}
                        dateFormat="dd/MM/yyyy"
                        className="form-control full-width-datepicker"
                        placeholderText="Select a date"
                    />
                </div>
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group controlId="formStartTime">
                        <Form.Label>Start time*</Form.Label>
                        <Form.Control
                            as="select"
                            value={timeFrom}
                            onChange={(e) => setTimeFrom(e.target.value)}
                        >
                            <option value="">Select</option>
                            {hourlyOptions.map((time) => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formEndTime">
                        <Form.Label>End time*</Form.Label>
                        <Form.Control
                            as="select"
                            value={timeTo}
                            onChange={(e) => setTimeTo(e.target.value)}
                        >
                            <option value="">Select</option>
                            {hourlyOptions.map((time) => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            <div className="button-container mt-3">
                <Button variant="secondary" onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={handleBooking}
                    disabled={!isFormComplete || loading}
                    className="ml-2"
                >
                    {loading ? <Spinner animation="border" size="sm" /> : 'Book'}
                </Button>
            </div>
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
        </Form>

    );
};

export default CreateBooking;
