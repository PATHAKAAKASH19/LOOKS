import { useState, useEffect } from "react";
import { PiPantsLight } from "react-icons/pi";
import { IoShirtOutline } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import Container from "../../components/ui/container/Container";
import CategorySection from "../../components/categorySection/CategorySection";
import Spinner from "../../components/ui/spinner/Spinner";
import {Carousel} from "nuka-carousel"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";



export default function HomePage() {
  const [images, setImages] = useState(null);

  const [isLoading , setIsLoading] = useState(true);
  const {accessToken,  setAccessToken} = useAuth()
  const navigate = useNavigate()




  const IS_MOBILE = window.innerWidth <= 768
  
  const BANNER_IMG = [
    {
      id: 1,
      img: "image1.webp",
      alt: "shirts",
      link: "/collections/casual-shirts",
    },

    {
      id: 2,
      img: "image2.webp",
      alt: "jeans",
      link: "/collections/jeans",
    },

    {
      id: 3,
      img: "image3.webp",
      alt: "oversized-tees",
      link: "/collections/oversized-tees",
    },

    {
      id: 4,
      img: "image4.webp",
      alt: "polos",
      link: "/collections/polos",
    },
  ];

  const CATEGORY_SECTION = [
    {
      filterType: "trending",
      title: "SEASONAL TREND",
      reactIcon: (
        <MdSunny
          style={{
            color: "orange",
            fontSize: `${IS_MOBILE ? "28px" : "50px"}`,
          }}
        />
      ),
    },
    {
      filterType: "bottomwear",
      title: "BOTTOM WEAR",
      reactIcon: (
        <PiPantsLight
          style={{
            color: "orange",
            fontSize: `${IS_MOBILE ? "28px" : "50px"}`,
          }}
        />
      ),
    },

    {
      filterType: "topwear",
      title: "TOP WEAR",
      reactIcon: (
        <IoShirtOutline
          style={{
            color: "orange",
            fontSize: `${IS_MOBILE ? "25px" : "50px"}`,
          }}
        />
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
       
        setIsLoading(false);
      
       
      } catch (error) {
        console.log("error:", error);
        setIsLoading(false);
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

  
 
  




 







  return (
    <Container className="home">
      {isLoading ? (
        <Spinner height="90vh" width="100%"></Spinner>
      ) : (
        <Container>
          <Carousel
            showArrows={IS_MOBILE ? false : "always"}
            wrapMode="wrap"
            showDots
            autoplay={true}
            autoplayInterval={4000}
          >
            {BANNER_IMG.map((banner, i) => (
              <div key={i} className="slide">
                <img
                  src={banner.img}
                  alt={banner.alt}
                  className="banner-image"
                  onClick={() => navigateToProductPage(banner.link)}
                />
              </div>
            ))}
          </Carousel>

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
      )}
    </Container>
  );
}
