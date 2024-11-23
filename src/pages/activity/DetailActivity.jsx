import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getActivityById } from "../../api/api";
import { Modal, Button } from "react-bootstrap";
import Layout from "../../components/layout/Layout";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './detailactivity.css';

const DetailActivity = () => {
    const [detailActivity, setDetailActivity] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { id } = useParams();
    console.log(`Fetching details for activity ID: ${id}`); // For debugging

    
    const fetchDetailActivity = () => {
       getActivityById(id)
            .then((response) => {
                setDetailActivity(response.data.data);
                console.log(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);




    useEffect(() => {
        fetchDetailActivity();
    }, [id]);

    const handleModalClose = () => setIsModalOpen(false);
    const handleModalShow = () => setIsModalOpen(true);
    const backgroundImageUrl = detailActivity.imageUrls;

    return (
        <div style={{ backgroundColor: '#f2ede4' }}>
            <Layout>
            {/* header  */}
            <div className="detail-header-page row " style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
            <div className="col">
                <h3 className="tagline-detail" >{detailActivity.title}</h3> 
                <div className="breadcrumb-detail">
                <Breadcrumb>
                    <Breadcrumb.Item href="/" >Home</Breadcrumb.Item>
                    {/* <Breadcrumb.Item href="/activity">
                        Activity
                    </Breadcrumb.Item> */}
                    <Breadcrumb.Item active >{detailActivity.title}</Breadcrumb.Item>
                </Breadcrumb>
                </div>
            </div>
            </div>
            
            {/* body */}

            <div className="tour-container">
                <div className="tour-rating row container">
                <div className="col-md-6">
                    <h2>{detailActivity.title}</h2>
                    <p><i className="bi bi-geo-alt"></i> {detailActivity.city}, {detailActivity.province}</p>
                    <p><i className="bi bi-star-fill" style={{color: 'yellow', fontSize: '10px'}}></i> <span>  {detailActivity.rating}/ 5 ({detailActivity.total_reviews} Reviews)</span></p>
                </div>
                <div className="col-md-6 text-end">
                    <p>from</p>
                    <h2>IDR {detailActivity.price}</h2>
                    <p><del>IDR {detailActivity.price_discount}</del></p>
                </div>
                </div>
            
                <div className="tour-description">
                    <h3>Description:</h3>
                    <p>{detailActivity.description}</p>
                    <h3>Faciilities:</h3>
                    <p>{detailActivity.facilities}</p>
                </div>
            
                    <div className="tour-location">
                        <h3>Location:</h3>
                        <p>{detailActivity.address}</p>
                        <div className="location-bar">
                            <div className="location-info">
                                <p><i className="bi bi-geo-alt"></i> {detailActivity.city}, {detailActivity.province}</p>
                            </div>
                            {windowWidth <= 768 ? (
                                <>
                                    <Button className="btn-map" variant="secondary" onClick={handleModalShow}>View Map</Button>
                                    <Modal show={isModalOpen} onHide={handleModalClose} centered>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Map Location</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div
                                                className="google-map"
                                                dangerouslySetInnerHTML={{ __html: detailActivity.location_maps }}
                                            />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleModalClose}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </>
                            ) : (
                                <div
                                    className="google-map"
                                    dangerouslySetInnerHTML={{ __html: detailActivity.location_maps }}
                                />
                            )}
                        </div>
                    </div>
                
                    
               
                </div>

            </Layout>
        </div>
    )
}

export default DetailActivity;