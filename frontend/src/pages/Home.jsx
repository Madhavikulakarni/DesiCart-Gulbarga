import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import '../pageStyles/Home.css'
import Navbar from '../components/Navbar';
import ImageSlider from '../components/ImageSlider';
import Product from '../components/Product';
import PageTitle from '../componentStyles/PageTitle';
import Loader from '../components/Loader';
import { useDispatch,useSelector } from 'react-redux';
import { getProduct, removeErrors } from '../features/products/productSlice';
import { toast } from 'react-toastify';



function Home() {
  const {loading,error,products, productCount} = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(removeErrors());
    }
  }, [error, dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Home - DesiCart Gulbarga Site" />
          <Navbar />
          <ImageSlider />
          <div className="home-container">
            <h2 className="home-heading">Trending Now</h2>
            <div className="home-product-container">
              {products.map((product, index) => (
                <Product product={product} key={index} />
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
 }

export default Home