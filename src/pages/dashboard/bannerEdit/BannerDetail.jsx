import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getBannerById, fetchLogin } from "../../../api/api";
import NavbarDashboard from "../../../components/navbarDashboard/NavbarDasboard";
import FooterDashboard from "../../../components/navbarDashboard/FooterDashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './banneredit.css';

const BannerDetail = () => {
    const [user, setUser] = useState({});
    const [bannerDetail, setBannerDetail] = useState({});
    const { id } = useParams();
    console.log(`Fetching details for banner ID: ${id}`); // For debugging

    useEffect(() => {
        fetchBannerId();
    }, [id]);

    useEffect(() => {
        fetchLoginData();
    }, []);
    
    const fetchLoginData = async () => {
        try {
            const userData = await fetchLogin();
            setUser(userData);
        } catch (error) {
            alert('Failed to fetch login data. Please try again later.');
        }
    };

    const fetchBannerId = () => {
        getBannerById(id)
            .then((response) => {
                setBannerDetail(response.data.data);
                console.log(response.data.data);
            })
            .catch((err) => {
                console.error('Failed to fetch banner details:', err);
            });
    };


    const formatDate = (dateStr) => {
        return dateStr ? new Date(dateStr).toLocaleDateString() + ' (' + new Date(dateStr).toLocaleTimeString() + ')' : '';
    };

    return (
        
        <div style={{ backgroundColor: '#fff' }}>
        <NavbarDashboard />
        <header className="header1 login-fetch">
        <div className="dashboard">
            <h2>{user.name || "Guest"} ({user.email})<img src={user.profilePictureUrl} alt="Profile" /></h2>
        </div>
        </header>
            
            {/* banner header*/}
               <div className='banner-detail'>
               <div className="container-fluid offer-detail detail" >
                    <div className="container-fluid offer1-detail" data-aos="" data-aos-duration="500">
                        <div className="container offer-layout-detail" style={{ backgroundImage: `url(${bannerDetail.imageUrl})`, height: '500px' }}>
                        </div>
                    </div>
                </div>
                 {/* body */}
                 <div className="tour-offer-container">
                    <div className="tour-offer-rating row container">
                        <div className="col">
                            <h2>{bannerDetail.name}</h2>
                            <p>ID: {bannerDetail.id}</p>
                        </div>
                    </div>
                    <div className="tour-offer-description">
                        <h3>Detail</h3>
                        <p>Created: {formatDate(bannerDetail.createdAt)}</p>
                         {/* header offer */}<p>Updated: {formatDate(bannerDetail.updatedAt)}</p>
                    </div>
                </div>
               </div>

            <FooterDashboard />
        </div>
    );
};

export default BannerDetail;
