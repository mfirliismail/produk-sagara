const { Produk } = require('../models')

module.exports = {
    createProduk : async(req, res) => {
        const body = req.body
        const user = req.user
        const file = req.file
        try {
            if(!file || !file.path){
                return res.status(400).json({
                    status: "failed",
                    message: "please upload image of produk"
                })
            }

            const createProduk = await Produk.create({
                name: body.name,
                imageProduk: file.path,
                stock: body.stock,
                price: body.price,
                userId: user.id
            })

            if(!createProduk){
                return res.status(400).json({
                    status: "failed",
                    message: "cannot create produk"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success created produk",
                data: createProduk
            })

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    getAllProduk: async(req, res) => {
        try {
            const findAllProduk = await Produk.findAll()
            if(!findAllProduk){
                return res.status(400).json({
                    status: "failed",
                    message:"produk not found"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success retrieved data",
                data: findAllProduk
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    getOneProduk: async(req, res) => {
        const { id } = req.params
        try {
            const findOneProduk = await Produk.findOne({
                where: {
                    id: id
                }
            })
            if(!findOneProduk){
                return res.status(400).json({
                    status: "failed",
                    message:"produk not found"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success retrieved data",
                data: findOneProduk
            })
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    updateProduk: async(req, res) => {
        const { id } = req.params;
        const file = req.file
        const body = req.body
        try {
            const findProduk = await Produk.findOne({
                where: {
                    id: id
                }
            })
            if(!file || !file.path){
                return res.status(400).json({
                    status: "failed",
                    message: "please upload image of produk"
                })
            }

            if(!findProduk){
                return res.status(400).json({
                    status: "failed",
                    message: "cannot find produk with id"
                })
            }
            const updateOneProduk = await Produk.update({
                ...body,
                imageProduk: file.path
            }, {
                where : {
                    id : id
                }
            })

            if(!updateOneProduk){
                return res.status(400).json({
                    status: "failed",
                    message: "cannot update produk"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success updated data",
                data: findProduk
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    deleteProduk: async(req, res) => {
        const { id } = req.params
        try {
            const deleteOneProduk = await Produk.destroy({
                where: {
                    id: id
                }
            })
            
            if(!deleteOneProduk){
                return res.status(400).json({
                    status: 'failed',
                    message: 'cannot delete produk'
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success delete data"
            })
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    }

}