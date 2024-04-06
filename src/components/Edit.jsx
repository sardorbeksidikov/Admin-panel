import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Select } from "antd";
import { useForm } from "react-hook-form";

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
      .get(`http://localhost:3000/students/${id}`)
      .then((res) => {
        setProduct(res.data); // Ma'lumotlarni yuklash
      })
      .catch((err) => console.log(err));
  }, [id]);

  const btnClose = () => {
    navigate("/");
  };

  const { register, handleSubmit, formState } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:3000/students/${id}`, data); // Ma'lumotlarni yangilash
      navigate("/"); // Boshqa sahifaga o'tish
    } catch (error) {
      console.error("Saqlashda xatolik yuz berdi:", error);
      // Foydalanuvchiga xabar berish
      alert(
        "Ma'lumotlarni saqlashda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring."
      );
    }
  };

  return (
    <>
      <section className="add-product">
        <div className="container">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 container mt-5 border">
              <label htmlFor="name" className="form-label mt-3">
                Ism
              </label>
              <input
                {...register("name", {
                  required: "Ism kerak",
                })}
                type="text"
                id="name"
                className="form-control"
                defaultValue={product.name}
              />
              <span className="error">
                {formState.errors.name && formState.errors.name.message}
              </span>
              <label htmlFor="lastName" className="form-label mt-3">
                Familiya
              </label>
              <input
                {...register("lastName", {
                  required: "Familiya kerak",
                })}
                type="text"
                id="lastName"
                className="form-control"
                defaultValue={product.lastName}
              />
              <span className="error">
                {formState.errors.lastName && formState.errors.lastName.message}
              </span>
              <Select
                {...register("group")}
                id="group"
                className="form-select mt-3 w-auto"
                defaultValue={product.group}>
                <option value="N45">N45</option>
                <option value="N208">N208</option>
                <option value="N210">N210</option>
                <option value="N11">N11</option>
              </Select>
              <label
                className="form-check-label mt-3 d-flex gap-2"
                htmlFor="doesWork">
                <input
                  type="checkbox"
                  {...register("doesWork")}
                  defaultChecked={product.doesWork}
                  id="doesWork"
                  className="form-check-input mb-3"
                />
                Ishlaydi
              </label>
            </div>
            <div className="d-flex mb-4 gap-3">
              <Button className="btn btn-success" type="submit">
                Saqlash
              </Button>
              <Button className="btn btn-danger" onClick={btnClose}>
                Bekor qilish
              </Button>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Edit;
