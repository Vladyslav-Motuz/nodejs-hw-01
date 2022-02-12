const fs = require("fs/promises");
const path = require('path');
const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);  
  return contacts;
};

async function getContactById(contactId) {  
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);
  if (!result) {
    return null;
  };
  return result;
};

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(contact => contact.id === contactId);
  if (contactIndex === -1) {    
    return null;
  };  
  const deletedContacts = contacts.splice(contactIndex, 1); 
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return deletedContacts;
};

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = {
    id: "200",
    name,
    email,
    phone
  };
  const newData = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newData));  
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};