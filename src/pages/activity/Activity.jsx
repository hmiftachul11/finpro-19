import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getActivities, getCategories } from "../../api/api";
import Layout from "../../components/layout/Layout";
import AOS from "aos";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';
import './activity.css';

const Activity = () => {
    const [activities, setActivities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isZoomed, setIsZoomed] = useState(false);
    const colors = ['#f2ede4', '#e2d6ba', '#e2d6ba', '#547255', '#547255', '#547255', '#d5d2cd', '#4392F6'];
    const navigate = useNavigate();

    const fetchActivities = () => {
        getActivities()
            .then(response => {
                setActivities(response.data.data);
            })
            .catch(error => {
                console.log('Error fetching activities:', error);
            });
    };

    const fetchCategories = () => {
        getCategories()
            .then(response => {
                setCategories(response.data.data);
            })
            .catch(error => {
                console.log('Error fetching categories:', error);
            });
    };

    useEffect(() => {
        fetchActivities();
        fetchCategories();
        AOS.init();
    }, []);

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

    return (
        <Layout>
            <div className="activity-header-page row">
                <div className="col-6">
                    <h3 className="tagline-activity">From Quaint Alleys to Majestic Skylines,<br/>Embrace Your Adventure.</h3> 
                </div>
            </div>

            <div className="activity-content">
                <div className="row activity-row">
                    <div className="row">
                    <div className="col-6"><p className="activity-title">{activities.length} activities available</p></div>
                    <div className="col-6">
                        <select className="drop-down" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="All">All</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <button className="btn btn-search" onClick={handleSearchClick}>Search</button>
                    </div></div>
                    {activities.map((activity, index) => (
                        <div className="col-md-3" key={index}>
                            <div className={`activity-card ${isZoomed ? 'zoom in' : ''}`} 
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
                                    <p className="activity-rating"><i className="bi bi-star-fill" style={{color: 'yellow', fontSize: '10px'}}></i> <span> {activity.rating} / 5 ({activity.total_reviews} Reviews)</span></p>
                                    <p className="activity-price">IDR {activity.price}</p>
                                    <p className="activity-price-discount"><span>IDR {activity.price_discount}</span></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Activity;
