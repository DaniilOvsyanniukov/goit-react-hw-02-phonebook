import PropTypes from "prop-types";
import Contact from "./Contact";
import shortid from "shortid";
import s from "./Contacts.module.css";

const Contacts = ({ contacts, deleteContact }) => {
  return (
    <ul className={s.list}>
      {contacts.map((contact) => {
        let contactid = shortid.generate();
        return (
          <Contact
            key={contactid}
            contact={contact}
            deleteContact={deleteContact}
          />
        );
      })}
    </ul>
  );
};
export default Contacts;

Contacts.propTypes = {
  contacts: PropTypes.array,
  deleteContact: PropTypes.func,
};
