import React, { useEffect, useState } from "react";
import Container from "../ui/container/Container";
import Title from "../ui/title/Title";
import InputBox from "../ui/inputBox/InputBox";
import { useFetcher, useParams } from "react-router-dom";

export default function FilterComponent({ searchParams, setSearchParams }) {
  const topWearObj = {
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: ["cotton", "cotton blend", "polyester", "linen"],
    style: [
      "checks",
      "plain",
      "printed",
      "self-design",
      "textured",
      "geometric",
    ],
    color: [
      "grey",
      "blue",
      "brown",
      "black",
      "navy",
      "purple",
      "dark green",
      "red",
      "orange",
      "light grey",
      "light blue",
      "green",
      "beige",
      "pink",
      "olive",
      "cream",
    ],
    price: [499, 999, 1499, 1999, 899],
  };

  const bottomWearObj = {
    sizes: ["28", "30", "32", "34", "36", "40"],
    material: [
      "cotton",
      "cotton blend",
      "polyster",
      "linen",
      "linen blend",
      "poly blend",
    ],
    style: ["loose fit", "regular fit", "relaxed fit", "slim fit"],
  };

  const bottomWearValue = ["trouser", "jeans", "joggers", "shorts"];
  const [filterProperties, setFilterProperties] = useState(topWearObj);
  const [filter, setFilter] = useState({});
  const { category } = useParams();

  useEffect(() => {
    const ChangeFilterProperties = () => {
      if (bottomWearValue.includes(category)) {
        setFilterProperties((prev) => ({ ...prev, ...bottomWearObj }));
      } else {
        setFilterProperties((prev) => ({ ...prev, ...topWearObj }));
      }
    };

    ChangeFilterProperties();
  }, [category]);

  const handleFilterInput = (e, keyValue) => {
    if (e.target.checked) {
      setFilter((prev) => ({
        ...prev,
        [keyValue]: [...(prev[keyValue] || []), e.target.name],
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        [keyValue]: prev[keyValue]?.filter((value) => value !== e.target.name),
      }));
    }
  };

  useEffect(() => {
    
    if (filter !== null) {
      const params = new URLSearchParams()
      for (const [key, values] of Object.entries(filter)) {

        values.length > 0
          ? values.forEach(value => {
            params.append(`${key}`, value)
          })
          : params.delete(`${key}`);
      }

      setSearchParams(params);
    }
  }, [filter]);

  return (
    <Container className="filter-sec">
      <Title title="filter" className="filter-title" />
      <Container className="filterBox">
        {Object.entries(filterProperties).map(([key, value]) => (
          <Container className="Box" key={`${key}_tfgf`}>
            <Title title={key} className="box-title" />
            <Container className="sub-box">
              {value.map((element, index) => (
                <Container key={`${index}_${key}`}>
                  <InputBox
                    type="checkbox"
                    id={element}
                    name={`${element}`}
                    onChange={(e) => handleFilterInput(e, key)}
                  ></InputBox>
                  <label htmlFor={element}>{element}</label>
                </Container>
              ))}
            </Container>
          </Container>
        ))}
      </Container>
    </Container>
  );
}
