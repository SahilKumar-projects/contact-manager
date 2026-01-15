import { useEffect, useMemo, useState, useContext } from "react";
import { Navigate } from "react-router-dom";

/* Auth */
import { AuthContext } from "../context/AuthContext";

/* Layout */
import Sidebar from "../components/layout/Sidebar";
import ContactList from "../components/contacts/ContactList";
import ContactDetails from "../components/contacts/ContactDetails";
import ContactFormModal from "../components/contacts/ContactFormModal";
import MobileDrawer from "../components/common/MobileDrawer";

/* Skeletons */
import SidebarSkeleton from "../components/skeletons/SidebarSkeleton";
import ContactListSkeleton from "../components/skeletons/ContactListSkeleton";
import ContactDetailsSkeleton from "../components/skeletons/ContactDetailsSkeleton";

/* Service */
import contactService from "../services/contactService";

export default function Dashboard() {
  /* ---------------- AUTH ---------------- */
  const { user, loading: authLoading } = useContext(AuthContext);

  /* ---------------- STATE ---------------- */
  const [section, setSection] = useState("contacts");

  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const isMobile = window.innerWidth < 768;

  /* ---------------- PROTECT ROUTE ---------------- */
  if (authLoading) return null;
  if (!user) return <Navigate to="/login" />;

  /* ---------------- LOAD CONTACTS ---------------- */
  useEffect(() => {
    async function load() {
      try {
        const data = await contactService.getAll();

        const normalized = data.map((c) => ({
          ...c,
          id: c._id,
          notes: c.notes || [],
          tasks: c.tasks || [],
          voicemails: c.voicemails || [],
        }));

        setContacts(normalized);
        setSelected(normalized[0] || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /* ---------------- SEARCH + FAVORITES ---------------- */
  const filteredContacts = useMemo(() => {
    const q = search.toLowerCase().trim();
    let list = [...contacts];

    list.sort((a, b) => Number(b.favorite) - Number(a.favorite));

    if (!q) return list;

    return list.filter((c) =>
      [c.name, c.email, c.phone]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q))
    );
  }, [contacts, search]);

  /* ---------------- ADD / EDIT CONTACT ---------------- */
  const handleSave = async (contact) => {
    const saved = contact.id
      ? await contactService.update(contact)
      : await contactService.create(contact);

    const normalized = { ...saved, id: saved._id };

    setContacts((prev) =>
      prev.some((c) => c.id === normalized.id)
        ? prev.map((c) => (c.id === normalized.id ? normalized : c))
        : [normalized, ...prev]
    );

    setSelected(normalized);
    setDrawerOpen(false);
    setModalOpen(false);
  };

  /* ---------------- DELETE CONTACT ---------------- */
  const handleDelete = async (id) => {
    await contactService.remove(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setSelected(null);
    setDrawerOpen(false);
  };

  /* ---------------- FAVORITE ---------------- */
  const handleToggleFavorite = async (id) => {
    const updated = await contactService.toggleFavorite(id);
    const normalized = { ...updated, id: updated._id };

    setContacts((prev) =>
      prev.map((c) => (c.id === normalized.id ? normalized : c))
    );
    setSelected(normalized);
  };

  /* ---------------- NOTES ---------------- */
  const handleAddNote = async (id, text) => {
    const updated = await contactService.addNote(id, {
      text,
      createdAt: Date.now(),
    });
    const normalized = { ...updated, id: updated._id };

    setContacts((prev) =>
      prev.map((c) => (c.id === normalized.id ? normalized : c))
    );
    setSelected(normalized);
  };

  const handleDeleteNote = async (id, index) => {
    const updated = await contactService.deleteNote(id, index);
    const normalized = { ...updated, id: updated._id };

    setContacts((prev) =>
      prev.map((c) => (c.id === normalized.id ? normalized : c))
    );
    setSelected(normalized);
  };

  /* ---------------- TASKS ---------------- */
  const handleAddTask = async (id, text) => {
    const updated = await contactService.addTask(id, {
      text,
      completed: false,
      createdAt: Date.now(),
    });
    const normalized = { ...updated, id: updated._id };

    setContacts((prev) =>
      prev.map((c) => (c.id === normalized.id ? normalized : c))
    );
    setSelected(normalized);
  };

  const handleToggleTask = async (id, index) => {
    const updated = await contactService.toggleTask(id, index);
    const normalized = { ...updated, id: updated._id };

    setContacts((prev) =>
      prev.map((c) => (c.id === normalized.id ? normalized : c))
    );
    setSelected(normalized);
  };

  const handleDeleteTask = async (id, index) => {
    const updated = await contactService.deleteTask(id, index);
    const normalized = { ...updated, id: updated._id };

    setContacts((prev) =>
      prev.map((c) => (c.id === normalized.id ? normalized : c))
    );
    setSelected(normalized);
  };

  /* ---------------- VOICEMAILS ---------------- */
  const handleUploadVoicemail = async (contactId, file, duration) => {
    const updated = await contactService.uploadVoicemail(
      contactId,
      file,
      duration
    );

    const normalized = {
      ...updated,
      id: updated._id,
      notes: updated.notes || [],
      tasks: updated.tasks || [],
      voicemails: updated.voicemails || [],
    };

    setContacts((prev) =>
      prev.map((c) => (c.id === normalized.id ? normalized : c))
    );
    setSelected(normalized);
  };

  const handleDeleteVoicemail = async (contactId, voicemailId) => {
    const updated = await contactService.deleteVoicemail(
      contactId,
      voicemailId
    );

    const normalized = {
      ...updated,
      id: updated._id,
      notes: updated.notes || [],
      tasks: updated.tasks || [],
      voicemails: updated.voicemails || [],
    };

    setContacts((prev) =>
      prev.map((c) => (c.id === normalized.id ? normalized : c))
    );
    setSelected(normalized);
  };

  /* ---------------- LOADING UI ---------------- */
  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-rose-400 to-orange-300 p-4">
        <div className="w-full h-full bg-white rounded-3xl shadow-2xl flex gap-4">
          {!isMobile && <SidebarSkeleton />}
          <ContactListSkeleton />
          {!isMobile && <ContactDetailsSkeleton />}
        </div>
      </div>
    );
  }

  /* ---------------- RENDER ---------------- */
  return (
    <>
      <div className="h-screen bg-gradient-to-br from-rose-400 to-orange-300 p-4">
        <div className="w-full h-full bg-white rounded-3xl shadow-2xl flex gap-4 overflow-hidden">
          {!isMobile && (
            <Sidebar active={section} onChange={setSection} />
          )}

          <ContactList
            contacts={filteredContacts}
            selected={selected}
            search={search}
            onSearchChange={setSearch}
            onSelect={(c) => {
              setSelected(c);
              if (isMobile) setDrawerOpen(true);
            }}
            onAddClick={() => {
              setEditingContact(null);
              setModalOpen(true);
            }}
            onToggleFavorite={handleToggleFavorite}
          />

          {!isMobile && (
            <ContactDetails
              contact={selected}
              onEdit={() => {
                setEditingContact(selected);
                setModalOpen(true);
              }}
              onDelete={handleDelete}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
              onAddTask={handleAddTask}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onUploadVoicemail={handleUploadVoicemail}
              onDeleteVoicemail={handleDeleteVoicemail}
            />
          )}
        </div>
      </div>

      {isMobile && (
        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <ContactDetails
            contact={selected}
            onEdit={() => {
              setEditingContact(selected);
              setModalOpen(true);
            }}
            onDelete={handleDelete}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onUploadVoicemail={handleUploadVoicemail}
            onDeleteVoicemail={handleDeleteVoicemail}
          />
        </MobileDrawer>
      )}

      <ContactFormModal
        open={modalOpen}
        initialData={editingContact}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}
