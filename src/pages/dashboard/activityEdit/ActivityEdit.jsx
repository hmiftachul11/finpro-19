import { useState, useEffect } from "react";
import { getActivities, getCategories, fetchLogin, deleteActivity } from "../../../api/api";
import { useNavigate } from 'react-router-dom';
import FooterDashboard from "../../../components/navbarDashboard/FooterDashboard";
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
import LayoutDashboard from "../../../components/layout/LayoutDashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './activityedit.css';

const ActivityEdit= () => {
    const [user, setUser] = useState({});
    const [activity, setActivity] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedActivity, setSelectedActivity] = useState({
        categoryId: '',
        title: '',
        description: '',
        imageUrls: [],
        price : 0,
        price_discount: 0,
        rating: 0,
        total_reviews: 0,
        facilities: '',
        address : '',
        province: '',
        city: '',
        location_maps: '',
    });
    const [activityImageFile, setActivityImageFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // State to check if editing or adding
    const [isDeleting, setIsDeleting] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        fetchLoginData();
        fetchActivity();
        fetchCategories();
    }, []);
    const fetchActivity = () => {
        getActivities()
            .then(response => setActivity(response.data.data))
            .catch(err => setError('Failed to fetch activities. Please try again later.'));
    };

    const fetchCategories = () => {
        getCategories()
            .then(response => {
                setCategories(response.data.data);
            })
            .catch(error => {
                console.log('Error fetching categories:', error);
            });
    };

    const fetchLoginData = async () => {
        try {
            const userData = await fetchLogin();
            setUser(userData);
        } catch (error) {
            setError('Failed to fetch login data. Please try again later.');
        }
    };
   

    const handleEditActivity = (activity) => {
        setSelectedActivity(activity);
        setShowModal(true);
        setIsEditing(true);
        setIsDeleting(false);
    };

    const handleAddActivity = () => {
        setSelectedActivity({
            categoryId: selectedCategory,
            title: '',
            description: '',
            imageUrls: [],
            price : 0,
            price_discount: 0,
            rating: 0,
            total_reviews: 0,
            facilities: '',
            address : '',
            province: '',
            city: '',
            location_maps: '',
        });
        setShowModal(true);
        setIsEditing(false);
        setIsDeleting(false);
    };

    const handleConfirmDelete = (activity) => {
        setSelectedActivity(activity);
        setIsEditing(false);
        setIsDeleting(true);
        setShowModal(true);
    };

    const handleDeleteActivity = () => {
        deleteActivity(selectedActivity.id)
            .then(() => {
                fetchActivity();
                setShowModal(false);
                alert("Activity deleted successfully!");
            })
            .catch(error => {
                console.error('Error deleting activity:', error);
                setError('Failed to delete activity. Please try again later.');
            });
    };

    const handleCategoryChange = (event) => {
        const newCategoryId = event.target.value;
        setSelectedCategory(newCategoryId);
        setSelectedActivity(prevActivity => ({
            ...prevActivity,
            categoryId: newCategoryId
        }));
    };
    
    const handleChange = (e) => {
        const { name, value} = e.target;
        setSelectedActivity(prev => ({ ...prev, [name]: value}));
    };

    const handleChangePrice = (e) => {
        const { value} = e.target;
        setSelectedActivity(prev => ({ ...prev, price: Number(value)}));
    };
    const handleChangePriceDiscount = (e) => {
        const { value} = e.target;
        setSelectedActivity(prev => ({ ...prev, price_discount: Number(value)}));
    };

    const handleChangeRating = (e) => {
        const { value} = e.target;
        setSelectedActivity(prev => ({ ...prev, rating: Number(value)}));
    };

    const handleChangeTotalReviews = (e) => {
        const { value} = e.target;
        setSelectedActivity(prev => ({ ...prev, total_reviews: Number(value)}));
    };

    const handleFileChange = (e) => {
        setActivityImageFile(e.target.files[0]);  
    };

    const handleSaveChanges = () => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            'Content-Type': 'application/json'
        };

        const API_URL = isEditing ?
            `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${selectedActivity.id}` :
            'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity';

        if (activityImageFile) {
            const formData = new FormData();
            formData.append('image', activityImageFile);
            axios.post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                const newImageUrl = response.data.url;
                const payload = { ...selectedActivity, imageUrls: [newImageUrl] };
                return axios.post(API_URL, payload, { headers });
                
            })
            .then(() => {
                setShowModal(false);
                fetchActivity();
                
            })
            .catch(error => {
                console.error('Error saving activity:', error);
                alert('Failed to save activity. Please try again later.');
            });
        } else {
            const payload = { ...selectedActivity };
            axios.post(API_URL, payload, { headers })
                .then(() => {
                    setShowModal(false);
                    fetchActivity();
                    fetchCategories();
                    
                })
                .catch(error => {
                    console.error('Error saving activity:', error);
                    alert("Failed to save activity. Please try again later.");

                });
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <LayoutDashboard>
            <div style={{ backgroundColor: '#f7f5f2', height: 'max-content', paddingBottom: '50px' }}>
                <header className="header1">
                    <div className="dashboard">
                        <h2>{user.name || "Guest"} ({user.email})<img src={user.profilePictureUrl} alt="Profile" /></h2>
                    </div>
                </header>

                <div className="content-1">
                    <div className="card-content-1">
                        <h2 className="banner-title">Activity List</h2>
                        <span className="banner-add"><button className="btn button-add" onClick={handleAddActivity}><i className="bi bi-plus-circle-fill pe-2"></i>Add Activity</button></span>
                        <div className="container text-center">
                            <div className="row align-items-center">
                                {activity.map((activities) => (
                                    <div className="col-md-6 mb-4" key={activities.id}>
                                        <div className="banner-card">
                                            <img src={activities.imageUrls} className="banner-image" alt={activities.title} />
                                            <div className="trip-info row">
                                                <div className="col-md-8">
                                                    <h5 className="banner-name">{activities.title}</h5>
                                                    <p className="banner-description">Price: IDR {activities.price}</p>
                                                    <p className="banner-description">Price Discount: <span>IDR {activities.price_discount}</span></p>
                                                    <p className="banner-description"><i className="bi bi-geo-alt"></i> {activities.city}, {activities.province}</p>
                                                    <p className="banner-description"><i className="bi bi-star-fill" style={{color: 'yellow', fontSize: '10px'}}></i> <span> {activities.rating} / 5 ({activities.total_reviews} Reviews)</span></p>
                                                </div>
                                                <div className="col-md-4">
                                                    <button className="btn banner-button" onClick={() => handleEditActivity(activities)}><i className="bi bi-pencil-square" ></i></button>
                                                    <button className="btn banner-button" onClick={() => handleConfirmDelete(activities)}><i className="bi bi-trash-fill"></i></button>
                                                    <button className="btn banner-button" onClick={() => navigate(`/dashboard/activity/${activities.id}`)}><i className="bi bi-journal-text"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterDashboard />

            <Modal className="modal-activity" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isDeleting ? 'Confirm Delete' : isEditing ? 'Edit Activity' : 'Add New Activity'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isDeleting ? (
                        <p>Are you sure you want to delete this activity: {selectedActivity.title}?</p>
                    ) : (
                        <Form>
                            <Form.Group controlId="formCategory"  hidden={isEditing}>
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange} >
                                    <option value="All">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="title" value={selectedActivity.title} onChange={handleChange} />
                            </Form.Group>
                           {isEditing && (
                               <Form.Group controlId="formImageUrl">
                                   <Form.Label>Image Url</Form.Label>
                                   <Form.Control type="text" name="imageUrl" value={selectedActivity.imageUrls} disabled/>
                               </Form.Group>
                           )}
                           <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description" value={selectedActivity.description} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" name="price" value={selectedActivity.price} onChange={handleChangePrice} />
                            </Form.Group>
                            <Form.Group controlId="formPriceDiscount">
                                <Form.Label>Price Discount</Form.Label>
                                <Form.Control type="number" name="price_discount" value={selectedActivity.price_discount} onChange={handleChangePriceDiscount} />
                            </Form.Group>
                            <Form.Group controlId="formRating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control type="number" name="rating" value={selectedActivity.rating} onChange={handleChangeRating} />
                            </Form.Group>
                            <Form.Group controlId="formTotalReviews">
                                <Form.Label>Total Reviews</Form.Label>
                                <Form.Control type="number" name="total_reviews" value={selectedActivity.total_reviews} onChange={handleChangeTotalReviews} />
                            </Form.Group>
                            <Form.Group controlId="formFacilities">
                                <Form.Label>Facilities</Form.Label>
                                <Form.Control type="text" name="facilities" value={selectedActivity.facilities} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address" value={selectedActivity.address} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formProvince">
                                <Form.Label>Province</Form.Label>
                                <Form.Control type="text" name="province" value={selectedActivity.province} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" name="city" value={selectedActivity.city} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formMaps">
                                <Form.Label> Location Maps</Form.Label>
                                <Form.Control type="text" name="location_maps" value={selectedActivity.location_maps} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formImageFile">
                                <Form.Label>New Image File</Form.Label>
                                <Form.Control type="file" name="imageFile" onChange={handleFileChange} />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    {isDeleting ? (
                        <Button variant="danger" onClick={handleDeleteActivity}>Delete</Button>
                    ) : (
                        <Button variant="primary" onClick={handleSaveChanges}>{isEditing ? 'Save Changes' : 'Create Activity'}</Button>
                    )}
                </Modal.Footer>
            </Modal>
        </LayoutDashboard>
    );
};

export default ActivityEdit;
