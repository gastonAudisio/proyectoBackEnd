import mongoose from 'mongoose';

const productCollection = 'products';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};
const numberTypeSchemaNOnUniqueRequired = {
    type: Number,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};

const booleanTypeSchemaNonUniqueRequired = {
    type: Boolean,
    required: true
};


const productSchema = new mongoose.Schema({
    code: stringTypeSchemaUniqueRequired,
    title: stringTypeSchemaUniqueRequired,
    description:stringTypeSchemaNonUniqueRequired,
    price: numberTypeSchemaNOnUniqueRequired,
    thumbnail:stringTypeSchemaNonUniqueRequired,
    stock: numberTypeSchemaNOnUniqueRequired,
    category: stringTypeSchemaNonUniqueRequired,
    status: booleanTypeSchemaNonUniqueRequired,
    carts:{
        type:Array,
        default:[]
    }
});

export const productModel = mongoose.model(productCollection, productSchema);

