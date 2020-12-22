const { Usuario } = require('../models/');
const bcrypt = require('bcryptjs')
const servToken = require('../services/token')
const jwt = require('jsonwebtoken');



module.exports = {
    list : async (req,res,next) =>{
        try {
    const re =await Usuario.findAll()

    res.status(200).json(re)
        } catch (error) { 
            res.status(500).json({ 'error': 'Oops paso algo que mal' })
            next(error)
        } 
    },
    add : async (req,res,next) =>{
            try {
                req.body.password = bcrypt.hashSync(req.body.password, 10)
                const re = await Usuario.create(req.body)

                res.status(200).json(re)
            } catch (error) {
                res.status(500).json({ 'error': 'Oops paso algo' })
                next(error)
            }
    },
    register : async (req,res,next) =>{
        res.status(200).send('se hará en el sprint 3')
    },
    login : async (req, res, next) => {

        try {
            const user = await Usuario.findOne({ where: { email: req.body.email } })

            if (user) {
                // Evaluar contraseña
                const contrasenhaValida= bcrypt.compareSync(req.body.password, user.password)

                if (contrasenhaValida) 

                {

                   const token = servToken.encode(user.id,user.rol)
                    
                    res.status(200).send({
                        auth:  true,  
                        tokenReturn: token,
                        user: user
                    })


                } else {
                    
                    res.status(401).json({ auth: false , email : user.password, tokenReturn: null , reason:
                        "Invalid Password!" });
                }

            } else {
                res.status(404).send('Usuario no existe')
            }

        } catch (error) {
            res.status(500).json({ 'error': 'Oops paso algo' })
            next(error)
        }


    }
}