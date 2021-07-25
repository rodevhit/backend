const createError = require('http-errors');
const Attribute = require('../Models/Attribute.model');
const formData = require('../Models/FormData.model');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/');
    },
    filename: (req, file, cb) => {
        const fileExt = file.originalname.split('.');
        const fileExtLength = file.originalname.split('.').length;

        cb(null, 'file-' + Date.now() + '.' + fileExt[fileExtLength-1]);
    }
});
const uploadFile = multer({ storage: storage }).fields(
    [{
            name: 'mediaFile',
            maxCount: 1
        },
    ]
);

module.exports = {
    createAttribute: async (req, res, next) => {
        try {
            const { attrName, attrValue } = req.body;

            if (attrName == '' || attrValue == '') {
                throw createError.NotFound('Blank data cannot be processed.');
            }

            const checkDuplicate = await Attribute.findOne({
                attributes: ['attribute_id'],
                where: {
                    attribute_name: attrName,
                    attribute_status: 1
                },
                raw: true
            });

            if (checkDuplicate) {
                throw createError.BadRequest('Attribute with same name already exists.');
            }

            const addAttribute = await Attribute.create({
                attribute_name: attrName.toLowerCase(),
                attribute_value: attrValue,
            });

            if (!addAttribute) {
                throw createError.Forbidden('Unable to add the attribute.')
            }

            res.send({
                status: 200,
                message: 'Attribute added successfully',
                newAttrData: addAttribute
            })
        } catch (error) {
            next(error);
        }
    },

    updateAttribute: async (req, res, next) => {
        try {
            const { attrId, attrName, attrValue } = req.body;
            console.log(req.body);

            if (attrId == '' || attrValue == '' || attrValue == '') {
                throw createError.NotFound('Blank data cannot be processed.');
            }

            const isValidAttr = await Attribute.findOne({
                attributes: ['attribute_id'],
                where: {
                    attribute_id: attrId,
                },
                raw: true
            });

            if (!isValidAttr) {
                throw createError.BadRequest('Attribute does not exist in our system.');
            }

            const checkDuplicate = await Attribute.findOne({
                attributes: ['attribute_id'],
                where: {
                    attribute_name: attrName,
                    attribute_value: attrValue,
                    attribute_status: 1
                },
                raw: true
            });

            if (checkDuplicate) {
                throw createError.BadRequest('Attribute with same name or value already exists.');
            }
            const updateAttribute = await Attribute.update({
                attribute_name: attrName.toLowerCase(),
                attribute_value: attrValue,
            }, {
                where: {
                    attribute_id: attrId
                }
            });

            if (!updateAttribute) {
                throw createError.Forbidden('Unable to update the attribute.')
            }

            res.send({
                status: 200,
                message: 'Attribute updated successfully',
                updatedAttrData: updateAttribute
            })
        } catch (error) {
            next(error);
        }
    },

    removeAttribute: async (req, res, next) => {
        try {
            const { attrId } = req.body;

            if (attrId == '') {
                throw createError.NotFound('Attribute ID is required to process the request.');
            }

            const isValidAttr = await Attribute.findOne({
                attributes: ['attribute_id'],
                where: {
                    attribute_id: attrId,
                },
                raw: true
            });

            if (!isValidAttr) {
                throw createError.BadRequest('Attribute does not exist in our system.');
            }

            const removeAttribute = await Attribute.update({
                attribute_status: 0
            }, {
                where: {
                    attribute_id: attrId
                }
            });

            if (!removeAttribute) {
                throw createError.Forbidden('Unable to remove the attribute.')
            }

            res.send({
                status: 200,
                message: 'Attribute removed successfully',
            });

        } catch (error) {
            next(error);
        }
    },

    attributeList: async (req, res, next) => {
        try {

            const attributeList = await Attribute.findAndCountAll({
                attributes: {
                    exclude: ['attribute_status']
                },
                where: {
                    attribute_status: 1
                },
                raw: true
            });

            res.send({
                status: 200,
                message: 'Attribute list fetched successfully',
                attrList: attributeList
            });

        } catch (error) {
            next(error);
        }
    },

    submitDynamicData: async (req, res, next) => {
        try {
            uploadFile(req, res, async (err) => {
                try {
                    
                    if(req.files.mediaFile){
                        if (err) {
                            throw createError.BadRequest(`File upload error!! ${err}.`);
                        }
                        return res.send({
                            status: 200,
                            message: 'Media data added successfully',
                        });
                    }else{
                        const {fieldName} = req.body;
                        
                        if(!fieldName){
                            throw createError.NotFound('Blank data cannot be processed.');
                        }
                        const saveData = await formData.create({
                            form_data_value: fieldName
                        });
    
                        return res.send({
                            status: 200,
                            message: 'Data added successfully',
                        });

                    }
                    
                } catch (error) {
                    console.log(error);
                    
                }
            });
        } catch (error) {
            next(error);
        }
    }
}