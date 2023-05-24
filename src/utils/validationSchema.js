import * as Yup from "yup";
const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'The name must be at least 2 characters').required("Name is required"),
    email: Yup.string().email("The email must be a valid email address").required("Email is required"),
    phone: Yup.string()
        .matches(/^\+380\d{9}$/, "+38 (XXX) XXX-XX-XX")
        .required("Phone is required"),
    position: Yup.string().required("Position is required"),
    photo: Yup.mixed().test("fileSize", "The photo size must not be greater than 5 Mb.", (value) => {
        if (!value) return true;
        return value.size <= 5 * 1024 * 1024;
    })
        .required("File is required"),
});

export default validationSchema;