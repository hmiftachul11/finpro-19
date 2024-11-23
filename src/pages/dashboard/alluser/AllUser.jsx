import { useState, useEffect } from "react";
import FooterDashboard from "../../../components/navbarDashboard/FooterDashboard";
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setShowModal, hideModal } from '../../../pages/dashboard/alluser/modalSlice';
import { fetchLogin, fetchAllUser, updateUserRole } from "../../../api/api";
import LayoutDashboard from "../../../components/layout/LayoutDashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './alluser.css';


const AllUser = () => {
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const { showModal, selectedUserId } = useSelector((state) => state.modal);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
         role: 'admin',
        
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(52);
    const colors = ['#f2ede4', '#e2d6ba', '#e2d6ba', '#547255', '#547255', '#547255', '#d5d2cd', '#4392F6'];
   
    useEffect(() => {
        fetchData();
       
    }, []);

    const handleEditRole = (userId) => {
        dispatch(setShowModal({ showModal: true, selectedUserId: userId }));
    };

    const handleCloseModal = () => {
        dispatch(hideModal());
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const fetchData = async () => {
        try {
            const userData = await fetchLogin();
            setUser(userData);

            const usersData = await fetchAllUser();
            setUsers(usersData);
        } catch (error) {
            setError('Failed to fetch data. Please try again later.');
        }
    };


    const handleSaveChanges = () => {
        updateUserRole(selectedUserId, formData)
            .then((data) => {
                const updatedUsers = users.map(user => {
                    if (user.id === selectedUserId) {
                        return { ...user, role: formData.role }; 
                    }
                    return user;
                });
                
                console.log(data);
                dispatch(setShowModal(false));
                setUsers(updatedUsers);
            })
            .catch((error) => {
                console.error(error);
                setError('Failed to update role. Please try again later.');
            });
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

                {/* content 1 */}
                <div className="content-1">
                    <div className="card-content-1">
                    <h2 className="alluser-title">All User Profile</h2>
                    <div className="container text-center">
                         {/* All user profile cards */}
                            <div className="row align-items-center">
                                {currentUsers.map((alluser, index) => (
                                    <div className="col-md-3 mb-4" key={alluser.id}>
                                        <div className={`alluser-card`} style={{ backgroundColor: `${colors[index % colors.length + 1]}` }}>
                                            <img src={alluser.profilePictureUrl} className="alluser-image" />
                                            <div className={`trip-info trip-info-color-${(index % colors.length) + 1}`}>
                                                <h5 className="alluser-name">{alluser.name}</h5>
                                                <p className="alluser-description"><i className="bi bi-envelope"></i> {alluser.email}</p>
                                                <p className="alluser-description"><i className="bi bi-telephone-fill"></i> {alluser.phoneNumber}</p>
                                                <p className="alluser-description"><i className="bi bi-person-gear"></i> {alluser.role}</p>
                                                <button className="btn alluser-button" onClick={() => handleEditRole(alluser.id)}>Edit Role</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                    </div>
                     {/* Pagination */}
                     <nav>
                        <ul className='pagination'>
                            {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
                                <li key={i} className='page-item'>
                                    <button onClick={() => paginate(i + 1)} className='page-link'>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                                            
                    </div>
                </div>
            </div>
            <FooterDashboard />


            {/* modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="col admin">
                                    <label htmlFor="roleSelect" className="form-label">Select Role</label>
                                    <select
                                    className="form-control2"
                                    id="roleSelect"
                                    name="role"
                                    value={users.role}
                                    onChange={handleChange}
                                    style={{ fontSize: '10px'}}
                                    >
                                    <option value="admin" onChange={handleChange}>Admin</option>
                                    <option value="user" onChange={handleChange}>User</option>
                                    </select>
                                </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal} style={{ fontSize: '10px'}}>Close</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </LayoutDashboard>
    );
}

export default AllUser;
