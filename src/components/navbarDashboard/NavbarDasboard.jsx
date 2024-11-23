import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { getLogout } from '../../api/api';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './navbarDashboard.css';

const NavbarDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);
    const navigate = useNavigate();

    const handleLogout = useCallback(async () => {
        const result = await getLogout();
        if (result) {
            console.log('Redirecting to login page...');
            setTimeout(() => {
                navigate('/');  // Use navigate to redirect
            }, 1000);
        }
    }, [navigate]);

    return (
        <div>
            <button className="menu-toggle" onClick={toggleSidebar}><i className="bi bi-three-dots-vertical"></i></button>
            <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="logo">
                    <img src="/logo.webp" alt="logo" style={{ width: '135px', height: '35px' }}/>
                </div>
                <LinkContainer to="/dashboard">
                    <div className="sidebar-item">
                        <i className="bi bi-house-fill"></i>
                        <span>Home</span>
                    </div>
                </LinkContainer>
                <div className="sidebar-item" onClick={() => navigate('/all-user')}>
                    <i className="bi bi-people-fill"></i>
                    <span>All Users</span>
                </div>
                <div className="sidebar-item" onClick={() => navigate('/dashboard/banner')}>
                    <i className="bi bi-columns-gap"></i>
                    <span>Banner</span>
                </div>
                <div className="sidebar-item" onClick={() => navigate('/dashboard/offer')}>
                    <i className="bi bi-percent"></i>
                    <span>Offer</span>
                </div>
                <div className="sidebar-item" onClick={() => navigate('/dashboard/category')}>
                    <i className="bi bi-bookmarks-fill"></i>
                    <span>Category</span>
                </div>
                <div className="sidebar-item" onClick={() => navigate('/dashboard/activity')}>
                    <i className="bi bi-suitcase-fill"></i>
                    <span>Activity</span>
                </div>
                <div className="navbottom" style={{ marginTop: 'auto' }} onClick={handleLogout}>
                    <i className="bi bi-box-arrow-left"></i>
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
};

export default NavbarDashboard;
