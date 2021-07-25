"use strict";
require('dotenv').config();
const express = require('express');
const router = express.Router();

//load controllers
const AppController = require('../controllers/App.Controller');


/**
 * @swagger
 *
 * /app/createAttribute:
 *   post:
 *     tags:
 *       - App
 *     description: Create new attributes
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: attrName
 *         description: Name of the attribute
 *         required: true
 *         type: string
 *       - in: formData
 *         name: attrValue
 *         description: Value of the attribute
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Attribute created successfully
 *       403:
 *         description: Unable to create attributes
 */
router.post('/createAttribute', AppController.createAttribute);

/**
 * @swagger
 *
 * /app/updateAttribute:
 *   patch:
 *     tags:
 *       - App
 *     description: Update attribute
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: attrId
 *         description: ID of the attribute
 *         required: true
 *         type: string
 *       - in: formData
 *         name: attrName
 *         description: Name of the attribute
 *         required: true
 *         type: string
 *       - in: formData
 *         name: attrValue
 *         description: Value of the attribute
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Attribute updated successfully
 *       403:
 *         description: Unable to update the attribute.
 */
router.patch('/updateAttribute', AppController.updateAttribute);

/**
 * @swagger
 *
 * /app/removeAttribute:
 *   patch:
 *     tags:
 *       - App
 *     description: Remove attribute
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: attrId
 *         description: ID of the attribute
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Attribute removed successfully
 *       403:
 *         description: Unable to remoive the attribute.
 */
router.patch('/removeAttribute', AppController.removeAttribute);

/**
 * @swagger
 *
 * /app/attributeList:
 *   get:
 *     tags:
 *       - App
 *     description: Remove attribute
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Attribute list fetched successfully
 *       404:
 *         description: Something went wrong.
 */
 router.get('/attributeList', AppController.attributeList);

/**
 * @swagger
 *
 * /app/submitDynamicData:
 *   post:
 *     tags:
 *       - App
 *     description: Submit dynamic form
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: attrName
 *         description: Name of the field
 *         required: false
 *         type: file
 *     responses:
 *       200:
 *         description: Form submited successfully
 *       403:
 *         description: Unable to submit the form data
 */
 router.post('/submitDynamicData', AppController.submitDynamicData);

module.exports = router;