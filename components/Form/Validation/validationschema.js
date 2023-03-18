import * as Yup from "yup";

export const baseSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter an email address"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .required("Please enter a password"),
});
export const UpdateSchema = Yup.object().shape({
  firstName: Yup.string().min(3, "First name must be at least 3 characters"),

  lastName: Yup.string().min(3, "Last name must be at least 3 characters"),

  email: Yup.string().email("Invalid email"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});

export const SignUpSchema = baseSchema.shape({
  firstName: Yup.string()
    .min(3, "First name must be at least 3 characters")
    .required("Please enter first name"),
  lastName: Yup.string()
    .min(3, "Last name must be at least 3 characters")
    .required("Please enter last name"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});
