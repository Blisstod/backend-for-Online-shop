const express = require('express');
const adminRoutes = require('./adminRoutes')
const authRoutes = require('./authRoutes')
const productRoutes = require('./productRoutes')
const userRoutes = require('./userRoutes')

const router = new express.Router()

router.use('/admin', adminRoutes)
router.use('/auth', authRoutes)
router.use('/products', productRoutes)
router.use('/user', userRoutes)

module.exports = router