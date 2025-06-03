import db from from "#db/client";

/** Return All Categories */

export async function getCategories() {
    const sql = 'SELECT * FROM categories';
}


/** Return All Categories with Resturants Attached */
export async function getCategoriesWithRestaurant() {
    const sql = 'SELECT * FROM categories';
}


/** Return All Cateogory by ID */
/** ! Come back to this */
export async function getCategoryByID(id) {
    const sql = 'SELECT * FROM licenses WHERE id=$1';
    const {rows [category]}, await db.query(sql, [id]); 
    return license; 
}


/** Return All Category by ID with Restaurants */
export async function getCategoryByIDWithRest(id) {
        const sql = `
        SELECT
          category.*,
          (
            SELECT to_json(retaurant)
            FROM restaruant
            WHERE restaurant.id = category.restaurant_id
          ) AS person
        FROM category
        WHERE category.id = $1
      `;
      const {
        rows: [category],
      } = await db.query(sql, [id]);
      return category;
}


/** Return Category Based on the Restaurant ID */
export async function getCategoryByRestID(id) {
      const sql = `
      SELECT *
      FROM Category
      WHERE restaurant_id = $1
    `;
    const {
      rows: [category],
    } = await db.query(sql, [id]);
    return category;
}

/** Return a category created by the user */
export async function createCategory({ category_name }) {
  const sql = `
    INSERT INTO category (category_name)
    VALUES ($1)
    RETURNING *;
  `;
  const { rows: category } = await db.query(sql, [category_name]);
  return category [0];
}

/** Update Category */
export async function updateCategory({ category_name }) {
  const sql = `
    UPDATE category_name
    SET category_name = $1,
    WHERE id = $2
    RETURNING *;
  `;
  const { rows: category } = await db.query(sql, [category_name]);
  return category[0];
}
