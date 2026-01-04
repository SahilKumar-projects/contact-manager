import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { ContactProvider } from "./context/ContactContext";
import ThemeToggle from "./components/ThemeToggle";
import DownloadContacts from "./components/DownloadContacts";

function App() {
  return (
    <ContactProvider>
      <div className="app-wrapper">
        <div className="app-card">
          <h1 className="app-title">Contact Management</h1>

        
          <div className="top-actions">
            <ThemeToggle />
            <DownloadContacts />
          </div>

          <div className="app-grid">
            <ContactForm />
            <ContactList />
          </div>
        </div>
      </div>
    </ContactProvider>
  );
}

export default App;
