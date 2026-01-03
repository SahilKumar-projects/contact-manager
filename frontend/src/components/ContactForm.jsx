import { useState } from "react";
import api from "../utils/api";
import Alert from "./Alert";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const isValid =
    form.name.length >= 3 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.phone.length >= 10;

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!isValid) return;

    try {
      await api.post("/api/contacts", form);

      setMessage("Contact saved successfully");

      window.dispatchEvent(new Event("contactsUpdated"));

      setForm({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

      setTouched({
        name: false,
        email: false,
        phone: false
      });

      setTimeout(() => setMessage(""), 2000);
    } catch {
      setError("Unable to save contact. Please try again.");
    }
  };

  return (
    <form onSubmit={submitHandler} className="form-card">
      <h2 className="form-title">Add Contact</h2>

      <Alert message={message || error} />

      <div className="form-group">
        <label>
          Name <span className="required">*</span>
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
            setTouched({ ...touched, name: true });
          }}
        />
        {touched.name && form.name.length < 3 && (
          <span className="field-error">
            Name must be at least 3 characters
          </span>
        )}
      </div>

      <div className="form-group">
        <label>
          Email <span className="required">*</span>
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
            setTouched({ ...touched, email: true });
          }}
        />
        {touched.email && !/\S+@\S+\.\S+/.test(form.email) && (
          <span className="field-error">Enter a valid email</span>
        )}
      </div>

      <div className="form-group">
        <label>
          Phone <span className="required">*</span>
        </label>
        <input
          type="text"
          value={form.phone}
          onChange={(e) => {
            setForm({ ...form, phone: e.target.value });
            setTouched({ ...touched, phone: true });
          }}
        />
        {touched.phone && form.phone.length < 10 && (
          <span className="field-error">
            Phone must be at least 10 digits
          </span>
        )}
      </div>

      <div className="form-group">
        <label>Message</label>
        <textarea
          rows="3"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />
      </div>

      <button
        type="submit"
        className="submit-btn"
        disabled={!isValid}
      >
        Save Contact
      </button>
    </form>
  );
};

export default ContactForm;
