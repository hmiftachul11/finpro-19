import { useState, useEffect } from "react";
import { getPromos, fetchLogin, deletePromo } from "../../../api/api";
import { useNavigate } from 'react-router-dom';
import FooterDashboard from "../../../components/navbarDashboard/FooterDashboard";
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
import LayoutDashboard from "../../../components/layout/LayoutDashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../promoEdit/promoedit.css';

const PromoEdit= () => {
    const [user, setUser] = useState({});
    const [promo, setPromo] = useState([]);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState({
        title: '',
        imageUrl: '',
        description: '',
        terms_condition: '',
        promo_code: '',
        promo_discount_price: 0,
        minimum_claim_price: 0});
    const [promoImageFile, setPromoImageFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // State to check if editing or adding
    const [isDeleting, setIsDeleting] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        fetchLoginData();
        fetchPromo();
    }, []);

    const fetchLoginData = async () => {
        try {
            const userData = await fetchLogin();
            setUser(userData);
        } catch (error) {
            setError('Failed to fetch login data. Please try again later.');
        }
    };

    const fetchPromo = () => {
        getPromos()
            .then(response => setPromo(response.data.data))
            .catch(error => setError('Failed to fetch promos. Please try again later.'));
    };

    const handleEditPromo = (promo) => {
        setSelectedPromo(promo);
        setShowModal(true);
        setIsEditing(true);
        setIsDeleting(false);
    };

    const handleAddPromo = () => {
        setSelectedPromo({
            title: '',
            imageUrl: '',
            description: '',
            terms_condition: '',
            promo_code: '',
            promo_discount_price: 0,
            minimum_claim_price: 0
        });
        setShowModal(true);
        setIsEditing(false);
        setIsDeleting(false);
    };

    const handleConfirmDelete = (promo) => {
        setSelectedPromo(promo);
        setIsEditing(false);
        setIsDeleting(true);
        setShowModal(true);
    };

    const handleDeletePromo = () => {
        deletePromo(selectedPromo.id)
            .then(() => {
                fetchPromo();
                setShowModal(false);
                alert("Promo deleted successfully!");
            })
            .catch(error => {
                console.error('Error deleting promo:', error);
                setError('Failed to delete promo. Please try again later.');
            });
    };


    const handleChange = (e) => {
        const { name, value} = e.target;
        setSelectedPromo(prev => ({ ...prev, [name]: value, minimum_claim_price: Number(value)}));
    };
    const handleChangePromo = (e) => {
        const { value} = e.target;
        setSelectedPromo(prev => ({ ...prev, promo_discount_price: Number(value)}));
    };


   
    const handleFileChange = (e) => {
        setPromoImageFile(e.target.files[0]);  
    };

    const handleSaveChanges = () => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            'Content-Type': 'application/json'
        };

        const API_URL = isEditing ?
            `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${selectedPromo.id}` :
            'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo';

        if (promoImageFile) {
            const formData = new FormData();
            formData.append('image', promoImageFile);
            axios.post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                const newImageUrl = response.data.url;
                const payload = { ...selectedPromo, imageUrl: newImageUrl };
                return axios.post(API_URL, payload, { headers });
            })
            .then(() => {
                setShowModal(false);
                fetchPromo();
            })
            .catch(error => {
                console.error('Error saving promo:', error);
                setError('Failed to save promo. Please try again later.');
            });
        } else {
            const payload = { ...selectedPromo };
            axios.post(API_URL, payload, { headers })
                .then(() => {
                    setShowModal(false);
                    fetchPromo();
                })
                .catch(error => {
                    console.error('Error saving promo:', error);
                    setError('Failed to save promo. Please try again later.');
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
                        <h2 className="banner-title">Offer List</h2>
                        <span className="banner-add"><button className="btn button-add" onClick={handleAddPromo}><i className="bi bi-plus-circle-fill pe-2"></i>Add Promo</button></span>
                        <div className="container text-center">
                            <div className="row align-items-center">
                                {promo.map((promos) => (
                                    <div className="col-md-6 mb-4" key={promos.id}>
                                        <div className="banner-card">
                                            <img src={promos.imageUrl} className="banner-image" alt="banner" />
                                            <div className="trip-info row">
                                                <div className="col-md-8">
                                                    <h5 className="banner-name">{promos.title}</h5>
                                                    <p className="banner-description" style={{ color: 'black' }}>PROMO CODE : <span style={{ color: '#4392F6', fontWeight: 'bold' }}>{promos.promo_code}</span></p>
                                                    <p className="banner-description"> Promo Price : {promos.promo_discount_price}</p>
                                                    <p className="banner-description"> Minimum Claim : {promos.minimum_claim_price}</p>
                                                
                                                </div>
                                                <div className="col-md-4">
                                                    <button className="btn banner-button" onClick={() => handleEditPromo(promos)}><i className="bi bi-pencil-square" ></i></button>
                                                    <button className="btn banner-button" onClick={() => handleConfirmDelete(promos)}><i className="bi bi-trash-fill"></i></button>
                                                    <button className="btn banner-button" onClick={() => navigate(`/dashboard/offer/${promos.id}`)}><i className="bi bi-journal-text"></i></button>
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
                    <Modal.Title>{isDeleting ? 'Confirm Delete' : isEditing ? 'Edit Promo' : 'Add New Promo'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isDeleting ? (
                        <p>Are you sure you want to delete this promo: {selectedPromo.title}?</p>
                    ) : (
                        <Form>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="title" value={selectedPromo.title} onChange={handleChange} />
                            </Form.Group>
                           {isEditing && (
                            
                               <Form.Group controlId="formImageUrl">
                                   <Form.Label>Image Url</Form.Label>
                                   <Form.Control type="text" name="imageUrl" value={selectedPromo.imageUrl} disabled/>
                               </Form.Group>
                           )}
                           <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description" value={selectedPromo.description} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formTermCondtion">
                                <Form.Label>Terms and Conditions</Form.Label>
                                <Form.Control type="text" name="terms_condition" value={selectedPromo.terms_condition} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formPromoCode">
                                <Form.Label>Promo Code</Form.Label>
                                <Form.Control type="text" name="promo_code" value={selectedPromo.promo_code} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formDiscountPrice">
                                <Form.Label>Promo Discount Price</Form.Label>
                                <Form.Control type="number" name="promo_dicount_price" value={selectedPromo.promo_discount_price} onChange={handleChangePromo} />
                            </Form.Group>
                            <Form.Group controlId="formMinumumClaim">
                                <Form.Label>Minimum Claim</Form.Label>
                                <Form.Control type="number" name="minumum_claim_price" value={selectedPromo.minimum_claim_price} onChange={handleChange} />
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
                        <Button variant="danger" onClick={handleDeletePromo}>Delete</Button>
                    ) : (
                        <Button variant="primary" onClick={handleSaveChanges}>{isEditing ? 'Save Changes' : 'Create Promo'}</Button>
                    )}
                </Modal.Footer>
            </Modal>
        </LayoutDashboard>
    );
};

export default PromoEdit;
