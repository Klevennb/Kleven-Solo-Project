const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const userID = req.user.id;
    console.log(userID);
    const queryText = `SELECT * FROM writing_entry
WHERE user_username='${userID}';`;
    pool.query(queryText)
        .then(results => res.send(results.rows))
        .catch((err) => { next(err); });
});

/**
 * POST route template
 */
//need to figue out how to insert
router.post('/', (req, res) => {
    const userID = req.user.id;
    const contents = req.body
    const queryText = 'INSERT INTO writing_entry (user_username, entry_contents) VALUES ($1, $2)';
    pool.query(queryText, [userID, contents])
        .then(() => { res.sendStatus(201); })
        .catch((err) => { next(err); });
});

module.exports = router;