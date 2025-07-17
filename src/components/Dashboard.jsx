import React, { useEffect, useState } from 'react';
import { Card, Button, Spinner, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch trips for the logged-in user
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get(`/trips/user/${currentUser.uid}`);
        setTrips(response.data);
      } catch (error) {
        console.error('Failed to fetch trips:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.uid) {
      fetchTrips();
    }
  }, [currentUser]);

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">My Trips</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
        </div>
      ) : trips.length === 0 ? (
        <div className="text-center">
          <p>You haven’t created any trips yet.</p>
          <Button as={Link} to="/trips/new" variant="primary">
            Create Your First Trip
          </Button>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {trips.map((trip) => (
            <Col key={trip.id}>
              <Card className="h-100 shadow-sm">
                {trip.image_url && (
                  <Card.Img variant="top" src={trip.image_url} style={{ height: '180px', objectFit: 'cover' }} />
                )}
                <Card.Body>
                  <Card.Title>{trip.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {trip.city}, {trip.country}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>{trip.start_date}</strong> to <strong>{trip.end_date}</strong>
                  </Card.Text>
                  <Button as={Link} to={`/trips/${trip.id}`} variant="outline-primary" size="sm">
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
