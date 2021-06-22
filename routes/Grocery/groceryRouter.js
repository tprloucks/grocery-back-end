const express = require('express')
const { route } = require('../indexRouter')
const router = express.Router()

let{
    getAllGrocery,
    createGrocery,
    getGroceryByID,
    updateGroceryById,
    // updatedBoughtGrocery,
    deleteGroceryByID,
    sortByDate,
    sortGroceryByBought
}= require("./controller/GroceryController")

router.get('/', function(req, res, next){
    res.send("respond with a resource")
})

router.get("/get-all-grocery", getAllGrocery)
router.get( "/get-grocery-by-id", getGroceryByID)
router.get("/get-grocery-by-sort", sortByDate)
router.get("/get-grocery-by-bought", sortGroceryByBought)
router.post("/create-grocery", createGrocery)
router.delete("/delete-grocery/:id", deleteGroceryByID)
router.put("/update-grocery/:id", updateGroceryById)


module.exports= router