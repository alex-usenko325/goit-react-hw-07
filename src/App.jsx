import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "./redux/filtersSlice";
import { selectNameFilter } from "./redux/filtersSlice";

import SearchBox from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";

import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useEffect } from "react";
import { fetchContacts } from "./redux/contactsOps";
import { selectLoading, selectError } from "./redux/contactsSlice";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectNameFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`, {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#f44336",
          color: "#fff",
          fontWeight: "bold",
        },
      });
    }
  }, [error]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>

      <SearchBox
        filter={filter}
        onChange={(value) => dispatch(changeFilter(value))}
      />

      {loading && (
        <div
          style={{ display: "flex", justifyContent: "center", margin: "20px" }}
        >
          <ClipLoader size={50} color="#4fa94d" />
        </div>
      )}

      {error && <Toaster />}

      <ContactList />
    </div>
  );
};

export default App;
