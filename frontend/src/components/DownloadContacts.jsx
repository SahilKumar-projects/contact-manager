import { useContext } from "react";
import { ContactContext } from "../context/ContactContext";

const DownloadContacts = () => {
  const { contacts } = useContext(ContactContext);

  const handleDownload = () => {
    if (!contacts.length) return;

    const headers = ["Name", "Email", "Phone", "Created At", "Updated At"];
    const rows = contacts.map((c) => [
      c.name,
      c.email,
      c.phone,
      c.createdAt,
      c.updatedAt
    ]);

    const csvContent =
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      className="download-btn"
      onClick={handleDownload}
      disabled={!contacts.length}
    >
      ⬇ Download
    </button>
  );
};

export default DownloadContacts;
