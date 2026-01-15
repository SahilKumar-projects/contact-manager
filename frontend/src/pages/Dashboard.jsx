import { useEffect, useMemo, useState } from "react";

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
import { contactService } from "../services/contactService";

export default function Dashboard() {
  const [section, setSection] = useState("contacts");

  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const isMobile = window.innerWidth < 768;

  /* ---------------- LOAD CONTACTS ---------------- */
  useEffect(() => {
    async function load() {
      const data = await contactService.getAll();

      const normalized = data.map((c) => ({
        ...c,
        notes: c.notes || [],
        tasks: c.tasks || [],
        voicemails: c.voicemails || [],
      }));

      setContacts(normalized);
      setSelected(normalized[0] || null);
      setLoading(false);
    }
    load();
  }, []);

  /* ---------------- SEARCH ---------------- */
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

  /* ---------------- SAVE ---------------- */
  const handleSave = async (contact) => {
    const saved = contact.id
      ? await contactService.update(contact)
      : await contactService.create(contact);

    setContacts((prev) =>
      prev.some((c) => c.id === saved.id)
        ? prev.map((c) => (c.id === saved.id ? saved : c))
        : [saved, ...prev]
    );

    setSelected(saved);
    setDrawerOpen(false);
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    await contactService.remove(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setSelected(null);
    setDrawerOpen(false);
  };

  /* ---------------- FAVORITE ---------------- */
  const handleToggleFavorite = async (id) => {
    const updated = await contactService.toggleFavorite(id);

    setContacts((prev) =>
      prev.map((c) => (c.id === id ? updated : c))
    );

    if (selected?.id === id) setSelected(updated);
  };

  /* ---------------- NOTES ---------------- */
  const handleAddNote = (id, note) => {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, notes: [...c.notes, note] } : c
      )
    );

    setSelected((prev) =>
      prev?.id === id
        ? { ...prev, notes: [...prev.notes, note] }
        : prev
    );
  };

  const handleDeleteNote = (id, index) => {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, notes: c.notes.filter((_, i) => i !== index) }
          : c
      )
    );

    setSelected((prev) =>
      prev?.id === id
        ? { ...prev, notes: prev.notes.filter((_, i) => i !== index) }
        : prev
    );
  };

  /* ---------------- TASKS ---------------- */
  const handleAddTask = (id, task) => {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, tasks: [...c.tasks, task] } : c
      )
    );

    setSelected((prev) =>
      prev?.id === id
        ? { ...prev, tasks: [...prev.tasks, task] }
        : prev
    );
  };

  const handleDeleteTask = (id, index) => {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, tasks: c.tasks.filter((_, i) => i !== index) }
          : c
      )
    );

    setSelected((prev) =>
      prev?.id === id
        ? { ...prev, tasks: prev.tasks.filter((_, i) => i !== index) }
        : prev
    );
  };

  /* ---------------- LOADING ---------------- */
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
              onDeleteTask={handleDeleteTask}
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
            onDeleteTask={handleDeleteTask}
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
