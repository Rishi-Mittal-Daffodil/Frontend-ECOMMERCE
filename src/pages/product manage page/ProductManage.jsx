import React from 'react'
import './ProductManage.css'
import { Outlet } from 'react-router-dom'

function ProductManage() {
  return (
    <>
        <div>
            <h2 className='manage-head' >Manage Products</h2>
            <Outlet />
        </div>

    </>
  )
}

export default ProductManage



/*I want to Create a Form which is to get information about product it includes multiple fields according to this schema 
        name: { type: String, required: true, trim: true, unique: true },

        description: { type: String, required: true, trim: true },

        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        brand: { type: String, trim: true },

        sku: { type: String, required: true, unique: true },

        price: { type: Number, required: true },

        discountPrice: { type: Number, default: 0 },

        attributes: [
            {
                name: { type: String, required: true },
                value: { type: String, required: true },
            },
        ], // color, size

        stock: { type: Number, required: true, min: 0 },

        images: [
            { url: { type: String, required: true }, alt: { type: String } },
        ],

        isFeatured: { type: Boolean, default: false },

        status: {
            type: String,
            enum: ["active", "inactive", "out-of-stock"],
            default: "active",
        },

        tags: [String],

        ratings: { type: Number, default: 0 },


        weight: { type: Number, required: true },
        
        
        i just want to create this full form  react component with wonderfull design submit button should be this color #298e83  */ 