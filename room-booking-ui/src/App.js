import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ViewBookings from './components/ViewBookings';
import CreateBooking from './components/CreateBooking';
import './App.css';
import { Modal, Button } from 'react-bootstrap';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<ViewBookings/>} />
                </Routes>
            </div>

        </Router>

    );
}

export default App;
