const Grocery = require("../model/Grocery")

async function getAllGrocery(req, res){
    try {
        let foundAllGrocery= await Grocery.find({})

        res.json({message:"success", payload:foundAllGrocery})
        
    } catch (e) {
        res.status(500).json({message:"failure", error:e.message})
    }
}

async function  getGroceryByID(req, res){
    const id = req.params.id
    try{
        let findGroceryByID = await
        Grocery.findById({_id:id})
        res.json({message:"success", payload:findGroceryByID})
    }catch(e){
        res.status(500).json({message:"failure", error:e.message})
    }
}

async function createGrocery(req, res){
    
    try {
        let createdGrocery = new Grocery({
            grocery:req.body.grocery
            
        })
        let savedGrocery = await createdGrocery.save()
        res.json({payload:savedGrocery})
    }catch (e){
        res.status(500).json({message: "failure", error:e.message})
    }
}

async function updateGroceryById(req, res){
    const id = req.params.id

    try{
        let updatedGrocery = await
        Grocery.findByIdAndUpdate({ _id: id}, req.body, {
            new:true,
        })

        res.json({message:"success", payload:updatedGrocery})
        
    }catch(e){
        res.status(500).json({message: "failure", error:e.message})
    }
}

async function updatedGroceryBought(req, res){
    const id = req.params.id

    try{
        let updatedBoughtGrocery = await
        Grocery.findByIdAndUpdate({_id: id}, req.body,{
            new:true
        })
        res.json({message: "success", payload:updatedBoughtGrocery})
    }catch(e){
        res.status(500).json({message:"failure", error:e.message})
    }
}

async function deleteGroceryByID(req, res) {
    const id = req.params.id;

    try {
        let deletedGrocery = await Grocery.findByIdAndRemove({ _id: id });
        res.json({ message: "success", payload: deletedGrocery });
    } catch (e) {
        res.status(500).json({ message: "failure", error: e.message });
    }
}

async function sortByDate(req, res){
    try{
        let sort = req.query.sort
        let sortOrder = sort ==="desc"? -1 : 1

        let foundGrocery = await Grocery.find({}).sort({dateAdded:sortOrder})
        res.json ({payload:foundGrocery})
    }catch (e){
        console.log(e)
        res.status(500).json({message:"failure", error:e.message})
    }
}

async function sortGroceryByBought(req, res) {
    try {
      let purchased = req.query.isBought;
      let isPurchasedOrder = purchased === "true" ? true : false;
      let sortByDate = req.query.sort ? req.query.sort : null;
      let finalSort;
      if (!sortByDate) {
        finalSort = null;
      } else {
        finalSort = sortByDate === "asc" ? 1 : -1;
      }
      let foundGrocery = await Grocery.find({ purchased: isPurchasedOrder }).sort({
        dateAdded: finalSort,
      });
      res.json({ payload: foundGrocery });
    } catch (e) {
      res.status(500).json({ message: e.message, error: e });
    }
  }

module.exports={
    getAllGrocery,
    getGroceryByID,
    createGrocery,
    deleteGroceryByID,
    updateGroceryById,
    sortByDate,
    sortGroceryByBought
    // updatedBoughtGrocery
}