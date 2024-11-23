import { useState, useEffect } from "react";
import FooterDashboard from "../../components/navbarDashboard/FooterDashboard";
import {  getActivities, getCategories, getPromos, fetchLogin} from "../../api/api";
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
import AOS from "aos";
import LayoutDashboard from "../../components/layout/LayoutDashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import './dasboard.css';


const Dashboard = () => {
    const [latestActivities, setLatestActivities] = useState([]);
    const [activities, setActivities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [promos, setPromos] = useState([]);
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [profilePictureFile, setProfilePictureFile] = useState(null);

   

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
        setLatestActivities(activities.slice(0, 3));
        setProfilePictureUrl(user.profilePictureUrl);
    }, [user]);

    useEffect(() => {
        fetchAllData();
        fetchLoginData();
        AOS.init();
    }, []);

    const fetchAllData = async () => {
        try {
            const [activitiesData, categoriesData, promosData] = await Promise.all([
                getActivities(),
                getCategories(),
                getPromos()
            ]);
            setActivities(activitiesData.data.data);
            setCategories(categoriesData.data.data);
            setPromos(promosData.data.data);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    const fetchLoginData = async () => {
        try {
            const userData = await fetchLogin();
            setUser(userData);
        } catch (error) {
            setError('Failed to fetch login data. Please try again later.');
        }
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'name': setName(value); break;
            case 'email': setEmail(value); break;
            case 'phoneNumber': setPhoneNumber(value); break;
            case 'profilePictureUrl': setProfilePictureUrl(value); break;
            default: break;
        }
    };

    
    const handleFileChange = (event) => {
        if (event.target.files[0]) {
            setProfilePictureFile(event.target.files[0]);
        }
    };

    const handleSaveChanges = () => {
        if (profilePictureFile) {
            const formData = new FormData();
            formData.append('image', profilePictureFile); 
    
            axios.post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                const newProfilePictureUrl = response.data.url;
                setProfilePictureUrl(newProfilePictureUrl);
                updateUserProfile(newProfilePictureUrl);
                
                
            
                
            })
            .catch(error => {
                console.error('Error uploading image:', error);
                setError('Failed to upload new profile picture.');
            });
        } else {
            updateUserProfile(profilePictureUrl);
        }
    };
    
    const updateUserProfile = (imageUrl) => {
        const API_URL = `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile`;
        const data = { name, email, phoneNumber, profilePictureUrl: imageUrl };
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            'Content-Type': 'application/json'
        };
    
        axios.post(API_URL, data, { headers })
        .then(response => {
            setUser(response.data.data);
            setShowModal(false);
            setUser(prevUser => ({ ...prevUser, ...data }));
            console.log(response.data.data);
        })
        .catch(error => {
            console.error('Failed to update profile:', error);
            setError('Failed to update profile. Please try again later.');
        });
    };

  

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <LayoutDashboard>
            <div style={{ backgroundColor: '#f7f5f2', height: 'max-content', paddingBottom: '50px' }}>
                {/* header */}
                <header className="header1">
                    <div className="dashboard">
                        <h2>{user.name || "Guest"} ({user.email})<img src={user.profilePictureUrl} alt="Profile" /></h2>
                    </div>
                </header>
                {/* content dashboard */}
                <div className="content-dashboard" >
                    <div className="row">
                        <div className="card card-dashboard row">
                            <div className="card-body ">
                                <h1 data-aos="zoom-in" data-aos-duration="1000">Hi, {user.name}!</h1>
                                <p className="role" data-aos="zoom-in" data-aos-duration="1000"><i className="bi bi-person-check"></i> {user.role}</p>
                                <p className="email" data-aos="zoom-in" data-aos-duration="1000"><i className="bi bi-envelope-fill"></i> {user.email}</p>
                                <p className="phone" data-aos="zoom-in" data-aos-duration="1000"><i className="bi bi-telephone-fill"></i> {user.phoneNumber}</p>
                            </div>
                            <div className="card-body ">
                                <button className="button-edit" onClick={() => setShowModal(true)}>Edit Profile</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* content 1 */}
                <div className="content-1">
                    <div className="card-content-1">
                    <h2 className="content-title">All Job Posted</h2>
                    <div className="container text-center">
                      <div className="row align-items-center">
                        <div className="col col-view"data-aos="fade-up" data-aos-duration="1000">
                          <p className="title">total promo:</p>
                          <p className="posting"> {promos.length} posting</p>
                        </div>
                        <div className="col col-view" data-aos="fade-up" data-aos-duration="1300">
                          <p className="title">total category:</p>
                          <p className="posting"> {categories.length} posting</p>
                        </div>
                        <div className="col col-view" data-aos="fade-up" data-aos-duration="1600">
                          <p className="title">total activity:</p>
                          <p className="posting"> {activities.length} posting</p>
                        </div>
                      </div>
                    </div>
                        
                    </div>
                </div>
                {/* Latest Activity Section */}
            

                <div className="content-1">
                    <div className="card-content-1">
                    <div className="latest-activity-section">
                      <h2 className="content-title" >Latest Activity</h2>
                      <ul>
                        {latestActivities.map((activity, index) => (
                          <li key={index}>
                            <span className="activity-title">{activity.title}</span>
                            <span className="activity-date"> ( {activity.updatedAt.slice(0, 10)} <i className="bi bi-alarm"></i>: {activity.updatedAt.slice(11, 19)} )</span>
                            <p className="activity-description">{activity.description}</p>
                          </li>
                        ))}
                      </ul>
                  </div>
                  </div></div>

            

            </div>
            <FooterDashboard />

            


            {/* modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Personal Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                       <img className="profile-picture" src={user.profilePictureUrl} alt="Profile" />
                        <Form.Group controlId="formName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" name="name" value={name} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" name="email" value={email} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="number" name="phoneNumber" value={phoneNumber} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formChangeProfilePicture">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control type="file" name="profilePictureUrl" onChange={handleFileChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </LayoutDashboard>
    );
}

export default Dashboard;
