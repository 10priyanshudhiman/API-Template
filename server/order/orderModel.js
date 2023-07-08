const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const validators = require('../utils/validators');


const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        validate: validators.objectIdValidator,
        required: true 
    },
    sub_total:{
        type: Number,
        required: true
    },
    mobileNumber:{
        type: String,
        required: [true, "mobileNumber is required"]
    }
},{
    timestamps:true
});


orderSchema.plugin(mongoosePaginate)

module.exports = mongoose.mainConnection.model('Order', orderSchema, 'orders');
