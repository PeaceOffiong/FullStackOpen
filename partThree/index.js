const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

app.use(cors())
app.use(express.json());

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const dataFile = path.join(__dirname, 'contacts.json');

// Load contacts from file or use default
let contacts = [];

const loadContacts = () => {
  try {
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf8');
      contacts = JSON.parse(data);
    } else {
      // Initialize with default contacts
      contacts = [
        {
          "id": "1",
          "name": "Arto Hellas",
          "number": "040-123456"
        },
        {
          "id": "2",
          "name": "Ada Lovelace",
          "number": "39-44-5323523"
        },
        {
          "id": "3",
          "name": "Dan Abramov",
          "number": "12-43-234345"
        },
        {
          "id": "4",
          "name": "Mary Poppendieck",
          "number": "39-23-6423122"
        }
      ];
      saveContacts();
    }
  } catch (error) {
    console.error('Error loading contacts:', error);
    contacts = [];
  }
};

const saveContacts = () => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error('Error saving contacts:', error);
  }
};

// Load contacts on startup
loadContacts();

const generateId = () => {
  const maxId = contacts.length > 0 ? Math.max(...contacts.map(n => n.id)) : 0;
  return maxId + 1;
}

app.get('/api/contacts', (req, res) => {
  res.json(contacts);
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${contacts.length} people</p><p>${new Date()}</p>`);
})

app.get("/api/contacts/:id", (req, res) => {
  console.log(req.params.id);
  console.log(contacts);
  const id = req.params.id;
  const contact = contacts.find(contact => contact.id === id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).end();
  }
})

app.delete("/api/contacts/:id", (req, res) => {
  const id = req.params.id;
  contacts = contacts.filter(contact => contact.id !== id);
  saveContacts();
  res.status(204).end();
})

app.post("/api/contacts", (req, res) => {
  const body = req.body;
  if(!body.name || !body.number){
    return res.status(400).json({
      error: "name or number missing"
    })
  }
  // Trim whitespace and check for duplicate (case-insensitive)
  const trimmedName = body.name.trim();
  const existingContact = contacts.find(contact => 
    contact.name.trim().toLowerCase() === trimmedName.toLowerCase()
  );
  
  console.log('Checking for duplicate:', trimmedName);
  console.log('Current contacts:', contacts.map(c => c.name));
  console.log('Found existing contact:', existingContact);
  
  if(existingContact){
    console.log('Duplicate found! Returning error');
    return res.status(400).json({
      error: "name must be unique"
    })
  }
  const contact = {
    id: String(generateId()),
    name: trimmedName,
    number: body.number.trim(),
  }
  contacts = contacts.concat(contact);
  saveContacts();
  console.log('Contact added. Total contacts now:', contacts.length);
  console.log('All contacts:', contacts.map(c => c.name));
  res.json(contact);
})

const PORT = 3007;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})