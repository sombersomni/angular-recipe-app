const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4042;

app.use(express.static(path.join(__dirname, 'dist', 'recipes-app')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'recipes-app', 'index.html'));
})

app.listen(PORT, () => { console.log('server is running on port ' + PORT) });