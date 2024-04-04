import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { EditRoad } from "@mui/icons-material";

const EditTeacher = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    lastName: "",
    group: "N45",
    level: "Sinior",
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
          level: res.data.level,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  

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
          <form onSubmit={editSave}>
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
              <select
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
              </select>
              <select
                name="level"
                id="level"
                className="form-select mt-3 w-auto"
                value={product.level}
                onChange={(e) =>
                  setProduct({ ...product, level: e.target.value })
                }>
                <option value="Sinior">Sinior</option>
                <option value="Middle">Middle</option>
                <option value="Junior">Junior</option>
              </select>
            </div>
          </form>
          <div className="d-flex mb-4 gap-3">
            <button type="primery" onClick={editSave}>Сохранить</button>
            <button className="btn btn-danger" onClick={btnClose}>
              Отмена
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditTeacher;
