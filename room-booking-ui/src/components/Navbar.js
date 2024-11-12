import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

const CustomNavbar = ({ onOpenModal }) => {
    return (
        <Navbar bg="light" expand="lg" className="shadow-sm">
            <Navbar.Brand className="font-weight-bold logo">ACME</Navbar.Brand>
        </Navbar>
    );
};

export default CustomNavbar;
