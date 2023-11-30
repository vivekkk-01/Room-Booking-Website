import React from "react";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Register = () => {
  const submit = useNavigation();
  const isSubmitting = submit.state === "submitting";
  return (
    <div
      style={{ height: "calc(100vh - 29vh)" }}
      className="flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl text-center mb-4">Register</h1>
      <Form className="max-w-md mx-auto" method="post">
        <input type="text" name="name" placeholder="John Doe" />
        <input type="email" name="email" placeholder="your@email.com" />
        <input type="password" name="password" placeholder="password" />
        <button className="primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <ClipLoader loading={isSubmitting} size={22} color="#fff" />
          ) : (
            "Register"
          )}
        </button>
        <div className="text-center py-2">
          Already a member?{" "}
          <Link className="font-bold text-primary underline" to="/login">
            Login
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;

export const action = async ({ request }) => {
  const data = await request.formData();
  const registerData = {
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
  };
  const response = await fetch("https://room-booking-backend-iq12.onrender.com/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });
  const resData = await response.json();
  if (!response.ok) {
    window.alert(resData.message);
    return null;
  }
  return redirect("/login");
};
