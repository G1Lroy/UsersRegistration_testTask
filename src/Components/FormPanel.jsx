import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "../utils/validationSchema";
import "./FormPanel.css";
import UploadButton from "./UI/buttons/UploadButton";

const FormPanel = ({ positionsData, isPosListLoad, handleSubmit }) => {
  const fileInputRef = useRef(null);
  const formHandler = (values, { resetForm }) => {
    handleSubmit(values, resetForm);
    fileInputRef.current.value = null;
  };
  const inputs = [
    {
      type: "text",
      name: "name",
      placeholder: "Your name",
    },
    {
      type: "email",
      name: "email",
      placeholder: "Email",
    },
    {
      type: "text",
      name: "phone",
      placeholder: "Phone",
    },
  ];

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        position: "",
        position_id: "",
        registration_timestam: 0,
        photo: null,
      }}
      onSubmit={formHandler}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="form-panel">
          <div className="input-group">
            {inputs.map((input) => (
              <div className="input-container" key={input.name}>
                <Field
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                ></Field>
                <ErrorMessage
                  name={input.name}
                  component="div"
                  className={`error-message ${
                    values[input.name] ? "error-message--grey" : ""
                  }`}
                ></ErrorMessage>
                <label
                  className={`input-label ${
                    values[input.name] ? "input-label--active" : ""
                  }`}
                >
                  {input.placeholder}
                </label>
              </div>
            ))}
          </div>

          <div className="radio-group">
            <p>Select your position</p>
            {!isPosListLoad ? (
              positionsData.map((item) => (
                <div className="radio-item" key={item.id}>
                  <Field
                    id={item.id}
                    type="radio"
                    name="position"
                    value={item.name}
                    onClick={() => setFieldValue("position_id", item.id)}
                  ></Field>
                  <label className="radio-icon" htmlFor={item.id}></label>
                  <label className="radio-label" htmlFor={item.id}>
                    {item.name}
                  </label>
                </div>
              ))
            ) : (
              <div>loading...</div>
            )}
            <ErrorMessage
              name="position"
              component="div"
              className="error-message"
            />
          </div>

          {/* upload group */}
          <>
            <div
              className={`upload-group ${
                touched.photo && errors.photo ? "border--error" : ""
              }`}
            >
              <input
                hidden
                id="photo"
                ref={fileInputRef}
                type="file"
                accept=".jpg, .jpeg"
                onChange={(e) => {
                  setFieldValue("photo", e.target.files[0]);
                }}
              ></input>

              {values.photo ? (
                <>
                  <UploadButton
                    className={`upload-button 
                  ${touched.photo && errors.photo ? "upload-button--error" : ""}
                    `}
                    type="button"
                    onClick={() => {
                      fileInputRef.current.value = null;
                      setFieldValue("photo", null);
                    }}
                  >
                    Remove
                  </UploadButton>
                  <div className="preview-file">{values.photo.name}</div>
                </>
              ) : (
                <>
                  <UploadButton
                    className={`upload-button 
                  ${touched.photo && errors.photo ? "upload-button--error" : ""}
                    `}
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Upload
                  </UploadButton>
                  <label className="upload-label" htmlFor="photo">
                    Upload photo
                  </label>
                </>
              )}
            </div>
            <ErrorMessage
              name="photo"
              component="div"
              className="error-message"
            />
          </>

          <div className="button-group">
            <button type="submit">Sign up</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormPanel;
