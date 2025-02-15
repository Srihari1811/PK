const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://karatesrihari2745:Srihari%402003@cluster0.9cv3yfh.mongodb.net/pkbillingdemo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    phoneNumber: String,
    password: String
});
const User = mongoose.model('User', userSchema);

// Register Route
app.post('/register', async (req, res) => {
    const { name, username, phoneNumber, password } = req.body;
    const user = new User({ name, username, phoneNumber, password }); // Save password as is
    await user.save();
    res.json({ message: 'User registered successfully' });
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, 'secret');
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.get('/users', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users' });
    }
  });

  // Item schema
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    gst: { type: Number, required: true },
  });
  
  // Item model
  const Item = mongoose.model('Item', itemSchema);
  
  // Routes
  app.post('/items', (req, res) => {
    const { name, price, gst } = req.body;
  
    // Input validation
    if (!name || !price || !gst) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Create new item
    const newItem = new Item({
      name,
      price,
      gst,
    });
  
    newItem.save()
      .then(item => res.status(201).json(item))
      .catch(err => res.status(500).json({ message: 'Failed to add item' }));
  });

  // GET request to fetch all items
app.get('/items', (req, res) => {
    Item.find()
      .then(items => res.json(items))
      .catch(err => res.status(500).json({ message: 'Failed to fetch items' }));
  });


  // Purchase Schema
const purchaseSchema = new mongoose.Schema({
  supplierName: { type: String, required: true },
  referenceNo: { type: String },
  purchaseDate: { type: String, required: true },
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  purchasePrice: { type: Number, required: true },
  discount: { type: Number },
  taxAmount: { type: Number },
  unitCost: { type: Number },
  totalAmount: { type: Number },
  otherCharges: { type: Number },
  discountOnAll: { type: Number },
  note: { type: String },
  roundOff: { type: Number },
});

// Purchase Model
const Purchase = mongoose.model('Purchase', purchaseSchema);

// POST route to save purchase data
app.post('/purchases', (req, res) => {
  const purchaseData = req.body;

  const newPurchase = new Purchase(purchaseData);
  newPurchase.save()
    .then((purchase) => res.status(201).json(purchase))
    .catch((err) => res.status(500).json({ error: 'Error adding purchase', message: err.message }));
});


app.get('/purchases', async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Sales Schema and Model
const salesSchema = new mongoose.Schema({
  warehouse: String,
  customerName: String,
  salesCode: String,
  salesNumber: Number,
  salesDate: Date,
  referenceNo: String,
  itemDetails: Array,
  otherCharges: Number,
  discountCouponCode: String,
  couponType: String,
  couponValue: Number,
  discountOnAll: Number,
  total: Number,
  paymentPaid: Number,
  paymentStatus: String,
  dueDate: Date,
  note: String,
});

const Sales = mongoose.model('Sales', salesSchema);

// POST route to add sales data
app.post('/sales', async (req, res) => {
  try {
    const newSale = new Sales(req.body);
    await newSale.save();
    res.status(200).json({ message: 'Sales data submitted successfully' });
  } catch (error) {
    console.error('Error saving sales data:', error);
    res.status(500).json({ message: 'Failed to submit sales data' });
  }
});

// GET route to fetch all sales data
app.get('/sales', async (req, res) => {
  try {
    const salesData = await Sales.find();
    res.status(200).json(salesData);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ message: 'Failed to fetch sales data' });
  }
});



// Start server
app.listen(5000, () => {
    console.log('Server started on port 5000');
});
