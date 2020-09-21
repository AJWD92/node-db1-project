const e = require('express');
const express = require('express');
const { count } = require('../data/dbConfig.js');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const accounts = await db('accounts');
        res.status(200).json({
            success: true,
            data: accounts
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error getting accounts',
            error: err
        });
    };
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [account] = await db('accounts').where({ id });
        
        if (account) {
            res.status(200).json({
                success: true,
                data: account,
            })
        } else {
            res.status(404).json({
                success: false,
                message: `No such account with id ${id} exist.`
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'db error',
            error: err
        });
    };
});

router.post('/', (req, res) => {
    const newAccount = req.body;

    try {
        const account = await db('accounts').insert(newAccount);
        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            data: account
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Could not create account.'
        });
    };
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const accountsInfo = req.body;

    try {
        const count = await db('accounts').update(accountsInfo).where({ id });

        if (count) {
            res.status(200).json({
                success: true,
                message: 'Account was updated successfully.',
                data: count
            });
        } else {
            res.status(404).json({
                success: false,
                message: `No such account with id ${id} exist.`
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error updating account.'
        });
    };
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        if (count) {
            res.status(200).json({
                success: true,
                message: 'Account deleted successfully.',
                data: {}
            });
        } else {
            res.status(404).json({
                success: false,
                message: `No such account with id ${id} exist.`
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error deleting post.',
            error: err
        })
    }
})


module.exports = router;