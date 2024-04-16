const express = require('express')
const router = express.Router();
const Fruit = require('../models/fruit')

/*app.get(urlprefix+'/', (req,res)=>{
    res.send('Hello World')
})*/

router.get('', (req,res)=>{
    const orders = [
        {
            id: "1",
            name: "Orange"
        },
        {
            id: "2",
            name: "Banana"
        },
        {
            id: "3",
            name: "Pear"
        }
    ]
    res.json(
        {
            message: "Fruits",
            orders: orders
        }
    )
    Fruit.find().then((fruits)=>{
        res.json(
            {message: 'Fruits found',
        fruits:fruits}
        )
    })
})

router.post('', (req, res)=>{ 
        const fruit = new Fruit ( 
        { 
            id: req.body.id, 
            name: req.body.name 
        } 
    ) 
    fruit.save().then(()=>{ 
    res.status(201).json({ 
        message: 'Fruit created', 
        fruit:fruit  
        }) 
    }) 
})

router.delete('/:id', (req,res)=>{
    Fruit.deleteOne({_id: req.params.id})
    .then((result)=>
    {
        res.status(200).json({message: "Fruit Deleted"})
    });
})

module.exports = router