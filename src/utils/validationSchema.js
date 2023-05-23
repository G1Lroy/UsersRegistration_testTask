import * as Yup from "yup";
const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
        .matches(/^\+380\d{9}$/, "+38 (XXX) XXX-XX-XX")
        .required("Phone is required"),
    position: Yup.string().required("Position is required"),
    photo: Yup.mixed().required(" "),
});

export default validationSchema;