const express = require("express")
const { handleGenerateNewShortUrl, handleGetAnalytics, handleRedirect, handleDeleteUrl } = require('../controllers/url')
const { restrictToLoginUserOnly } = require('../middlewares/auth');

const router = express.Router();

router.post('/', restrictToLoginUserOnly, handleGenerateNewShortUrl);

router.get('/:shortId', handleRedirect);

router.get('/analytics/:shortId', restrictToLoginUserOnly, handleGetAnalytics);

router.delete('/:shortId', restrictToLoginUserOnly, handleDeleteUrl);

module.exports = router;