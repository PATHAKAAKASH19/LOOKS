import React from "react";
import Container from "../ui/container/Container";
import Title from "../ui/title/Title";
import InputBox from "../ui/inputBox/InputBox";

export default function FilterComponent({ setFilter }) {
  return (
    <Container className="filter-sec">
      <Title title="filter" />
      <Container className="filterBox">
        <Container className="Box">
          <Title title="size" />
          <Container>
            <InputBox
              type="checkbox"
              id="S"
              value="S"
              name={`${"size"}`}
            ></InputBox>
            <label htmlFor="S">S</label>
          </Container>

          <Container>
            <InputBox
              type="checkbox"
              id="M"
              value="M"
              name={`${"size"}`}
            ></InputBox>
            <label htmlFor="M">M</label>
          </Container>

          <Container>
            <InputBox
              type="checkbox"
              id="L"
              value="L"
              name={`${"size"}`}
            ></InputBox>
            <label htmlFor="L">L</label>
          </Container>

          <Container>
            <InputBox
              type="checkbox"
              id="XL"
              value="XL"
              name={`${"size"}`}
            ></InputBox>
            <label htmlFor="XL">XL</label>
          </Container>

          <Container>
            <InputBox
              type="checkbox"
              id="XLL"
              value="XLL"
              name={`${"size"}`}
            ></InputBox>
            <label htmlFor="XLL">XLL</label>
          </Container>
        </Container>

        <Container className="Box">
          <Title title="Material"  />
          <Container>
            <InputBox
              type="checkbox"
              id="Cotton"
              value="Cotton"
              name={`${"Material"}`}
            ></InputBox>
            <label htmlFor="Cotton">Cotton</label>
          </Container>

          <Container>
            <InputBox
              type="checkbox"
              id="Cotton"
              value="Cotton"
              name={`${"Material"}`}
            ></InputBox>
            <label htmlFor="Cotton">Cotton</label>
          </Container>

          <Container>
            <InputBox
              type="checkbox"
              id="Cotton"
              value="Cotton"
              name={`${"Material"}`}
            ></InputBox>
            <label htmlFor="Cotton">Cotton</label>
          </Container>

          <Container>
            <InputBox
              type="checkbox"
              id="Cotton"
              value="Cotton"
              name={`${"Material"}`}
            ></InputBox>
            <label htmlFor="Cotton">Cotton</label>
          </Container>
        </Container>

        <Container className="Box">
          <Title title="Style" />
          <Container>
            <InputBox
              type="checkbox"
              id="Cotton"
              value="Cotton"
              name={`${"Material"}`}
            ></InputBox>
            <label htmlFor="Cotton">Cotton</label>
          </Container>

          <Container>
            <InputBox
              type="checkbox"
              id="Cotton"
              value="Cotton"
              name={`${"Material"}`}
            ></InputBox>
            <label htmlFor="Cotton">Cotton</label>
          </Container>

          <Container>
            <InputBox
              type="checkbox"
              id="Cotton"
              value="Cotton"
              name={`${"Material"}`}
            ></InputBox>
            <label htmlFor="Cotton">Cotton</label>
          </Container>

          <Container>
            <InputBox
              type="checkbox"
              id="Cotton"
              value="Cotton"
              name={`${"Material"}`}
            ></InputBox>
            <label htmlFor="Cotton">Cotton</label>
          </Container>
        </Container>

        <Container className="Box">
          <Title title="color" />
          <Container>
            <InputBox
              type="checkbox"
              id="Cotton"
              value="Cotton"
              name={`${"Material"}`}
            ></InputBox>
            <label htmlFor="Cotton">Cotton</label>
          </Container>

          <Container>
            <InputBox
              type="checkbox"
              id="Cotton"
              value="Cotton"
              name={`${"Material"}`}
            ></InputBox>
            <label htmlFor="Cotton">Cotton</label>
          </Container>

          <Container>
            <InputBox
              type="checkbox"
              id="Cotton"
              value="Cotton"
              name={`${"Material"}`}
            ></InputBox>
            <label htmlFor="Cotton">Cotton</label>
          </Container>

          <Container>
            <InputBox
              type="checkbox"
              id="Cotton"
              value="Cotton"
              name={`${"Material"}`}
            ></InputBox>
            <label htmlFor="Cotton">Cotton</label>
          </Container>
        </Container>

        <Container className="Box">
          <Title title="price" />
          <Container>
            <InputBox
              type="checkbox"
              id="Cotton"
              value="Cotton"
              name={`${"Material"}`}
            ></InputBox>
            <label htmlFor="Cotton">Cotton</label>
          </Container>

          <Container>
            <InputBox
              type="checkbox"
              id="Cotton"
              value="Cotton"
              name={`${"Material"}`}
            ></InputBox>
            <label htmlFor="Cotton">Cotton</label>
          </Container>

          <Container>
            <InputBox
              type="checkbox"
              id="Cotton"
              value="Cotton"
              name={`${"Material"}`}
            ></InputBox>
            <label htmlFor="Cotton">Cotton</label>
          </Container>

          <Container>
            <InputBox
              type="checkbox"
              id="Cotton"
              value="Cotton"
              name={`${"Material"}`}
            ></InputBox>
            <label htmlFor="Cotton">Cotton</label>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
