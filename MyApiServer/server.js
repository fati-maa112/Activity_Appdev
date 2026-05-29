const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ── Dummy user store (keep for legacy endpoints) ──────────────────────────────
let users = [];

// ── Demo auto-broadcast (every 15s) ──────────────────────────────────────────
const STATUS_FLOW   = ['CONFIRMED', 'PREPARING', 'COMPLETED'];
let demoOrderId     = 1001;
let demoStatusIndex = 0;

function emitDemoOrderUpdate() {
  const status  = STATUS_FLOW[demoStatusIndex % STATUS_FLOW.length];
  demoStatusIndex += 1;

  const payload = {
    orderId:   demoOrderId,
    status,
    timestamp: new Date().toISOString(),
  };

  io.to('customer').emit('order_status_changed', payload);
  io.to(`user-${demoOrderId}`).emit('order_status_changed', payload);
  io.to('admin').emit('order_status_changed', { ...payload, userId: demoOrderId });

  console.log('[Socket demo] Auto-broadcast:', payload);
  demoOrderId += 1;
}

setInterval(emitDemoOrderUpdate, 15000);

// ─────────────────────────────────────────────────────────────────────────────
// Socket.IO — client connections
// ─────────────────────────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  console.log('[Socket] Client connected:', socket.id);

  // Mobile user joins personal room
  socket.on('join-user', ({ userId }) => {
    const room = `user-${userId}`;
    socket.join(room);
    console.log(`[Socket] ${socket.id} joined personal room: ${room}`);
  });

  // ── NEW: Admin dashboard joins admin room ─────────────────────────────────
  socket.on('join-admin', ({ role } = {}) => {
    socket.join('admin');
    console.log(`[Socket] ${socket.id} joined admin room (role: ${role ?? 'admin'})`);

    // Confirm back to the dashboard
    socket.emit('admin-joined', {
      message:   'Connected to admin room',
      timestamp: new Date().toISOString(),
    });
  });

  // Legacy room join
  socket.on('join', (room) => {
    socket.join(room);
    console.log(`[Socket] ${socket.id} joined room: ${room}`);
  });

  socket.on('disconnect', () => {
    console.log('[Socket] Client disconnected:', socket.id);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Endpoints called by Symfony WebSocketService::post()
// ─────────────────────────────────────────────────────────────────────────────

// After mobile checkout → notify admin dashboard
app.post('/socket/order-placed', (req, res) => {
  const { orderId, total, status, customerName, items } = req.body;
  console.log(`[Socket] order-placed → #${orderId} by ${customerName} | ₱${total}`);

  io.to('admin').emit('order_placed', {
    orderId,
    total,
    status,
    customerName,
    items,
    createdAt:  new Date().toISOString(),   // ← dashboard uses this for date column
    timestamp:  new Date().toISOString(),
  });

  res.json({ success: true });
});

// When admin changes order status → notify mobile user + admin
app.post('/socket/order-status-changed', (req, res) => {
  const { orderId, status, userId } = req.body;
  console.log(`[Socket] order-status-changed → #${orderId} → ${status} | user: ${userId}`);

  // Targeted: notify the specific mobile user
  io.to(`user-${userId}`).emit('order_status_changed', {
    orderId, status,
    timestamp: new Date().toISOString(),
  });

  // Broadcast: all customers (legacy support)
  io.to('customer').emit('order_status_changed', { orderId, status });

  // Echo back to admin dashboard (for live badge update in table)
  io.to('admin').emit('order_status_changed', {
    orderId, status, userId,
    timestamp: new Date().toISOString(),
  });

  res.json({ success: true });
});

// When cart is updated → notify admin dashboard
app.post('/socket/cart-updated', (req, res) => {
  const { userId, itemCount } = req.body;
  console.log(`[Socket] cart-updated → user ${userId} | ${itemCount} items`);

  io.to('admin').emit('cart_updated', {
    userId, itemCount,
    timestamp: new Date().toISOString(),
  });

  res.json({ success: true });
});

// After stock deducted on checkout → notify admin dashboard
app.post('/socket/stock-updated', (req, res) => {
  const { productId, productName, newStock } = req.body;
  console.log(`[Socket] stock-updated → ${productName} | ${newStock} left`);

  io.to('admin').emit('stock_updated', {
    productId, productName, newStock,
    timestamp: new Date().toISOString(),
  });

  res.json({ success: true });
});

// ─────────────────────────────────────────────────────────────────────────────
// Legacy endpoints (keep)
// ─────────────────────────────────────────────────────────────────────────────
app.post('/api/notify/order-status', (req, res) => {
  const { orderId, status } = req.body;
  if (!orderId || !status) {
    return res.status(400).json({ message: 'orderId and status are required' });
  }
  console.log(`[Socket] legacy notify → #${orderId} → ${status}`);
  io.to('customer').emit('order_status_changed', { orderId, status });
  res.json({ message: 'Status broadcasted', orderId, status });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) return res.json({ message: 'Login successful', user });
  return res.status(401).json({ message: 'Invalid credentials' });
});

app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  users.push({ username, email, password });
  return res.json({ message: 'Registration successful' });
});

// ─────────────────────────────────────────────────────────────────────────────
// Health check
// ─────────────────────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status:  'ok',
    uptime:  Math.floor(process.uptime()),
    clients: io.engine.clientsCount,
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Start
// ─────────────────────────────────────────────────────────────────────────────
server.listen(PORT, () => {
  console.log(`\n✅ Naturae Socket.IO server → http://localhost:${PORT}`);
  console.log(`   Health:    http://localhost:${PORT}/health`);
  console.log(`   Demo loop: broadcasting order updates every 15s\n`);
});