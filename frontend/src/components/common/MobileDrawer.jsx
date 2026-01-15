import { motion, AnimatePresence } from "framer-motion";

export default function MobileDrawer({ open, onClose, children }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* DRAWER */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-4 max-h-[85vh] overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25 }}
          >
            {/* HANDLE */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
