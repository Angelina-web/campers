import { ErrorMessage, Field, Formik, Form, FormikHelpers } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

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
    toast.success("Booking submitted!");
    formikHelpers.resetForm();
  };

  return (
    <div>
      <h3>Book your campervan now</h3>
      <p>Stay connected! We are always ready to help you.</p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <Field name="name" placeholder="Name*" />
          <ErrorMessage name="name" component="div" />

          <Field name="email" type="email" placeholder="Email*" />
          <ErrorMessage name="email" component="div" />

          <Field name="bookingDate" type="date" placeholder="Booking date*" />
          <ErrorMessage name="bookingDate" component="div" />

          <Field name="comment" as="textarea" placeholder="Comment" />

          <button type="submit">Send</button>
        </Form>
      </Formik>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
