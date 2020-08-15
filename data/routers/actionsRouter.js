const express = require('express');
const router = express.Router();

// import helpers from projectModel
const actionUtils = require('../helpers/actionModel');

// GET array of projects
router.get('/', (req, res) => {
    actionUtils.get()
        .then(project => res.status(200).json(project))
        .catch(error => res.status(500).json({message: "Error retrieving projects"}))
})

// GET project by ID
router.get('/:id', (req, res) => {
    actionUtils.get(req.params.id)
        .then(project => res.status(200).json(project))
        .catch(error => res.status(500).json({message: "Unable to find project"}))
})

// POST new project (add new project)
router.post('/', (req, res) => {
    let project = req.body;

    if(!project.name || !project.description) {
        res.status(400).json({message: "Missing project name or description"})
    }

    actionUtils.insert(project)
        .then(project => res.status(201).json(project))
        .catch(error => res.status(500).json({message: "Project was not added", error}))
})

// DELETE project by ID
router.delete('/:id', (req, res) => {
    actionUtils.remove(req.params.id)
        .then(project => res.status(200).json({message: "The project was deleted"}))
})

module.exports = router;