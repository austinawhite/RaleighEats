import express from 'express';
const router = express.Router();
export default router;

import {
    getCategories,
    getCategoriesWithRestaurant,
    getCategoryByID,
    createCategory,
    updateCategory
}
