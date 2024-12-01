const express = require("express");
const category= express.Router();
const {getAllCategories} = require("../queries/categories.js")

category.get("/", async (req,res) => {
    const allCategories = await getAllCategories()

    if(!allCategories.message){
        res.status(200).json(allCategories)
    }
    else {
        res.status(500).json({
            error: allCategories.message,
            message: "Error retrievig Categories"
        })
    }
    
})
module.exports = category