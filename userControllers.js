const pool = require('./db');

exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

exports.createUser = async (req, res) => {
  const { name, email, age } = req.body;  
  try {
    //check if email already exists
    const response = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if(response.rows.length > 0){
        return res.status(400).json({error: "Email already exists"})
    }

    const result = await pool.query(
      'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
      [name, email, age]
    );
    const newUser = result.rows[0]
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.updateUser = async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET name=$1, email=$2, age=$3 WHERE id=$4 RETURNING *',
      [name, email, age, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    const updatedUser = result.rows[0]
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
