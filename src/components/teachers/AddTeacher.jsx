import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Button, Select } from "antd";

const AddTeacher = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    lastName: "",
    group: "N45",
    level: "Sinior",
  });
  const btnClose = () => {
    navigate("/");
  };

  const hendelChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value.trim() });
  };



  const save = async () => {
    await axios.post("http://localhost:3000/teacher", product).then((res) => {
      btnClose();
    });
  };

  return (
    <>
      <section className="add-product">
        <div className="container">
          <div className="add-product__item">
            <div className="mb-3 container mt-5 border">
              <label htmlFor="fristname" className="form-label mt-3">
                FristName
              </label>
              <input
                name="name"
                type="text"
                id="fristname"
                className="form-control"
                value={product.name}
                onChange={hendelChange}
              />
              <label htmlFor="lastname" className="form-label mt-3">
                LastName
              </label>
              <input
                name="lastName"
                type="text"
                id="lastname"
                className="form-control"
                value={product.lastName}
                onChange={hendelChange}
              />
              <Select
                name="group"
                id="group"
                className="form-select mt-3 w-auto"
                value={product.group}
                onChange={hendelChange}>
                <option value="N45">N45</option>
                <option value="N208">N208</option>
                <option value="N210">N210</option>
                <option value="N11">N11</option>
              </Select>
              <Select
                name="level"
                id="level"
                className="form-select mt-3 w-auto"
                value={product.level}
                onChange={hendelChange}>
                <option value="Sinior">Sinior</option>
                <option value="Midlle">Midlle</option>
                <option value="Junior">Junior</option>
              </Select>
            </div>
            <div className="d-flex gap-3">
              <Button className="btn btn-success" onClick={save}>
                Сохранить
              </Button>
              <Button className="btn btn-danger" onClick={btnClose}>
                Отмена
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddTeacher;



