import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Navbar />
      <div className="my-10 p-10 bg-base-200 rounded-3xl w-96 relative motion-preset-pop">
        <h1 className="text-3xl font-black">About</h1>
        <p className="text-md mt-4">
          This is a Fork of <a href="https://github.com/leanghok120/comfi">Comfi</a>  
        </p>
      </div>
    </div>
  );
}
