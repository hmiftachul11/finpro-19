import { useState, useEffect } from "react";
import { getCategories, fetchLogin, deleteCategory } from "../../../api/api";
import { useNavigate } from 'react-router-dom';
import FooterDashboard from "../../../components/navbarDashboard/FooterDashboard";
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
import LayoutDashboard from "../../../components/layout/LayoutDashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './categoryedit.css';

const CategoryEdit = () => {
    const [user, setUser] = useState({});
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({ name: '', imageUrl: '' }); // Default empty for add new
    const [categoryImageFile, setCategoryImageFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // State to check if editing or adding
    const [isDeleting, setIsDeleting] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        fetchLoginData();
        fetchCategory();
    }, []);

    const fetchLoginData = async () => {
        try {
            const userData = await fetchLogin();
            setUser(userData);
        } catch (error) {
            setError('Failed to fetch login data. Please try again later.');
        }
    };

    const fetchCategory = () => {
        getCategories()
            .then(response => setCategories(response.data.data))
            .catch(error => setError('Failed to fetch categories. Please try again later.'));
    };

    const handleEditCategory = (category) => {
        setSelectedCategory(category);
        setShowModal(true);
        setIsEditing(true);
        setIsDeleting(false);
    };

    const handleAddCategory = () => {
        setSelectedCategory({ name: '', imageUrl: '' }); // Resetting for new entry
        setShowModal(true);
        setIsEditing(false);
        setIsDeleting(false);
    };

    const handleConfirmDelete = (category) => {
        setSelectedCategory(category);
        setIsEditing(false);
        setIsDeleting(true);
        setShowModal(true);
    };

    const handleDeleteCategory = async () => {
        const result = await deleteCategory(selectedCategory.id, fetchCategory, setShowModal, setError);
        if (result.success) {
            fetchCategory();
            setShowModal(false);
            alert("Category deleted successfully!");
        }
    };


    const handleChange = (e) => {
        setSelectedCategory(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e) => {
        setCategoryImageFile(e.target.files[0]);  
    };

    const handleSaveChanges = () => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            'Content-Type': 'application/json'
        };

        const API_URL = isEditing ?
            `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${selectedCategory.id}` :
            'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-category';

        if (categoryImageFile) {
            const formData = new FormData();
            formData.append('image', categoryImageFile);
            axios.post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                const newImageUrl = response.data.url;
                const payload = { ...selectedCategory, imageUrl: newImageUrl };
                return axios.post(API_URL, payload, { headers });
            })
            .then(() => {
                setShowModal(false);
                fetchCategory();
            })
            .catch(error => {
                console.error('Error saving category:', error);
                setError('Failed to save category. Please try again later.');
            });
        } else {
            const payload = { ...selectedCategory };
            axios.post(API_URL, payload, { headers })
                .then(() => {
                    setShowModal(false);
                    fetchCategory();
                })
                .catch(error => {
                    console.error('Error saving category:', error);
                    setError('Failed to save category. Please try again later.');
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
                        <h2 className="banner-title">Category List</h2>
                        <span className="banner-add"><button className="btn button-add" onClick={handleAddCategory}><i className="bi bi-plus-circle-fill pe-2"></i>Add Category</button></span>
                        <div className="container text-center">
                            <div className="row align-items-center">
                                {categories.map((category) => (
                                    <div className="col-md-6 mb-4" key={category.id}>
                                        <div className="banner-card">
                                            <img src={category.imageUrl} className="banner-image" alt="banner" />
                                            <div className="trip-info row">
                                                <div className="col-md-8">
                                                    <h5 className="banner-name">{category.name}</h5>
                                                    <p className="banner-description">ID : {category.id}</p>
                                                    <p className="banner-description">Created : {category.createdAt.slice(0, 10)} <i className="bi bi-alarm"></i> {category.createdAt.slice(11, 19)}</p>
                                                    <p className="banner-description">Updated : {category.updatedAt.slice(0, 10)} <i className="bi bi-alarm"></i> {category.updatedAt.slice(11, 19)}</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <button className="btn banner-button" onClick={() => handleEditCategory(category)}><i className="bi bi-pencil-square" ></i></button>
                                                    <button className="btn banner-button" onClick={() => handleConfirmDelete(category)}><i className="bi bi-trash-fill"></i></button>
                                                    <button className="btn banner-button" onClick={() => navigate(`/dashboard/category/${category.id}`)}><i className="bi bi-journal-text"></i></button>
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
                    <Modal.Title>{isDeleting ? 'Confirm Delete' : isEditing ? 'Edit Category' : 'Add New Category'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isDeleting ? (
                        <p>Are you sure you want to delete this category: {selectedCategory.name}?</p>
                    ) : (
                        <Form>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" value={selectedCategory.name} onChange={handleChange} />
                            </Form.Group>
                           {isEditing && (
                               <Form.Group controlId="formImageUrl">
                                   <Form.Label>Image Url</Form.Label>
                                   <Form.Control type="text" name="description" value={selectedCategory.imageUrl} disabled/>
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
                        <Button variant="danger" onClick={handleDeleteCategory}>Delete</Button>
                    ) : (
                        <Button variant="primary" onClick={handleSaveChanges}>{isEditing ? 'Save Changes' : 'Create Category'}</Button>
                    )}
                </Modal.Footer>
            </Modal>
        </LayoutDashboard>
    );
};

export default CategoryEdit;
