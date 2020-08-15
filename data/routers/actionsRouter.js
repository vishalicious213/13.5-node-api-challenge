const express = require('express');
const router = express.Router();

// import helpers from actionModel
const actionUtils = require('../helpers/actionModel');

// GET array of actions - project_id check not working
router.get('/', (req, res) => {
    const project_id = Number(req.params.project_id);
    console.log('proj_id: ', project_id);
    console.log('req proj_id: ', req.params.project_id);
    console.log('req params: ', req.params);
    actionUtils.get(project_id)
        // .then(action => {
        //     if (action.project_id) {
        //         res.status(200).json(action)
        //     } else {
        //         res.status(404).json({
        //             message: 'The action does not exist',
        //         })
        //     }
        // })

        .then(action => res.status(200).json(action))
        .catch(error => res.status(500).json({message: "Error retrieving actions"}))
})

// GET action by project ID & action ID
router.get('/:id', (req, res) => {
    actionUtils.get(req.params.id)
        .then(action => res.status(200).json(action))
        .catch(error => res.status(500).json({message: "Unable to find action"}))
})

// POST new action (add new action)
router.post('/:project_id', (req, res) => {
    let action = req.body;
    action.project_id = Number(req.params.project_id);
    console.log('params.project_id: ', req.params.project_id);
    console.log('action: ', action);

    if(!action.description || !action.project_id) {
        res.status(400).json({message: "Missing action name or associated project"})
    }

    actionUtils.insert(action)
        .then(action => res.status(201).json(action))
        .catch(error => res.status(500).json({message: "Action was not added", error}))
})

// DELETE action by ID
router.delete('/:id', (req, res) => {
    actionUtils.remove(req.params.id)
        .then(action => res.status(200).json({message: "The action was deleted"}))
        .catch(error => res.status(500).json({message: 'The action could not be removed'}))
})

module.exports = router;