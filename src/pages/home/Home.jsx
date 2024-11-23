import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { getBanners, getCategories, getPromos } from "../../api/api";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./home.css";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [promos, setPromos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Menampilkan 3 item per halaman
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bannersResponse = await getBanners();
        setBanners(bannersResponse.data.data);
        console.log("banner", bannersResponse.data.data);

        const categoriesResponse = await getCategories();
        setCategories(categoriesResponse.data.data);
        console.log("category", categoriesResponse.data.data);

        const promosResponse = await getPromos();
        setPromos(promosResponse.data.data);
        console.log("promo", promosResponse.data.data);
      } catch (error) {
        console.log(error);
      }
      AOS.init();
    };

    fetchData();
  }, []);

  // Function to handle next page
  const handleNextPage = () => {
    const maxPage = Math.ceil(categories.length / itemsPerPage);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate the current categories to display
  const currentCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      {/* Header */}
      <div className=" bg-blue-100 font-sans">
        <div
          className="mx-auto h-[100vh]"
          style={{
            backgroundImage:
              "url(./hero.svg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="max-w-screen-2xl mx-auto px-6 flex flex-col lg:flex-row items-start justify-between h-full d:pt-16 lg:pt-32 ">
            {/* Text Section */}
            <div className="w-full lg:w-3/5 px-4 mt-24 lg:mt-32 bg-[#9ddcfe] bg-opacity-50 p-5 rounded-xl">
              <p
                className="text-5xl lg:text-6xl font-bold"
                style={{ lineHeight: "1.3" }}
              >
                Embark on Unforgettable Journeys with <span className="text-[#4392F6] bg-slate-100 bg-opacity-50 px-2 py-1 rounded-xl">Trachel</span>
              </p>
              <p className="mt-4 text-lg py-6">
                Your gateway to discovering the hidden gems of Southeast Asia
                and beyond. Let us guide you to experiences you&lsquo;ll cherish
                forever.
              </p>
              <LinkContainer to="/activity">
                <button className="bg-gradient-to-r from-[#4088EE] to-[#3D81E1] text-white font-semibold w-36 md:w-64 h-12 md:h-14 text-sm md:text-lg rounded-full transition duration-300 ease-in-out hover:from-[#5C91E0] hover:to-[#2D69C1]">
                  Start Your Adventure
                </button>
              </LinkContainer>
            </div>

            {/* Carousel Section */}
            <div className="w-full lg:w-2/5 px-4 mt-12 lg:mt-0"></div>
          </div>
        </div>

        {/* Category Section */}
        <div className="bg-white py-16">
          <h2 className="text-center text-6xl font-bold mb-5 text-[#4392F6]">
            Travel Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-32 py-12">
            {currentCategories.length > 0 ? (
              currentCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-[#4392F6] shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() =>
                    navigate(`/activities-by-category/${category.id}`)
                  }
                >
                  <div className="relative rounded-t-lg overflow-hidden">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-56 object-cover"
                    />
                  </div>
                  <div className="bg-[#4392F6] p-4 text-center rounded-b-lg">
                    <h5 className="text-white font-bold">{category.name}</h5>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-3">Loading categories...</p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="mx-2 w-32 h-10 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-800 transition-all disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={
                currentPage === Math.ceil(categories.length / itemsPerPage)
              }
              className="mx-2 w-32 h-10 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-800 transition-all disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Promo Section */}
        <div className="relative px-32 mx-auto py-44"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1523496922380-91d5afba98a3?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        >
          {promos.length > 0 ? (
            <div className="flex flex-wrap bg-white shadow-lg rounded-xl overflow-hidden">
              {/* Left Section */}
              <div
                className="w-full md:w-1/2 p-8 rounded-l-xl"
                style={{ backgroundColor: "#4392F6" }}
              >
                <div className="flex flex-col justify-center h-full">
                  <h1 className="text-4xl font-extrabold mb-4 text-white">
                    {promos[3].title}
                  </h1>
                  <p className="text-lg mb-6 text-white leading-relaxed">
                    {promos[3].description}
                  </p>
                  <p className="mt-2 text-xl text-white">
                    from{" "}
                    <span className="font-bold">
                      Rp.{promos[3].promo_discount_price}
                    </span>{" "}
                    / person
                  </p>
                  <LinkContainer to="/offer">
                    <button className="mt-6 bg-white text-[#4392F6] rounded-full  font-bold shadow-md hover:shadow-lg hover:bg-blue-50 transition-all w-56 h-12">
                      Explore Offer
                    </button>
                  </LinkContainer>
                </div>
              </div>

              {/* Right Section */}
              <div className="w-full md:w-1/2 p-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Small Image 1 */}
                  <div className="relative rounded-lg overflow-hidden group">
                    <img
                      src="https://images.unsplash.com/photo-1586567078458-b5e499305b97?q=80&w=3331&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Promo Image 1"
                      className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <p className="text-white font-semibold">
                        Unique Destination 1
                      </p>
                    </div>
                  </div>

                  {/* Small Image 2 */}
                  <div className="relative rounded-lg overflow-hidden group">
                    <img
                      src="https://images.unsplash.com/photo-1681978313448-8f05ddc35b51?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Promo Image 2"
                      className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <p className="text-white font-semibold">
                        Unique Destination 2
                      </p>
                    </div>
                  </div>

                  {/* Large Image */}
                  <div className="col-span-2 relative rounded-lg overflow-hidden group">
                    <img
                      src={promos[3].imageUrl}
                      alt="Promo Image 3"
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-4">
                      <p className="text-white font-bold text-lg">HOT OFFER</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center">Loading promos...</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
