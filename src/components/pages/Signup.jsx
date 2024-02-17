import { useState } from "react";
import signupimg from "../../assets/images/signup.svg";
import classes from "../../styles/Signup.module.css";
import Button from "../Button";
import Form from "../Form";
import Illustration from "../Illustration";
import Checkbox from "../formElement/Checkbox";
import TextInput from "../formElement/TextInput";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Password don't match!");
    }
    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
      navigate("/");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("An error occured during creating account!");
      setLoading(false);
    }
  }
  return (
    <>
      <h1>Create an Account</h1>
      <div className="column">
        <Illustration img={signupimg} />
        {/*Form   */}
        <Form className={classes.signup} onSubmit={handleSubmit}>
          <TextInput
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Name"
            icon="person"
          />
          <TextInput
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon="alternate_email"
          />
          <TextInput
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon="lock"
          />
          <TextInput
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon="lock_clock"
          />
          <Checkbox value={agree} onChange={(e) => setAgree(e.target.value)}>
            <span> I agree to the Terms & Conditions</span>
          </Checkbox>
          <Button disabled={loading} type="submit">
            <span>Submit Now</span>
          </Button>
          {error.length > 1 && <p className="error">{error}</p>}
          <div className="info">
            Already have an account? <a href="login.html">Login</a> instead.
          </div>
        </Form>
      </div>
    </>
  );
}
