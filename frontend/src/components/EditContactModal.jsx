import { useState } from "react";
import api from "../utils/api";

const EditContactModal = ({ contact, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    name: contact.name || "",
    email: contact.email || "",
    phone: contact.phone || "",
    message: contact.message || ""
  });

  const [error, setError] = useState("");

  const isValid =
    form.name.length >= 3 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.phone.length >= 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValid) {
      setError("Please correct the highlighted fields.");
      return;
    }

    try {
      const res = await api.put(
        `/api/contacts/${contact._id}`,
        form
      );

      onUpdate(res.data);
      onClose();
    } catch {
      setError("Failed to update contact. Please try again.");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">Edit Contact</div>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit} className="form-card">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
            {form.name && form.name.length < 3 && (
              <span className="field-error">
                Name must be at least 3 characters
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            {form.email && !/\S+@\S+\.\S+/.test(form.email) && (
              <span className="field-error">Enter a valid email</span>
            )}
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
            {form.phone && form.phone.length < 10 && (
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

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={!isValid}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContactModal;
