import db from "./client";

/** Return All Restuarants */

export async function getRestaurant() {
  const sql = `
  SELECT *
  FROM restaurant
  `;
  const { rows: restaurant } = await db.query(sql);
  return restaurant;
}


/** Return Retaurnat by ID */

export async function getRestaurantById(id) {
  const sql = `
  SELECT *
  FROM restaurant
  WHERE id = $1
  `;
  const {
    rows: [restaurant],
  } = await db.query(sql, [id]);
  return restaurant;
}