import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        navigate("/");
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <button onClick={handleLogin} className="bg-blue-600 text-white px-6 py-3 rounded">
        Login with Google
      </button>
    </div>
  );
};

export default Login;
