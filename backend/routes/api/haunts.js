const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Haunt, Image } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const haunts = await Haunt.findAll({
        include: Image
    });
    return res.json(haunts);
}));

module.exports = router;
