import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOfferById} from "../../api/api";
import Layout from "../../components/layout/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './detailOffer.css';

const DetailOffer = () => {
    const [detailOffer, setDetailOffer] = useState({});
    const { id } = useParams();
    console.log(`Fetching details for activity ID: ${id}`); // For debugging

    
    const fetchDetailOffer = () => {
       getOfferById(id)
            .then((response) => {
                setDetailOffer(response.data.data);
                console.log(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchDetailOffer();
    }, [id]);
    return (
        <div style={{ backgroundColor: '#f2ede4' }}>
            <Layout>
    
            {/* header offer */}
            <div className="container-fluid offer-detail" >
                    <div className="container-fluid offer1-detail" data-aos="" data-aos-duration="500">
                    <div className="container offer-layout-detail" style={{ backgroundImage: `url(${detailOffer.imageUrl})`, height: '500px' }}>
                     </div>
                    </div>
                </div>
            
            {/* body */}

            <div className="tour-offer-container">
                <div className="tour-offer-rating row container">
                <div className="col-md-6">
                    <h2>{detailOffer.title}</h2>
                    <p><i className="bi bi-percent"></i> PROMO CODE: {detailOffer.promo_code}</p>
                    <p><i className="bi bi-check-circle-fill" style={{color: '#ffff', fontSize: '10px'}}></i> terms condition:  <span> {detailOffer.terms_condition}</span></p>
                </div>
                <div className="col-md-6 text-end">
                    <p>from</p>
                    <h2>IDR {detailOffer.promo_discount_price}</h2>
                    <p>minimum claim price: IDR {detailOffer.minimum_claim_price}</p>
                </div>
                </div>
            
                <div className="tour-offer-description">
                    <h3>Description:</h3>
                    <p>{detailOffer.description}</p>
                </div>

                </div>

            </Layout>
        </div>
    )
}

export default DetailOffer;