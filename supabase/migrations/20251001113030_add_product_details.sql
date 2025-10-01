/*
  # Add Product Details for Ingredients and Allergens

  1. Changes
    - Add `ingredients` column to products table (text array)
    - Add `allergens` column to products table (text array)
    - Add `nutritional_info` column to products table (jsonb)

  2. Notes
    - These fields are optional and will be displayed in the product info popup
    - Ingredients: list of ingredients in the product
    - Allergens: list of allergens present in the product
    - Nutritional info: optional detailed nutritional information
*/

-- Add new columns to products table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'ingredients'
  ) THEN
    ALTER TABLE products ADD COLUMN ingredients text[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'allergens'
  ) THEN
    ALTER TABLE products ADD COLUMN allergens text[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'nutritional_info'
  ) THEN
    ALTER TABLE products ADD COLUMN nutritional_info jsonb DEFAULT '{}'::jsonb;
  END IF;
END $$;