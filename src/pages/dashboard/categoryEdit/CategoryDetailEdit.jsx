import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCategoryById, fetchLogin } from "../../../api/api";
import NavbarDashboard from "../../../components/navbarDashboard/NavbarDasboard";
import FooterDashboard from "../../../components/navbarDashboard/FooterDashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './categoryedit.css';

const CategoryDetailEdit = () => {

    const [error, setError] = useState(null);
    const [user, setUser] = useState({});
    const [categoryDetail, setCategoryDetail] = useState({});
    const { id } = useParams();
    console.log(`Fetching details for category ID: ${id}`); // For debugging

    const fetchLoginData = async () => {
        try {
            const userData = await fetchLogin();
            setUser(userData);
        } catch (error) {
            setError('Failed to fetch login data. Please try again later.');
        }
    };
    const fetchCategoryId = () => {
        getCategoryById(id)
            .then((response) => {
                setCategoryDetail(response.data.data);
                console.log(response.data.data);
            })
            .catch((err) => {
                console.error('Failed to fetch category details:', err);
            });
    };

    useEffect(() => {
        fetchCategoryId();
    }, [id]);

    useEffect(() => {
        fetchLoginData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }
    
    const formatDate = (dateStr) => {
        return dateStr ? new Date(dateStr).toLocaleDateString() + ' (' + new Date(dateStr).toLocaleTimeString() + ')' : '';
    };

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
                        <div className="container offer-layout-detail" style={{ backgroundImage: `url(${categoryDetail.imageUrl})`, height: '500px' }}>
                            
                        </div>
                    </div>
                </div>
                 {/* body */}
                 <div className="tour-offer-container">
                    <div className="tour-offer-rating row container">
                        <div className="col">
                            <h2>{categoryDetail.name}</h2>
                            <p>ID: {categoryDetail.id}</p>
                        </div>
                    </div>
                    <div className="tour-offer-description">
                        <h3>Detail</h3>
                        <p>Created: {formatDate(categoryDetail.createdAt)}</p>
                         {/* header offer */}<p>Updated: {formatDate(categoryDetail.updatedAt)}</p>
                    </div>
                </div>
               </div>

            <FooterDashboard />
        </div>
    );
};

export default CategoryDetailEdit;
