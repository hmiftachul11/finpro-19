import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getActivityById, fetchLogin } from "../../../api/api";
import { Modal, Button } from "react-bootstrap";
import NavbarDashboard from "../../../components/navbarDashboard/NavbarDasboard";
import FooterDashboard from "../../../components/navbarDashboard/FooterDashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './activityedit.css';

const ActivityDetailEdit = () => {
    const [user, setUser] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [activityDetailEdit, setActivityDetailEdit] = useState({});
    
    const { id } = useParams();
    console.log(`Fetching details for Activity ID: ${id}`); 

    const fetchLoginData = async () => {
        try {
            const userData = await fetchLogin();
            setUser(userData);
        } catch (error) {
            alert('Failed to fetch login data. Please try again later.');
        }
    };
    const fetchActivityId = () => {
        getActivityById(id)
            .then((response) => {
                setActivityDetailEdit(response.data.data);
                console.log(response.data.data);
            })
            .catch((err) => {
                console.error('Failed to fetch banner details:', err);
            });
    };

    useEffect(() => {
        fetchActivityId();
    }, [id]);

    useEffect(() => {
        fetchLoginData();
    }, []);
    

    const formatDate = (dateStr) => {
        return dateStr ? new Date(dateStr).toLocaleDateString() + ' (' + new Date(dateStr).toLocaleTimeString() + ')' : '';
    };
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleModalClose = () => setIsModalOpen(false);
    const handleModalShow = () => setIsModalOpen(true);

    return (
        
        <div style={{ backgroundColor: '#f2ede4' }}>
        <NavbarDashboard />
        <header className="header1 login-fetch">
        <div className="dashboard">
            <h2>{user.name || "Guest"} ({user.email})<img src={user.profilePictureUrl} alt="Profile" /></h2>
        </div>
        </header>
               <div className='banner-detail'>
               <div className="container-fluid offer-detail detail" >
                    <div className="container-fluid offer1-detail" data-aos="" data-aos-duration="500">
                        <div className="container offer-layout-detail" style={{ backgroundImage: `url(${activityDetailEdit.imageUrls})`, height: '500px' }}>
                            
                        </div>
                    </div>
                </div>
                 {/* body */}
                 <div className="tour-offer-container">
                    <div className="tour-offer-rating row container">
                        <div className="col">
                            <h2>{activityDetailEdit.title}</h2>
                            <p>ID: {activityDetailEdit.id}</p>
                        </div><div className="col">
                            <p className="banner-description">Price: IDR {activityDetailEdit.price}</p>
                            <p className="banner-description">Price Discount: <span>IDR {activityDetailEdit.price_discount}</span></p>
                            <p className="banner-description"><i className="bi bi-geo-alt"></i> {activityDetailEdit.city}, {activityDetailEdit.province}</p>
                            <p className="banner-description"><i className="bi bi-star-fill" style={{color: 'yellow', fontSize: '10px'}}></i> <span> {activityDetailEdit.rating} / 5 ({activityDetailEdit.total_reviews} Reviews)</span></p>
                        </div>
                    </div>
                    <div className="tour-offer-description">
                        <h3>Description</h3>
                        <p>{activityDetailEdit.description}</p>
                        <h3>Faciilities:</h3>
                        <p>{activityDetailEdit.facilities}</p>
                        <h3>Detail</h3>
                        <p>Created: {formatDate(activityDetailEdit.createdAt)}</p>
                        <p>Updated: {formatDate(activityDetailEdit.updatedAt)}</p>
                    </div>
                    <div className="tour-location">
                        <h3>Location:</h3>
                        <p>{activityDetailEdit.address}</p>
                        <div className="location-bar">
                            <div className="location-info">
                                <p><i className="bi bi-geo-alt"></i> {activityDetailEdit.city}, {activityDetailEdit.province}</p>
                            </div>
                            {windowWidth <= 768 ? (
                                <>
                                    <Button className="btn-map" variant="secondary" onClick={handleModalShow}>View Map</Button>
                                    <Modal show={isModalOpen} onHide={handleModalClose} centered>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Map Location</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div
                                                className="google-map"
                                                dangerouslySetInnerHTML={{ __html: activityDetailEdit.location_maps }}
                                            />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleModalClose}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </>
                            ) : (
                                <div
                                    className="google-map"
                                    dangerouslySetInnerHTML={{ __html: activityDetailEdit.location_maps }}
                                />
                            )}
                        </div>
                    </div>
                
                
                </div>
               </div>

            <FooterDashboard />
        </div>
    );
};

export default ActivityDetailEdit;
