import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import url from "../config";

export default function Create() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setdescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const endpoint = `${url}cards`;
  const navigate = useNavigate();
  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${url}users/me`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("username", user.username);
      formData.append("pfp", user.pfp);
      
      if (image) {
        formData.append("image", image);
      }

      await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `bearer ${token}`,
        },
      });

      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Navbar />
      <h1 className="text-5xl font-black">Create</h1>
      <form
        className="mt-10 flex flex-col gap-2 bg-base-200 p-10 rounded-2xl motion-preset-pop"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setTitle(e.target.value)}
          maxLength="20"
          required={true}
          disabled={loading}
        />
        <textarea
          placeholder="Description"
          value={description}
          className="textarea textarea-bordered w-full max-w-xs"
          onChange={(e) => setdescription(e.target.value)}
          maxLength="200"
          required={true}
          disabled={loading}
        />
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          accept="image/*, .gif"
          onChange={(e) => setImage(e.target.files[0])}
          name="image"
          required={false}
          disabled={loading}
        />
        <p className="text-warning mb-2 font-bold">
          Note: File needs to be less than 5mb
        </p>
        <button className="btn btn-primary" disabled={loading}>
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Create"
          )}
        </button>
      </form>
    </div>
  );
}