import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { body, validationResult } from 'express-validator';

// Account data storage (in-memory array)
let accounts: Account[] = [];

// Account model
interface Account {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// GET /accounts - Get all accounts
app.get('/accounts', (req: Request, res: Response) => {
  // Fetch data from the local storage (accounts) and return the response
  res.json(accounts);
});

// GET /accounts/:id - Get account by ID
app.get('/accounts/:id', (req: Request, res: Response) => {
  const account = accounts.find((acc) => acc.id === req.params.id);
  if (!account) {
    res.status(404).json({ error: 'Account not found' });
  } else {
    res.json(account);
  }
});

// POST /accounts - Create a new account
app.post(
  '/accounts',
  [
    // Validation middleware using express-validator
    body('id').notEmpty(),
    body('name').notEmpty(),
    body('address').notEmpty(),
    body('phone').notEmpty(),
    body('email').notEmpty().isEmail(),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, name, address, phone, email } = req.body;
    const account: Account = { id, name, address, phone, email };
    accounts.push(account);
    res.status(201).json(account);
  }
);

// PUT /accounts/:id - Update an existing account
app.put(
  '/accounts/:id',
  [
    // Validation middleware using express-validator
    body('name').optional().notEmpty(),
    body('address').optional().notEmpty(),
    body('phone').optional().notEmpty(),
    body('email').optional().notEmpty().isEmail(),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const accountIndex = accounts.findIndex((acc) => acc.id === req.params.id);
    if (accountIndex === -1) {
      res.status(404).json({ error: 'Account not found' });
    } else {
      const account = accounts[accountIndex];
      account.name = req.body.name || account.name;
      account.address = req.body.address || account.address;
      account.phone = req.body.phone || account.phone;
      account.email = req.body.email || account.email;
      res.json(account);
    }
  }
);

// DELETE /accounts/:id - Delete an account
app.delete('/accounts/:id', (req: Request, res: Response) => {
  const accountIndex = accounts.findIndex((acc) => acc.id === req.params.id);
  if (accountIndex === -1) {
    res.status(404).json({ error: 'Account not found' });
  } else {
    const deletedAccount = accounts.splice(accountIndex, 1);
    res.json(deletedAccount[0]);
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(

500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
