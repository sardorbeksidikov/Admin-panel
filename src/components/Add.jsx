import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Button, Select } from "antd";
import { useForm } from "react-hook-form";

const Add = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    lastName: "",
    group: "N45",
    doesWork: false,
  });
  const btnClose = () => {
    navigate("/");
  };

 

  const hendelChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value.trim() });
  };

  const handleCheckboxChange = (e) => {
    setProduct({ ...product, doesWork: e.target.checked });
  };

  const save = async (data) => {
    try {
      await axios.post("http://localhost:3000/students", data);
      btnClose();
    } catch (error) {
      console.error("Saqlashda xatolik yuz berdi:", error);
      alert(
        "Ma'lumotlarni saqlashda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring."
      );
    }
  };
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors, touchedFields } = formState;

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <section className="add-product">
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 container mt-5 border">
              <label htmlFor="firstname" className="form-label mt-3">
                First Name
              </label>
              <input
                name="name"
                type="text"
                id="firstname"
                {...register("name", {
                  required: "First Name is required",
                })}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={product.name}
                onChange={hendelChange}
              />
              <span className="error">
                {touchedFields.fristname && errors?.fristname?.message}
              </span>
              <label htmlFor="lastname" className="form-label mt-3">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                id="lastname"
                {...register("lastName", {
                  required: "Last Name is required",
                })}
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                value={product.lastName}
                onChange={hendelChange}
              />
              <span className="error">
                {touchedFields.lastName && errors?.lastName?.message}
              </span>
              <Select
                name="group"
                id="group"
                className="form-select mt-3 w-auto"
                {...register("group")}
                defaultValue={product.group}
                onChange={(value) => setProduct({ ...product, group: value })}>
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
                  {...register("doesWork")}
                  defaultChecked={product.doesWork}
                  id="doeswork"
                  onChange={handleCheckboxChange}
                />
                Does Work
              </label>
            </div>
            <div className="d-flex gap-3">
              <Button type="submit" className="btn btn-success" onClick={save}>
                Save
              </Button>
              <Button className="btn btn-danger" onClick={btnClose}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Add;
