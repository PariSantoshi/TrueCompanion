const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const chatRoutes = require('./routes/chat');
const reportRoutes = require('./routes/report');
const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/true-companion', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  res.send('True Companion API');
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', auth, postRoutes);
app.use('/api/chat', auth, chatRoutes);
app.use('/api/report', auth, reportRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
