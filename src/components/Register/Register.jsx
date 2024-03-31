import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Register = () => {
  const [registererror, setregistererror] = useState("");
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    const name = e.target.name.value;
    console.log(email, name, password);
    setregistererror("");
    setSuccess("");
    if (password.length < 6) {
      setregistererror("password should be at least 6 charecter");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setregistererror("you password should be uppercase");
      return;
    } else if (!accepted) {
      setregistererror("accept out terms conditions");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("user create successfully");
        updateProfile(result.user, {
          displayName: name,
          photoURL: null,
        })
          .then(() => {
            console.log("profile update");
          })
          .catch((error) => {
            console.log(error);
          });
        sendEmailVerification(result.user).then(() => {
          alert("please check you verification email");
        });
      })
      .catch((error) => {
        console.error(error);
        setregistererror("already use");
      });
  };
  return (
    <div className="mx-auto">
      <div className="mx-auto  md:w-1/2">
        <h2 className="text-3xl">This is register</h2>
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleRegister}>
          <input
            className="border border-rose-600 py-2 px-4 w-full mb-4"
            type="email"
            name="email"
            id=""
            placeholder=" Email address..."
            required
          />
          <input
            className="border border-rose-600 py-2 px-4 w-full mb-4"
            type="text"
            name="name"
            id=""
            placeholder=" Your Name..."
            required
          />
          <br />

          {registererror && <p className="text-red-600">{registererror}</p>}
          <div className="mb-4 relative">
            <input
              className="border  border-rose-600 py-2 px-4 w-full"
              type={show ? "text" : "password"}
              name="password"
              id=" "
              placeholder=" password..."
              required
            />{" "}
            <span
              className="absolute -ml-5 top-3"
              onClick={() => setShow(!show)}
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="mb-2 space-x-3">
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms">Accept out terms condition</label>
          </div>
          <br />

          <input
            className="btn btn-secondary py-2 px-4 w-full"
            type="submit"
            value="Register"
            name="submit"
            id=" "
          />
          <br />
          <p>
            Already have an account? <Link to="/login">Please login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
