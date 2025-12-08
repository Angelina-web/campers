import { ErrorMessage, Field, Formik, Form, FormikHelpers } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import css from "./Form.module.css";

export default function BookingForm() {
  const initialValues = {
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    bookingDate: Yup.date().required("Booking date is required"),
    comment: Yup.string(),
  });

  const onSubmit = (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    console.log(values);
    toast.success("Booking success!");
    formikHelpers.resetForm();
  };

  return (
    <div className={css.formContainer}>
      <h3 className={css.formTitle}>Book your campervan now</h3>
      <p className={css.formText}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <Field name="name" placeholder="Name*" className={css.formElement} />
          <ErrorMessage
            name="name"
            render={(error) => <div className={css.error}>{error}</div>}
          />

          <Field
            name="email"
            type="email"
            placeholder="Email*"
            className={css.formElement}
          />
          <ErrorMessage
            name="email"
            render={(error) => <div className={css.error}>{error}</div>}
          />

          <Field
            name="bookingDate"
            type="date"
            placeholder="Booking date*"
            className={css.formElement}
          />
          <ErrorMessage
            name="bookingDate"
            render={(error) => <div className={css.error}>{error}</div>}
          />

          <Field
            name="comment"
            as="textarea"
            placeholder="Comment"
            className={css.formTextArea}
          />

          <button type="submit" className={css.formBtn}>
            Send
          </button>
        </Form>
      </Formik>

      <ToastContainer position="top-center" autoClose={2500} />
    </div>
  );
}
