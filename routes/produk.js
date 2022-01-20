const router = require('express').Router()
const produkController = require('../controller/produk')
const auth = require('../middlewares/auth')
const cloudUpload = require('../middlewares/uploadCloudinary')

router.post('/create',auth, cloudUpload('imageProduk'), produkController.createProduk)
router.get('/:id', auth, produkController.getOneProduk)
router.get('/get/all', auth, produkController.getAllProduk)
router.put('/edit/:id', auth, cloudUpload('imageProduk'), produkController.updateProduk)
router.delete('/delete/:id', auth, produkController.deleteProduk)

module.exports = router