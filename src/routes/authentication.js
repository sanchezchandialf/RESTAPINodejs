const express = require('express');
const router = express.Router();

// Definir rutas de autenticación aquí
// Por ejemplo:
router.get('/login', (req, res) => {
  res.send('Página de inicio de sesión');
});

router.get('/signup', (req, res) => {
  res.send('Página de registro');
});

// Exportar el objeto Router
module.exports = router;
