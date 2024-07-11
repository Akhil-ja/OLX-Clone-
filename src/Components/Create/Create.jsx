import { useContext, useReducer, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../Store/context";
import Loading from "../Loading/Loading";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { failed, success } from "../../helpers/toastify";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "Name":
      return {
        ...state,
        Name: action.payload,
      };
    case "category":
      return {
        ...state,
        category: action.payload,
      };
    case "Price":
      return {
        ...state,
        Price: action.payload,
      };
    default:
      return state;
  }
};

const Create = () => {
  const [data, dispatch] = useReducer(reducer, {
    Name: "",
    category: "",
    Price: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { storage, firestore } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const date = new Date();

  async function handleSubmit() {
    if (data.Name.trim() === "") {
      failed("product name is required");
      return;
    }
    if (data.Price.trim() === "" || data.Price < 0 || data.Price > 1000000) {
      failed("invalid price");
      return;
    }
    if (data.category.trim() === "") {
      failed("product category is required");
      return;
    }

    setLoading(true);

    try {
      const imageRef = storageRef(storage, `/image${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      const url = await getDownloadURL(snapshot.ref);
      await addDoc(collection(firestore, "product"), {
        product: data.Name,
        Price: data.Price,
        category: data.category,
        url: url,
        userId: user.uid,
        createdAt: date.toDateString(),
      });
      success("record saved successfully");
      nav("/");
    } catch (error) {
      failed(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="centerDiv">
            <label htmlFor="fname">Product</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={data.Name}
              onChange={(e) => {
                dispatch({ type: "Name", payload: e.target.value });
              }}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={data.category}
              onChange={(e) => {
                dispatch({ type: "category", payload: e.target.value });
              }}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              name="Price"
              value={data.Price}
              onChange={(e) => {
                dispatch({ type: "Price", payload: e.target.value });
              }}
            />
            <br />
            {image && (
              <img
                alt="Posts"
                width="200px"
                height="200px"
                src={URL.createObjectURL(image)}
              />
            )}
            <br />
            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            <br />
            <button onClick={handleSubmit} type="submit" className="uploadBtn">
              Upload and Submit
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Create;
