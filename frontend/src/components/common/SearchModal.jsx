import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchModal({ open, contacts, onSelect, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-[420px] rounded-xl p-4"
      >
        <div className="flex items-center gap-2 border px-3 py-2 rounded-lg mb-3">
          <SearchIcon />
          <input
            autoFocus
            placeholder="Search contacts…"
            className="w-full outline-none"
          />
        </div>

        {contacts.map(c => (
          <div
            key={c._id}
            onClick={() => {
              onSelect(c);
              onClose();
            }}
            className="p-2 rounded hover:bg-gray-100 cursor-pointer"
          >
            {c.name}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
