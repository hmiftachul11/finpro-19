import {  getCategoryById, getActivitiesByCategory, getCategories } from "../../api/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import Layout from "../../components/layout/Layout";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import AOS from "aos";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';
import './activity.css'


const ActivityByCategorires = () => {
    const [categories, setCategories] = useState([]);
    const [activitiesByCategory, setActivitiesByCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categoryById, setCategoryById] = useState([]);
    const [isZoomed, setIsZoomed] = useState(false);
    const { id } = useParams();
    const colors = ['#f2ede4', '#e2d6ba', '#e2d6ba', '#547255', '#547255', '#547255', '#d5d2cd', '#4392F6'];
    const navigate = useNavigate();

    const fetchCategories = () => {
        getCategories()
            .then(response => {
                setCategories(response.data.data);
            })
            .catch(error => {
                console.log('Error fetching categories:', error);
            });
    };


    const fetchCategoryById = () => {
        getCategoryById(id)
            .then((response) => {
                setCategoryById(response.data.data);
                console.log('category by id', response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
        
    }
    const fetchActivitiesBYCategory = () => {
        getActivitiesByCategory(id)
            .then((response) => {
                setActivitiesByCategory(response.data.data);
                console.log('activity by category', response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSearchClick = () => {

        if (selectedCategory !== 'All') {
            navigate(`/activities-by-category/${selectedCategory}`);
        } else {
            navigate(`/activity`);
        }
    };
    useEffect(() => {
        fetchActivitiesBYCategory();
        fetchCategoryById();
        AOS.init();
    }, [id]);

    useEffect(() => {
        fetchCategories();
    })
    return (
        <Layout>   
        {/* header  */}
            <div className="activity-header-page row " style={{backgroundImage: `url(${categoryById.imageUrl})`}}>
            <div className="col">
                <h3 className="tagline-activity" >Travel to {categoryById.name}<br/><span className="tagline-detail-activity" style={{fontWeight: 'normal'}}>Let's create unforgettable memories together by traveling to exciting destinations!</span></h3> 
                <div className="breadcrumb-detail">
                <Breadcrumb>
                    <Breadcrumb.Item href="/" >Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/activity" >Activity</Breadcrumb.Item>
                    <Breadcrumb.Item active >Travel to {categoryById.name}</Breadcrumb.Item>
                </Breadcrumb>
                </div>
            </div>
            </div>

        {/* content */}
        <div className="activity-content">
                    <div className="row activity-row">
                    <div className="row">
                    <div className="col-6"><p className="activity-title">{activitiesByCategory.length} activities available</p></div>
                    <div className="col-6">
                        <select className="drop-down" value={selectedCategory} onChange={handleCategoryChange}>
                            <option >All</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <button className="btn btn-search" onClick={handleSearchClick}>Search</button>
                    </div></div>
                    {activitiesByCategory.map((activity, index) => (
                        <div className="col-md-3" key={index}>
                            <div className={`activity-card ${isZoomed ? 'zoom-in' : ''}`} 
                                onClick={() => {
                                    setIsZoomed(true); 
                                    setTimeout(() => navigate(`/activity/${activity.id}`), 300); 
                                }} 
                                onMouseLeave={() => setIsZoomed(false)}  
                                style={{ backgroundImage: `url(${activity.imageUrls})` }}>
                            <img src={activity.imageUrls} className="activity-image" alt={activity.title} />
                            <div className={`activity-info activity-info-color-${(index % colors.length) + 1}`}>
                                
                                <h5 className="activity-name">{activity.title}</h5>
                                <p className="activity-location"><i className="bi bi-geo-alt"></i> {activity.city}, {activity.province}</p>
                                <p className="activity-rating"><i className="bi bi-star-fill" style={{color: 'yellow', fontSize: '10px'}}></i> <span> {activity.rating}/ 5 ({activity.total_reviews} Reviews)</span></p>
                                <p className="activity-price">IDR {activity.price}</p>
                                <p className="activity-price-discount"><span>IDR {activity.price_discount}</span></p>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                

        </div>

      </Layout>
    )
}

export default ActivityByCategorires;