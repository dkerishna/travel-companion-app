import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal } from 'react-bootstrap';
import { FaPlus, FaMapMarkerAlt, FaCalendarAlt, FaCamera, FaRoute } from 'react-icons/fa';
import AuthModal from '../Auth/AuthModal';

const Home = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  // Dummy data to showcase the app
  const dummyTrips = [
    {
      id: 1,
      title: "Tokyo Adventure",
      country: "Japan",
      city: "Tokyo",
      start_date: "2024-04-15",
      end_date: "2024-04-22",
      image_url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=300&fit=crop",
      destinations: [
        { name: "Shibuya Crossing", description: "Famous intersection" },
        { name: "Tokyo Tower", description: "Iconic landmark" },
        { name: "Tsukiji Fish Market", description: "Fresh sushi experience" }
      ]
    },
    {
      id: 2,
      title: "European Getaway",
      country: "France",
      city: "Paris",
      start_date: "2024-06-10",
      end_date: "2024-06-17",
      image_url: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500&h=300&fit=crop",
      destinations: [
        { name: "Eiffel Tower", description: "Iron lattice tower" },
        { name: "Louvre Museum", description: "World's largest art museum" },
        { name: "Notre-Dame Cathedral", description: "Gothic architecture" }
      ]
    },
    {
      id: 3,
      title: "Tropical Paradise",
      country: "Thailand",
      city: "Phuket",
      start_date: "2024-08-05",
      end_date: "2024-08-12",
      image_url: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=500&h=300&fit=crop",
      destinations: [
        { name: "Phi Phi Islands", description: "Crystal clear waters" },
        { name: "Big Buddha", description: "Massive statue overlooking the island" },
        { name: "Patong Beach", description: "Vibrant nightlife and beach" }
      ]
    }
  ];

  const handleAuthAction = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                Your Perfect Trip Companion
              </h1>
              <p className="lead mb-4">
                Plan, organize, and track your adventures with ease. Create detailed itineraries, 
                save destinations, and capture memories all in one place.
              </p>
              <div className="d-flex gap-3">
                <Button 
                  variant="light" 
                  size="lg" 
                  onClick={() => handleAuthAction('signup')}
                  className="px-4"
                >
                  <FaPlus className="me-2" />
                  Start Planning
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  onClick={() => handleAuthAction('login')}
                  className="px-4"
                >
                  Sign In
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image text-center">
                <img 
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop" 
                  alt="Travel planning"
                  className="img-fluid rounded shadow-lg"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 bg-light">
        <Container>
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="display-5 fw-bold">How It Works</h2>
              <p className="lead">See how easy it is to plan your perfect trip</p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <div className="feature-icon bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <FaCalendarAlt size={30} />
                </div>
                <h4>Plan Your Trip</h4>
                <p>Set dates, destinations, and create your travel timeline</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <div className="feature-icon bg-success text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <FaRoute size={30} />
                </div>
                <h4>Add Destinations</h4>
                <p>Build your itinerary with places you want to visit</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <div className="feature-icon bg-warning text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <FaCamera size={30} />
                </div>
                <h4>Capture Memories</h4>
                <p>Save photos and notes from your adventures</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Demo Section */}
      <section className="demo-section py-5">
        <Container>
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="display-5 fw-bold">See It In Action</h2>
              <p className="lead">Here's what your travel dashboard could look like</p>
            </Col>
          </Row>

          {/* Demo Trip Cards */}
          <Row>
            {dummyTrips.map((trip) => (
              <Col lg={4} md={6} className="mb-4" key={trip.id}>
                <Card className="h-100 shadow-sm trip-card">
                  <div className="position-relative">
                    <Card.Img 
                      variant="top" 
                      src={trip.image_url} 
                      style={{height: '200px', objectFit: 'cover'}}
                    />
                    <Badge 
                      bg="primary" 
                      className="position-absolute top-0 start-0 m-2"
                    >
                      {calculateDuration(trip.start_date, trip.end_date)} days
                    </Badge>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="h5">{trip.title}</Card.Title>
                    <div className="mb-2">
                      <FaMapMarkerAlt className="text-muted me-1" />
                      <small className="text-muted">{trip.city}, {trip.country}</small>
                    </div>
                    <div className="mb-3">
                      <FaCalendarAlt className="text-muted me-1" />
                      <small className="text-muted">
                        {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                      </small>
                    </div>
                    
                    <div className="mb-3">
                      <h6 className="mb-2">Destinations:</h6>
                      {trip.destinations.map((dest, index) => (
                        <div key={index} className="mb-1">
                          <Badge bg="light" text="dark" className="me-1">
                            {dest.name}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-auto">
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleAuthAction('signup')}
                      >
                        <FaPlus className="me-1" />
                        Add Destination
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleAuthAction('signup')}
                      >
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* CTA Section */}
          <Row className="mt-5">
            <Col lg={12} className="text-center">
              <div className="cta-section bg-primary text-white rounded p-5">
                <h3 className="mb-3">Ready to Start Your Journey?</h3>
                <p className="lead mb-4">
                  Join thousands of travelers who organize their adventures with us
                </p>
                <Button 
                  variant="light" 
                  size="lg" 
                  onClick={() => handleAuthAction('signup')}
                  className="px-5"
                >
                  <FaPlus className="me-2" />
                  Create Your First Trip
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        show={showAuthModal}
        onHide={() => setShowAuthModal(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />
    </div>
  );
};

export default Home;