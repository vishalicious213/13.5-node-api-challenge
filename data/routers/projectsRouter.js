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
    let project = req.body;

    if(!project.name || !project.description) {
        res.status(400).json({message: "Missing project name or description"})
    }

    projUtils.insert(project)
        .then(project => res.status(201).json(project))
        .catch(error => res.status(500).json({message: "Project was not added", error}))
})

// PUT project (update project)
router.put('/:id', (req, res) => {
    let project = req.body;

    if(!project.id) {
        res.status(400).json({message: "Missing project ID"})
    }

    projUtils.update(req.params.id, project)
        .then(project => res.status(200).json(project))
        .catch(error => res.status(404).json({message: "Project was not updated", error}))
})

// DELETE project by ID
router.delete('/:id', (req, res) => {
    projUtils.remove(req.params.id)
        .then(project => res.status(200).json({message: "The project was deleted"}))
})

// GET project actions
router.get('/:id/actions', (req, res) => {
    projUtils.getProjectActions(req.params.id)
        .then(actions => res.status(200).json(actions))
        .catch(error => res.status(500).json({message: "Unable to find project's actions"}))
})

module.exports = router;