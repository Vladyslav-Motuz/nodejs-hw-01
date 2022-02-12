const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');
program.parse(process.argv);
const argv = program.opts();

const contactOperation = require("./db/contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactList = await contactOperation.listContacts();
      console.table(contactList);
      break;

    case 'get':
      const contactId = await contactOperation.getContactById(id);
          if (!contactId) {
              throw new Error(`Contact with id=${id} not found`)
          };
      console.table(contactId);
      break;

    case 'add':
      const addContact = await contactOperation.addContact(name, email, phone);
      console.table(addContact);
      break;

    case 'remove':
      const removeContact = await contactOperation.removeContact(id);
      console.table(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};
invokeAction(argv);