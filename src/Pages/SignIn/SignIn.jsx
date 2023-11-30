import { useContext, useState } from "react";
import auth from "../../Firebase/Firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const SignIn = () => {
  const { signIn } = useContext(AuthContext);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        toast.success("Sign in with Google successful!");

        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
      })
      .catch((error) => {
        console.error(error);
        toast.error("Google Sign-In failed");
      });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setEmailError("");
    setPasswordError("");

    try {
      const userCredential = await signIn( email, password);
      const user = userCredential.user;
      console.log(user);
      toast.success("Sign-In successful with email and password!");
      e.target.email.value = "";
      e.target.password.value = "";
    } catch (error) {
      if (error.code === "auth/invalid-email" || error.code === "auth/user-not-found") {
        setEmailError("Email doesn't match.");
      } else if (error.code === "auth/wrong-password") {
        setPasswordError("Password doesn't match.");
      } else {
        toast.error("Sign-In failed. Please check your credentials.");
      }
    }
  };

  return (
    <div>
      <div className="hero bg-base-200 lg:my-24">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
           
          </div>
          <div className="card flex-shrink-0 shadow-2xl bg-base-100 md:w-[500px] w-[380px] lg:w-[500px] h-[800px]">
            <h1 className="text-5xl font-bold text-center mt-14">Sign In</h1>
            <form onSubmit={handleSignIn} className="h-[600px] lg:w-[490px] md:w-[490px] card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
                {emailError && (
                  <div className="text-red-500 mt-2">{emailError}</div>
                )}
              </div>
              <div className="form-control my-8">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                />
                {passwordError && (
                  <div className="text-red-500 mt-2">{passwordError}</div>
                )}
                <label className="label mt-5">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
     
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <div className="form-control mt-6">
                <button onClick={handleGoogleSignIn} className="btn btn-google">
                  <img
                    className="h-8"
                    src="https://i.ibb.co/Yb0mwP0/pngwing-com-4.png"
                    alt="pngwing-com-4"
                    border="0"
                  />
                  Sign In with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default SignIn;
