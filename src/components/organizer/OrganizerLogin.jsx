
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../services/organizer/organizerApi";
import { toast } from "react-toastify";

export default function OrganizerLogin() {
  const navigate = useNavigate();

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one special character"
        ),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await login(values);
        console.log("this is response: ", response);

        if (response?.data?.email) {
          localStorage.setItem("organizerIsLogged", JSON.stringify(true));
          localStorage.setItem("organizerEmail", response.data.email);
          localStorage.setItem("organizerName",response.data.authorityName)
          toast.success("Login successful!");
          navigate("/", { replace: true });
        } else {
          toast.error("Invalid login response");
        }
      } catch (error) {
        toast.error("Incorrect password");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Organizer Login
      </h2>

      <form onSubmit={formik.handleSubmit} className="grid gap-4">
        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border h-[48px] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-600">{formik.errors.email}</p>
        )}

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border h-[48px] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-sm text-red-600">{formik.errors.password}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-blue-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-blue-700 transition-colors shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95 disabled:opacity-50"
        >
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
