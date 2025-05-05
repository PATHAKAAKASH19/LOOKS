import { useState, useEffect } from "react";
import { PiPantsLight } from "react-icons/pi";
import { IoShirtOutline } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import Container from "../../components/ui/container/Container";
import CategorySection from "../../components/categorySection/CategorySection";
import Spinner from "../../components/ui/spinner/Spinner";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";



export default function HomePage() {
  const [images, setImages] = useState(null);

  const [isLoading , setIsLoading] = useState(true);
  const {accessToken,  setAccessToken} = useAuth()
  const navigate = useNavigate()


  const BANNER_IMG = [
   

    {
      id:1,
      img:"image1.webp",
      alt:"shirts",
      link:"/collections/shirts"
    },

    
    {
      id:2,
      img:"image2.webp",
      alt:"jeans",
      link:"/collections/jeans"
    },

    {
      id:3,
      img:"image3.webp",
      alt:"oversized-tees",
      link:"/collections/oversized-tees"
    },

    {
      id:4,
      img:"image4.webp",
      alt:"polos",
      link:"/collections/polos"
    },
    
  ]

  const CATEGORY_SECTION = [
    {
      filterType: "trending",
      title: "SEASONAL TREND",
      reactIcon: <MdSunny style={{ color: "orange", fontSize: "50px" }} />,
      
    },
    {
      filterType: "bottomwear",
      title: "BOTTOM WEAR",
      reactIcon: <PiPantsLight style={{ color: "orange", fontSize: "40px" }} />,
      
    },

    {
      filterType: "topwear",
      title: "TOP WEAR",
      reactIcon: (
        <IoShirtOutline style={{ color: "orange", fontSize: "30px" }} />
      ),

    },
  ];

  useEffect(() => {
    const fetchImages = async () => {

      
      try {

      

        setIsLoading(true)
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category/`);
        const {categoryValue} = await res.json();
       
        
        if(res.status === 200){
          setImages(categoryValue);
        }else if(res.status === 404){
          setImages([]);
        }

      
      
        setIsLoading(false)
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
     if(!accessToken && localStorage.getItem("userAccessToken")){
       setAccessToken(localStorage.getItem("userAccessToken"))
      }
   }, [accessToken,  setAccessToken])

  useEffect(() => {
   
   window.scrollTo(0, 0);
  }, []);


  const navigateToProductPage = (link) => {
     navigate(link)
  }

  
 
  


  const [currentSlide, setCurrentSlide] = useState(0);
  // Calculate visible slides based on screen width
  const [visibleSlides, setVisibleSlides] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setVisibleSlides(window.innerWidth >= 1024 ? 2 : 1);;
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % (BANNER_IMG.length - visibleSlides +1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [BANNER_IMG.length, visibleSlides]);








  return (
    <Container className="home">
      {isLoading ? (<Spinner></Spinner>):(
        <Container>
           <div className="banner-slider">
          <div 
        className="slider-container"
        style={{ 
          transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)`,
        
        
        }}
      >
        {BANNER_IMG.map((banner,i) => (
          <div key={i} className="slide">
          <img 
              
              src={banner.img} 
              alt={banner.alt}
              className="banner-image"
             onClick={() =>  navigateToProductPage(banner.link)}
            />
         </div>
        ))}
      </div>
      
      <div className="slider-dots">
        {Array.from({ length: BANNER_IMG.length - visibleSlides+1  }).map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
        </div>
  ;

          {CATEGORY_SECTION.map((value, i) => (
          
            <CategorySection
               key={i}
              images={images}
              filterType={value.filterType}
              title={value.title}
              reactIcon={value.reactIcon}
             
            />
          ))}
        </Container>
      ) }
    </Container>
  );
}
