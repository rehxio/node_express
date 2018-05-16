const express = require('express');
const app = express();
app.use(express.json());

const users = [
   {name: 'Pepe', id: '1'}, 
   {name: 'Juan', id: '2'},
   {name: 'Fabian', id: '3'}
];

/*app.get('/', (req,res) => {
   //console.log('Request', req.headers);
   //res.send('Hello World!')
   res.json(usuarios);
});*/

app.get('/users', (req,res) => {
   res.json(users);
});

app.get('/users/:id', (req,res) => {
   const userId = req.params.id;
   const user = users.find(user => user.id === userId || user.name === userId);
   res.json(user);
});

app.post('/users', (req, res) => {
   const newUser = req.body;
   newUser.id = Math.random();
   users.push(newUser);
   res.json(newUser);
})

app.listen(3000 /*, () => console.log('Ready on port 3000!')*/);