import express from express;
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const verifyToken = () => {
  const authHeader = req.headers['Authorization'];
  const token = authHeader.split(' ')[1];
  const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedJWT
  next();
}


app.get('/', async(req,res,next) => {
  try {
    const allUsers = await client.query(`SELECT * FROM user`);
    if(!allUsers) return res.status(404).send('Unable to log in');

    res.status(200).json(allUsers);
  }catch(err){
    console.log(err)
    res.status(400).send('Unable to log in');
  }
})

app.post('/register', async(req,res,next) => {
  const {email, password} = req.body;
  try {
    const hashPass = await bcrypt.hash(password, 5)
    const newUser = await client.query(`INSERT INTO user (email, password)
      VALUES ($1, $2)
      RETURNING *;`,[email, hashPass]);

    if(!newUser) return res.status(401).send('Unable to create user');
    const token = jwt.sign({id: newUser.id, email: newUser.email}, process.env.JWT_SECRET);
    res.status(201).json(token)

  }catch(err){
    console.log(err);
    res.send('Unable to create user')
  }
})

app.post('/login', async(req,res,next) => {
  const {email, password} = req.body;
  try {
    const userLogin = await client.query(`SELECT * FROM user WHERE email = $1;`, [email]);

    const isPWMatch = await bcrypt.compare(password, userLogin.password);
    if(!isPWMatch) return res.status(401).send('Unable to login');
    const token = jwt.sign({id: userLogin.id, email: userLogin.email});
    res.status(201).json(token);
  }catch(err){
    console.log('Unable to login')
  }
})
