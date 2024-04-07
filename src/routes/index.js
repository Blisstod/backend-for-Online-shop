const express = require('express');
const adminRoutes = require('./adminRoutes')
const authRoutes = require('./authRoutes')
const productRoutes = require('./productRoutes')

const router = new express.Router()

router.use('/admin', adminRoutes)
router.use('/auth', authRoutes)
router.use('/products', productRoutes)

module.exports = router