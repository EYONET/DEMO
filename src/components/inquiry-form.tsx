"use client";

import { useActionState, useState } from "react";
import { submitInquiry } from "@/app/actions";
import type { InquiryActionState } from "@/lib/inquiry-action-state";
import type { PublishedService } from "@/lib/services";

const initialState: InquiryActionState = {};

type InquiryFormValues = {
  customer_name: string;
  email: string;
  phone: string;
  city: string;
  service_id: string;
  message: string;
  website: string;
};

const initialValues: InquiryFormValues = {
  customer_name: "",
  email: "",
  phone: "",
  city: "",
  service_id: "",
  message: "",
  website: "",
};

type InquiryFormProps = {
  services: PublishedService[];
  defaultServiceId?: string;
};

export default function InquiryForm({
  services,
  defaultServiceId = "",
}: InquiryFormProps) {
  const [values, setValues] = useState(() => ({
    ...initialValues,
    service_id: defaultServiceId,
  }));
  const [state, formAction, isPending] = useActionState(
    submitInquiry,
    initialState,
  );

  function updateField<Field extends keyof InquiryFormValues>(
    field: Field,
    value: InquiryFormValues[Field],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  if (state.success) {
    return (
      <div className="quote-form" aria-labelledby="estimate-heading">
        <div className="form-heading">
          <h3 id="estimate-heading">Request received</h3>
        </div>
        <p className="form-status" role="status">
          {state.message}
        </p>
      </div>
    );
  }

  const fieldError = (name: keyof NonNullable<InquiryActionState["fieldErrors"]>) =>
    state.fieldErrors?.[name]?.[0];

  return (
    <div className="quote-form" aria-labelledby="estimate-heading">
      <div className="form-heading">
        <h3 id="estimate-heading">Request an estimate</h3>
        <span>We’ll follow up to discuss details</span>
      </div>
      <form action={formAction} noValidate>
        <div className="form-row">
          <label>
            Your name
            <input
              autoComplete="name"
              name="customer_name"
              required
              maxLength={160}
              value={values.customer_name}
              onChange={(event) =>
                updateField("customer_name", event.currentTarget.value)
              }
              aria-invalid={Boolean(fieldError("customer_name"))}
              aria-describedby={
                fieldError("customer_name") ? "customer-name-error" : undefined
              }
            />
            {fieldError("customer_name") && (
              <span className="field-error" id="customer-name-error">
                {fieldError("customer_name")}
              </span>
            )}
          </label>
          <label>
            Email address
            <input
              autoComplete="email"
              type="email"
              name="email"
              required
              maxLength={320}
              value={values.email}
              onChange={(event) => updateField("email", event.currentTarget.value)}
              aria-invalid={Boolean(fieldError("email"))}
              aria-describedby={fieldError("email") ? "email-error" : undefined}
            />
            {fieldError("email") && (
              <span className="field-error" id="email-error">
                {fieldError("email")}
              </span>
            )}
          </label>
        </div>
        <div className="form-row">
          <label>
            Phone <span className="optional">(optional)</span>
            <input
              autoComplete="tel"
              type="tel"
              name="phone"
              maxLength={40}
              value={values.phone}
              onChange={(event) => updateField("phone", event.currentTarget.value)}
              aria-invalid={Boolean(fieldError("phone"))}
              aria-describedby={fieldError("phone") ? "phone-error" : undefined}
            />
            {fieldError("phone") && (
              <span className="field-error" id="phone-error">
                {fieldError("phone")}
              </span>
            )}
          </label>
          <label>
            City <span className="optional">(optional)</span>
            <input
              autoComplete="address-level2"
              name="city"
              maxLength={120}
              value={values.city}
              onChange={(event) => updateField("city", event.currentTarget.value)}
              aria-invalid={Boolean(fieldError("city"))}
              aria-describedby={fieldError("city") ? "city-error" : undefined}
            />
            {fieldError("city") && (
              <span className="field-error" id="city-error">
                {fieldError("city")}
              </span>
            )}
          </label>
        </div>
        <label>
          Service <span className="optional">(optional)</span>
          <select
            name="service_id"
            value={values.service_id}
            onChange={(event) =>
              updateField("service_id", event.currentTarget.value)
            }
            aria-invalid={Boolean(fieldError("service_id"))}
            aria-describedby={
              fieldError("service_id") ? "service-error" : undefined
            }
          >
            <option value="">Choose a service (optional)</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
          {fieldError("service_id") && (
            <span className="field-error" id="service-error">
              {fieldError("service_id")}
            </span>
          )}
        </label>
        <label>
          What would you like us to know?{" "}
          <span className="optional">(optional)</span>
          <textarea
            name="message"
            rows={4}
            maxLength={4000}
            value={values.message}
            onChange={(event) => updateField("message", event.currentTarget.value)}
            aria-invalid={Boolean(fieldError("message"))}
            aria-describedby={
              fieldError("message") ? "message-error" : undefined
            }
          />
          {fieldError("message") && (
            <span className="field-error" id="message-error">
              {fieldError("message")}
            </span>
          )}
        </label>
        <label className="honeypot" aria-hidden="true">
          Leave this field blank
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => updateField("website", event.currentTarget.value)}
          />
        </label>
        <button
          className="button button-dark submit-button"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Sending request…" : "Send estimate request"}
          {!isPending && <span aria-hidden="true"> ↗</span>}
        </button>
        {state.message && (
          <p
            className="form-status form-error"
            role="alert"
            aria-live="assertive"
          >
            {state.message}
          </p>
        )}
      </form>
      <p className="form-privacy">
        We use these details to respond to your request. Your submission is
        visible to authorized staff; please don’t include sensitive
        information. This development preview uses test data only. Privacy and
        retention terms need business approval before launch.
      </p>
    </div>
  );
}
