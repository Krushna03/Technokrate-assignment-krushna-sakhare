import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../recoil/authAtom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { 
      email: "", 
      password: "" 
    },
    
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "Min 6 chars").required("Required"),
    }),
    
    onSubmit: (values) => {
      setAuth({ email: values.email });
      toast.success("Login successful");
      navigate("/dashboard");
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl text-center font-bold">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full mt-5 rounded-md"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email && <div className="text-red-500 text-sm">{formik.errors.email}</div>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mt-4 rounded-md"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password && <div className="text-red-500 text-sm">{formik.errors.password}</div>}

        <button type="submit" className="bg-blue-600 mt-5 text-white px-4 py-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;