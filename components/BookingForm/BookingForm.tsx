"use client";

import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import * as Yup from "yup";
import FormField from "@/components/FormField/FormField";
import { createBooking } from "@/lib/api";
import type { BookingRequest } from "@/types/camper";

type Props = {
  camperId: string;
};


export default function BookingForm({ camperId }: Props) {
  const t = useTranslations("Camper");

  const mutation = useMutation({
    mutationFn: (values: BookingRequest) => createBooking(camperId, values),
  });

  const schema = Yup.object({
    name: Yup.string()
      .trim()
      .matches(/^\p{L}[\p{L}\s'’-]*$/u, t("nameError"))
      .required(t("nameError")),
    email: Yup.string()
      .trim()
      .email(t("emailError"))
      .required(t("emailError")),
  });

  return (
    <div className="min-w-0 flex-1 rounded-2xl border border-gray-light p-11">
      <h3 className="text-xl font-semibold leading-[120%] text-main">
        {t("bookTitle")}
      </h3>
      <p className="mt-2 text-base font-normal leading-[150%] text-gray">
        {t("bookText")}
      </p>

      <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          mutation.mutate(
            { name: values.name.trim(), email: values.email.trim() },
            {
              onSuccess: () => {
                toast.success(t("success"));
                resetForm();
              },
              onError: () => toast.error(t("bookError")),
            }
          );
        }}
      >
        <Form className="mt-6 flex flex-col gap-6" noValidate>
           <FormField
            name="name"
            label={t("name")}
            autoComplete="name"
          />
          <FormField
            name="email"
            label={t("email")}
            type="email"
            autoComplete="email"
          />

          <button
            type="submit"
            disabled={mutation.isPending}
            className="mt-2 h-14 w-full rounded-full bg-button text-base font-medium leading-[150%] tracking-[-0.01em] text-white transition-colors hover:bg-button-hover disabled:opacity-50"
          >
            {mutation.isPending ? t("sending") : t("send")}
          </button>
        </Form>
      </Formik>
    </div>
  );
}