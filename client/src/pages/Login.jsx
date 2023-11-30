import ClipLoader from "react-spinners/ClipLoader";
import React from "react";
import { Form, json, Link, redirect } from "react-router-dom";
import { useNavigation } from "react-router-dom";

const Login = () => {
  const submit = useNavigation();
  const isSubmitting = submit.state === "submitting";
  console.log(isSubmitting, "is it submitting?");
  return (
    <div
      style={{ height: "calc(100vh - 30vh)" }}
      className="flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <Form className="max-w-md mx-auto" method="post">
        <input type="email" name="email" placeholder="your@email.com" />
        <input type="password" name="password" placeholder="password" />
        <button className="primary">
          {isSubmitting ? (
            <ClipLoader loading={isSubmitting} size={22} color="#fff" />
          ) : (
            "Login"
          )}
        </button>
        <div className="text-center py-2">
          Don't have an account yet?{" "}
          <Link className="font-bold text-primary underline" to="/register">
            Register now
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;

export const action = async ({ request }) => {
  const data = await request.formData();
  const registerData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  const response = await fetch("https://room-booking-backend-iq12.onrender.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });
  const resData = await response.json();
  if (!response.ok) {
    window.alert(resData.message);
    resData.message = "";
    return null;
  }
  localStorage.setItem("user", JSON.stringify(resData));
  setTimeout(() => {
    window.location.reload();
  }, 500);
  return redirect("/");
};

export const loader = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return redirect("/account");
  }
  return null;
};
