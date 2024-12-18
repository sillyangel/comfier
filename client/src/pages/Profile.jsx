import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import DeleteBtn from "../components/DeleteBtn";
import SettingsBtn from "../components/SettingsBtn";
import url from "../config"

export default function Profile() {
  const endpoint = `${url}users/me`;
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      setLoading(true);
      const res = await axios.get(endpoint, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      setUser(res.data.user);
      setPosts(res.data.posts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Navbar />
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Navbar />
      <div className="my-10 p-10 bg-base-200 rounded-3xl w-2/4 relative motion-preset-pop">
        <SettingsBtn username={user.username} fetchUser={fetchUser} />
        <img
          src={user.pfp}
          alt="Profile Picture"
          className="w-20 rounded-full"
        />
        <h1 className="text-3xl mt-2 font-black">{user.username}</h1>
        <p className="text-sm">{user.bio}</p>
        <div className="mt-4">
          <h2 className="font-bold text-2xl">Posts</h2>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <div className="bg-base-100 rounded-2xl h-fit" key={post._id}>
                <div className="relative p-4">
                  <DeleteBtn id={post._id} fetchUser={fetchUser} />
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="rounded-2xl w-full h-auto"
                    />
                  )}
                  <h2 className="font-semibold text-lg mt-2">{post.title}</h2>
                  <p className="text-sm">{post.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
