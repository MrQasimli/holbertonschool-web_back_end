import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 },
];

function getItemById(id) {
  return listProducts.find((item) => item.itemId === id);
}

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

function reserveStockById(itemId, stock) {
  client.set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
  const stock = await getAsync(`item.${itemId}`);
  return stock;
}

const app = express();

app.get('/list_products', (_req, res) => {
  res.json(listProducts);
});

app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);

  if (!item) {
    return res.json({ status: 'Product not found' });
  }

  const reserved = await getCurrentReservedStockById(itemId);
  const currentQuantity = reserved === null
    ? item.initialAvailableQuantity
    : parseInt(reserved, 10);

  res.json({ ...item, currentQuantity });
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);

  if (!item) {
    return res.json({ status: 'Product not found' });
  }

  const reserved = await getCurrentReservedStockById(itemId);
  const currentQuantity = reserved === null
    ? item.initialAvailableQuantity
    : parseInt(reserved, 10);

  if (currentQuantity < 1) {
    return res.json({ status: 'Not enough stock available', itemId });
  }

  reserveStockById(itemId, currentQuantity - 1);
  res.json({ status: 'Reservation confirmed', itemId });
});

app.listen(1245);
