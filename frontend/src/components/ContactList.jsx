import { useContext, useEffect, useState } from "react";
import api from "../utils/api";
import { ContactContext } from "../context/ContactContext";
import Button from "./Button";
import Alert from "./Alert";


import EditContactModal from "./EditContactModal";

const ITEMS_PER_PAGE = 3; 

const formatDate = (date) =>
  new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

const ContactList = () => {
  const { contacts, setContacts } = useContext(ContactContext);

  const [message, setMessage] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [editingContact, setEditingContact] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    api
      .get(`/api/contacts?page=${page}`)
      .then((res) => {
        setContacts(res.data.contacts || []);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch(() => setContacts([]));
  }, [page, refreshKey]);

  const sortedContacts = [...contacts].sort((a, b) => {
    if (sortType === "name") {
      return a.name.localeCompare(b.name);
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    await api.delete(`/api/contacts/${id}`);
    setMessage("Contact deleted successfully");
    setPage(1);
    setRefreshKey((k) => k + 1);
    setTimeout(() => setMessage(""), 2000);
  };

  const handleUpdate = () => {
    setMessage("Contact updated successfully");
    setEditingContact(null);
    setPage(1);
    setRefreshKey((k) => k + 1);
    setTimeout(() => setMessage(""), 2000);
  };

  useEffect(() => {
    const refresh = () => {
      setPage(1);
      setRefreshKey((k) => k + 1);
    };
    window.addEventListener("contactsUpdated", refresh);
    return () =>
      window.removeEventListener("contactsUpdated", refresh);
  }, []);

  return (
    <div className="table-card">
      <h2 className="list-title">Saved Contacts</h2>

      <Alert message={message} />

      <label className="sort-label">Sort by:</label>
      <select
        className="sort-select"
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
      >
        <option value="latest">Latest</option>
        <option value="name">Name (A–Z)</option>
      </select>

      {sortedContacts.length === 0 ? (
        <p className="empty-text">No contacts available</p>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="contact-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Created At</th>
                  <th>Last Updated</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {sortedContacts.map((contact, index) => (
                  <tr key={contact._id}>
                    <td>{(page - 1) * ITEMS_PER_PAGE + index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>{formatDate(contact.createdAt)}</td>
                    <td>{formatDate(contact.updatedAt)}</td>
                    <td>
                      <Button
                        text="Edit"
                        className="edit-btn"
                        onClick={() => setEditingContact(contact)}
                      />
                      <Button
                        text="Delete"
                        className="delete-btn"
                        onClick={() => handleDelete(contact._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {editingContact && (
        <EditContactModal
          contact={editingContact}
          onClose={() => setEditingContact(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ContactList;
