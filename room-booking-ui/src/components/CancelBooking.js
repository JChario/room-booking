import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Spinner } from 'react-bootstrap';

const CancelBooking = () => {
    const [bookingId, setBookingId] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
        setLoading(true);
        try {
            await axios.delete(process.env.REACT_APP_API_URL + `/bookings/${bookingId}`);
            alert('Booking canceled successfully!');
        } catch (error) {
            alert('Error while canceling booking: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Cancel Booking</h2>
            <Form>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Booking ID"
                        value={bookingId}
                        onChange={(e) => setBookingId(e.target.value)}
                    />
                </Form.Group>
                <Button
                    variant="danger"
                    onClick={handleCancel}
                    disabled={loading}
                    className="mt-2"
                >
                    {loading ? <Spinner animation="border" size="sm" /> : 'Cancel Booking'}
                </Button>
            </Form>
        </div>
    );
};

export default CancelBooking;
