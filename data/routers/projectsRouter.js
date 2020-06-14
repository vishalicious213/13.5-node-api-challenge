const express = require('express');
const router = express.Router();

// import helpers from projectModel
const projUtils = require('../helpers/projectModel');

// GET array of projects
router.get('/', (req, res) => {
    projUtils.get()
        .then(project => res.status(200).json(project))
        .catch(error => res.status(500).json({message: "Error retrieving projects"}))
})

// GET project by ID
router.get('/:id', (req, res) => {
    projUtils.get(req.params.id)
        .then(project => res.status(200).json(project))
        .catch(error => res.status(500).json({message: "Unable to find project"}))
})

// POST new project (add new project)
router.post('/', (req, res) => {
    projUtils.get()
        .then(project => {
            if (!req.body.name || !req.body.description) {
                res.status(400).json({message: "Missing project name or description"})
            } else {
                projUtils.insert(req.body)
                    .then(project => res.status(201).json(project))
                    .catch(error => {
                        res.status(500).json({message: "Project was not added"})
                    })
            }
        })
        .catch(error => {
            res.status(500).json({message: "The server has experienced an error"})
        })
})

module.exports = router;