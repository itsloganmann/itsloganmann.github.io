// Imports
const express = require('express')
const Charger = require('../models/charger')
const router = new express.Router()
const auth = require('../middleware/auth')

// Creates a new charger
router.post('/charger/new', auth, async (req, res) => {
    const charger = new Charger(req.body)
    charger.owner = req.user
    
    try {
        console.log(req.body)
        await charger.save()
        res.status(201).send(charger)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Updates a charger's own profile
router.patch('/chargers', async (req, res) => {
    // Specifies what is allowed to be updated in the db
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'address', 'city', 'type','rate' , 'details']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // Checks if the update is valid operation

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {

        // Small adjustment required to use middleware. Updates charger data.
        updates.forEach((update) => {
            req.charger[update] = req.body[update]
        })

        await req.charger.save()

        // Sends back the found charger data back after updating it
        res.send(req.charger)
    }catch(error){
        console.log(error)
    }
})

// Deletes a charger
router.delete('/chargers/:id', auth, async (req, res) => {
    try {
        const charger = await Charger.findByIdAndDelete(req.params.id)

        if (!charger) {
            return res.status(404).send()
        }

        res.send(charger)
    } catch (error) {
        console.log('error!')
        res.status(400).send(error)
    }
})

// Sets a unavailable block for a charger
router.post('/charger/setUnavailable/:id', auth, async (req, res) => {
    const charger = new Charger(req.body)
    charger.owner = req.user
    
    try {
        console.log(req.body)
        await charger.save()
        res.status(201).send(charger)
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports = router