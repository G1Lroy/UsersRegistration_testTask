import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "../utils/validationSchema";
import "./FormPanel.css";

const FormPanel = ({ positionsData, isPosListLoad, handleSubmit }) => {
  const fileInputRef = useRef(null);
  const formHandler = (values, { resetForm }) => {
    handleSubmit(values, resetForm);
    fileInputRef.current.value = null;
  };

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
        <Form>
          <div className="input-group">
            <div>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div>
              <Field type="email" id="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <Field type="phone" id="phone" name="phone" placeholder="phone" />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>
          </div>

          <h3>Select your position</h3>
          {!isPosListLoad ? (
            <div className="radio-group">
              {positionsData.map((item) => (
                <div key={item.id}>
                  <label htmlFor={item.id}>{item.name}</label>
                  <Field
                    id={item.id}
                    type="radio"
                    name="position"
                    value={item.name}
                    onClick={() => setFieldValue("position_id", item.id)}
                  ></Field>
                </div>
              ))}

              <ErrorMessage name="position" component="div" className="error" />
            </div>
          ) : (
            <div>loading...</div>
          )}

          <div
            className={`upload-group ${
              touched.photo && errors.photo ? "upload-group--error" : ""
            }`}
          >
            <input
              id="photo"
              hidden
              ref={fileInputRef}
              type="file"
              accept=".jpg, .jpeg"
              onChange={(e) => {
                setFieldValue("photo", e.target.files[0]);
              }}
            ></input>
            {!values.photo ? (
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
              >
                Upload
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  fileInputRef.current.value = null;
                  setFieldValue("photo", null);
                }}
              >
                Remove
              </button>
            )}

            {values.photo ? (
              <div className="preview">{values.photo.name}</div>
            ) : (
              <label htmlFor="photo">Upload photo</label>
            )}
          </div>

          <div className="button-group">
            <button type="submit">Sign up</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormPanel;
