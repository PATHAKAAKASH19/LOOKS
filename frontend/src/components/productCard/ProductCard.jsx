import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../ui/container/Container";

export default function ProductCard({ route, data }) {
  const [isVisible, setIsVisible] = useState(false);

  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);

        observer.disconnect();
      }
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
  }, []);
  return (
    <div ref={imgRef}>
      {isVisible && (
        <Link className="link1" to={`${route}`} state={data}>
          <Container className="child">
            <Container className="img">
              <img src={data.productImgUrls[0]} alt={data.category} />
            </Container>
            <h2>{data.name}</h2>
          </Container>
        </Link>
      )}
    </div>
  );
}
