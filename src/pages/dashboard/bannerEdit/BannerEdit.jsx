import { useState, useEffect } from "react";
import { getBanners, fetchLogin, deleteBanner } from "../../../api/api";
import { useNavigate } from 'react-router-dom';
import FooterDashboard from "../../../components/navbarDashboard/FooterDashboard";
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
import LayoutDashboard from "../../../components/layout/LayoutDashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './banneredit.css';

const BannerEdit = () => {
    const [user, setUser] = useState({});
    const [banners, setBanners] = useState([]);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState({ name: '', imageUrl: '' }); // Default empty for add new
    const [bannerImageFile, setBannerImageFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // State to check if editing or adding
    const [isDeleting, setIsDeleting] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        fetchLoginData();
        fetchBanner();
    }, []);

    const fetchLoginData = async () => {
        try {
            const userData = await fetchLogin();
            setUser(userData);
        } catch (error) {
            setError('Failed to fetch login data. Please try again later.');
        }
    };

    const fetchBanner = () => {
        getBanners()
            .then(response => setBanners(response.data.data))
            .catch(error => setError('Failed to fetch banners. Please try again later.'))
            ;
    };

    const handleEditBanner = (banner) => {
        setSelectedBanner(banner);
        setShowModal(true);
        setIsEditing(true);
        setIsDeleting(false);
    };

    const handleAddBanner = () => {
        setSelectedBanner({ name: '', imageUrl: '' }); // Resetting for new entry
        setShowModal(true);
        setIsEditing(false);
        setIsDeleting(false);
    };

    const handleConfirmDelete = (banner) => {
        setSelectedBanner(banner);
        setIsEditing(false);
        setIsDeleting(true);
        setShowModal(true);
    };

    const handleDeleteBanner = () => {
        deleteBanner(selectedBanner.id)
            .then(() => {
                fetchBanner(); // Assuming fetchBanner is a function to refetch banners after deletion
                setShowModal(false);
                alert("Banner deleted successfully!");
            })
            .catch((error) => {
                console.error(error);
                setError('Failed to delete banner. Please try again later.');
            });
    };


    const handleChange = (e) => {
        setSelectedBanner(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e) => {
        setBannerImageFile(e.target.files[0]);  
    };

    const handleSaveChanges = () => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            'Content-Type': 'application/json'
        };

        const API_URL = isEditing ?
            `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${selectedBanner.id}` :
            'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner';

        if (bannerImageFile) {
            const formData = new FormData();
            formData.append('image', bannerImageFile);
            axios.post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                const newImageUrl = response.data.url;
                const payload = { ...selectedBanner, imageUrl: newImageUrl };
                return axios.post(API_URL, payload, { headers });
            })
            .then(() => {
                setShowModal(false);
                fetchBanner();
            })
            .catch(error => {
                console.error('Error saving banner:', error);
                setError('Failed to save banner. Please try again later.');
            });
        } else {
            const payload = { ...selectedBanner };
            axios.post(API_URL, payload, { headers })
                .then(() => {
                    setShowModal(false);
                    fetchBanner();
                })
                .catch(error => {
                    console.error('Error saving banner:', error);
                    setError('Failed to save banner. Please try again later.');
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
                        <h2 className="banner-title">Banner List</h2>
                        <span className="banner-add"><button className="btn button-add" onClick={handleAddBanner}><i className="bi bi-plus-circle-fill pe-2"></i>Add Banner</button></span>
                        <div className="container text-center">
                            <div className="row align-items-center">
                                {banners.map((banner) => (
                                    <div className="col-md-6 mb-4" key={banner.id}>
                                        <div className="banner-card">
                                            <img src={banner.imageUrl} className="banner-image" alt="banner" />
                                            <div className="trip-info row">
                                                <div className="col-md-8">
                                                    <h5 className="banner-name">{banner.name}</h5>
                                                    <p className="banner-description">ID : {banner.id}</p>
                                                    <p className="banner-description">Created : {banner.createdAt.slice(0, 10)} <i className="bi bi-alarm"></i> {banner.createdAt.slice(11, 19)}</p>
                                                    <p className="banner-description">Updated : {banner.updatedAt.slice(0, 10)} <i className="bi bi-alarm"></i> {banner.updatedAt.slice(11, 19)}</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <button className="btn banner-button" onClick={() => handleEditBanner(banner)}><i className="bi bi-pencil-square" ></i></button>
                                                    <button className="btn banner-button" onClick={() => handleConfirmDelete(banner)}><i className="bi bi-trash-fill"></i></button>
                                                    <button className="btn banner-button" onClick={() => navigate(`/dashboard/banner/${banner.id}`)}><i className="bi bi-journal-text"></i></button>
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

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isDeleting ? 'Confirm Delete' : isEditing ? 'Edit Banner' : 'Add New Banner'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isDeleting ? (
                        <p>Are you sure you want to delete this banner: {selectedBanner.name}?</p>
                    ) : (
                        <Form>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" value={selectedBanner.name} onChange={handleChange} />
                            </Form.Group>
                           {isEditing && (
                               <Form.Group controlId="formImageUrl">
                                   <Form.Label>Image Url</Form.Label>
                                   <Form.Control type="text" name="description" value={selectedBanner.imageUrl} disabled/>
                               </Form.Group>
                           )}
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
                        <Button variant="danger" onClick={handleDeleteBanner}>Delete</Button>
                    ) : (
                        <Button variant="primary" onClick={handleSaveChanges}>{isEditing ? 'Save Changes' : 'Create Banner'}</Button>
                    )}
                </Modal.Footer>
            </Modal>
        </LayoutDashboard>
    );
};

export default BannerEdit;
