import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Select } from "antd";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    lastName: "",
    group: "N45",
    doesWork: false,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/teacher/${id}`)
      .then((res) => {
        setProduct({
          ...product,
          name: res.data.name,
          lastName: res.data.lastName,
          group: res.data.group,
          doesWork: res.data.doesWork,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleCheckboxChange = (e) => {
    setProduct({ ...product, doesWork: e.target.checked });
  };

  const btnClose = () => {
    navigate("/");
  };

  const editSave = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/students/${id}`, product)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <section className="add-product">
        <div className="container">
          <Form onSubmit={editSave}>
            <div className="mb-3 container  mt-5 border">
              <label htmlFor="fristname" className="form-label mt-3">
                FristName
              </label>
              <input
                name="name"
                type="text"
                id="fristname"
                className="form-control"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
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
                onChange={(e) =>
                  setProduct({ ...product, lastName: e.target.value })
                }
              />
              <Select
                name="group"
                id="group"
                className="form-select mt-3 w-auto"
                value={product.group}
                onChange={(e) =>
                  setProduct({ ...product, group: e.target.value })
                }>
                <option value="N45">N45</option>
                <option value="N208">N208</option>
                <option value="N210">N210</option>
                <option value="N11">N11</option>
              </Select>
              <label
                className="form-check-label mt-3 d-flex gap-2"
                htmlFor="doeswork">
                <input
                  type="checkbox"
                  className="form-check-input mb-3"
                  defaultChecked={product.doesWork}
                  id="doeswork"
                  onChange={handleCheckboxChange}
                />
                DoesWork
              </label>
            </div>
          </Form>
          <div className="d-flex mb-4 gap-3">
            <Button className="btn btn-success" onClick={editSave}>
              Сохранить
            </Button>
            <Button className="btn btn-danger" onClick={btnClose}>
              Отмена
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Edit;
