import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginimg from "../../assets/images/login.svg";
import { useAuth } from "../../context/AuthContext";
import classes from "../../styles/Login.module.css";
import Button from "../Button";
import Form from "../Form";
import Illustration from "../Illustration";
import TextInput from "../formElement/TextInput";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await login(email, password);
      navigate("/");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Invalid Credentials");
      setLoading(false);
    }
  }
  return (
    <>
      <h1>Login to your account</h1>
      <div className="column">
        <Illustration img={loginimg} />
        <Form className={classes.login} onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Enter Email"
            icon="alternate_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
            icon="lock"
          />

          <Button disabled={loading} type="submit">
            {loading ? "Loading..." : <span>Submit Now</span>}
          </Button>
          {error.length > 2 && <p className="error">{error}</p>}
          <div className="info">
            Don't have an account? <Link to="signup">Signup</Link> instead.
          </div>
        </Form>
      </div>
    </>
  );
}
