import React from "react";
import Button from "../ui/button/Button";
import Container from "../ui/container/Container";
import Card from "../ui/card/Card";
import Title from "../ui/title/Title";

export default function CategorySection({
  images,
  filterType,
  title,
  reactIcon,
}) {
  const filterImage = (image) => {
    if (filterType === "trending") {
      return image.trending;
    } else if (filterType === "bottomwear") {
      return (
        !image.trending &&
        image.subCategory === "bottomwear" &&
        image.category !== "banner" &&
        image.category !== "banner2"
      );
    } else if (filterType === "topwear") {
      return (
        !image.trending &&
        image.subCategory === "topwear" &&
        image.category !== "banner" &&
        image.category !== "banner2"
      );
    } else {
      return false;
    }
  };

  return (
    <Container className="section">
      <Title className="category" reactIcon={reactIcon} title={title} />
      <Container className="categoryImage">
        {images.filter(filterImage).map((image, index) => (
          <Card
            key={index}
            type="category"
            image={image}
            route={`/${image.category}`}
          />
        ))}
      </Container>
      <Button className="button" title="View All" route={`/${filterType}`} />
    </Container>
  );
}
