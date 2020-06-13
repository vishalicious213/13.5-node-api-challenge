const express = require('express');
const router = express.Router();

// import helpers from projectModel
const projUtils = require('../helpers/projectModel');

router.get('/', (req, res) => {
    projUtils.get()
        .then(project => res.status(200).json(project))
        .catch(error => res.status(500).json({
            message: "Error retrieving projects"
        }))
})

module.exports = router;