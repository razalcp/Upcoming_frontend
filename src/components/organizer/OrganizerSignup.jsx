import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../../services/organizer/organizerApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// ✅ Validation schema using Yup
const validationSchema = Yup.object({
  authorityName: Yup.string().required("Authority Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function OrganizerSignup() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      authorityName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {

        const result = await register(values)
        toast.success(`Signup successful for ${values.authorityName}!`)

        resetForm();
        navigate('/organizerLogin', { replace: true })
      } catch (error) {
        // console.log("This is error ",error.response.data.message);
        if (error.response.data.message == 'Email already exists') {


          toast.error("Email already exists, Try logging in");
        }

      }


    },
  });

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Organizer Signup
      </h2>

      <form onSubmit={formik.handleSubmit} className="grid gap-4">
        {/* Authority Name */}
        <input
          type="text"
          name="authorityName"
          placeholder="Authority Name"
          value={formik.values.authorityName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border h-[48px] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {formik.touched.authorityName && formik.errors.authorityName && (
          <p className="text-red-500 text-sm">{formik.errors.authorityName}</p>
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border h-[48px] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
        )}

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border h-[48px] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        )}

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border h-[48px] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-blue-700 transition-colors shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95"
        >
          Signup
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link
          to="/organizerLogin"
          className="text-blue-600 hover:underline font-medium"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
