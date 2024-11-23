
import { getPromos } from "../../api/api";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import AOS from "aos";
import Layout from "../../components/layout/Layout";
import './offer.css'
import 'aos/dist/aos.css';
import "bootstrap/dist/css/bootstrap.min.css";

const Offer = () => {
    const [promos, setPromos] = useState([]);
    const [isZoomed, setIsZoomed] = useState([]);
    const colors = ['#f2ede4', '#e2d6ba', '#e2d6ba', '#547255', '#547255', '#547255', '#d5d2cd', '#4392F6'];
    const navigate = useNavigate();

    const fetchPromo = () => {
        getPromos()
            .then((response) => {
                setPromos(response.data.data);
                console.log('promo', response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchPromo();
        AOS.init();
    }, []);

    return (
        <Layout>
        <div style={{ backgroundColor: '#fff', height: '100%'}}>
              {/* header offer */}
              <div className="container-fluid offer" >
                    <div className="container-fluid offer1" data-aos="" data-aos-duration="500">
                    <div className="container offer-layout" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', height: '500px' }}>
                                <div className="row" style={{ height: '100%' }}>
                                    <div className="col-6 text-left offer-header-section" > 
                                        <h1 data-aos="fade-right" data-aos-duration="700">
                                            Big Offer<br />
                                            by Trachel
                                        </h1 >
                                        <p data-aos="fade-right" data-aos-duration="900">Discover possibilities of travelling!</p>
                                    </div>
                                </div>
                     </div>
                    </div>
                </div>

                {/* content */}
                <div className="container mt-4">
                    <div className="row trip-row">
                    <p className="offer-title">{promos.length} trips available</p>
                    {promos.map((promo, index) => (
                        <div className="col-md-3 mb-4" key={index}>
                            <div className={`trip-card ${isZoomed ? 'zoom-in' : ''}`} 
                                onClick={() => {
                                    setIsZoomed(true); 
                                    setTimeout(() => navigate(`/offer/${promo.id}`), 300); 
                                }} 
                                onMouseLeave={() => setIsZoomed(false)}   style={{backgroundImage: `url(${promo.imageUrl})`}} >
                            <img src={promo.imageUrl} className="trip-image" alt={promo.title} />
                            <div className={`trip-info trip-info-color-${(index % colors.length) + 1}`}>
                                <h5 className="trip-name">{promo.title}</h5>
                                <p className="trip-location">Promo code: <span>{promo.promo_code}</span></p>
                                <p className="trip-price">from <span>IDR {promo.promo_discount_price}</span></p>
                            </div>
                            </div>
                        </div>
                        ))}



                    </div>
                </div>


        </div>
        </Layout>
    )
}

export default Offer;