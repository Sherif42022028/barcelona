import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL || "";

export const sql = neon(databaseUrl);

export async function initDb() {
  if (!databaseUrl) return;
  try {
    // Create progress table if not exists
    await sql`
      CREATE TABLE IF NOT EXISTS user_progress (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) DEFAULT 'default_user',
        completed_modules JSONB DEFAULT '[]'::jsonb,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create exam scores table
    await sql`
      CREATE TABLE IF NOT EXISTS exam_scores (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) DEFAULT 'default_user',
        module_id VARCHAR(255) NOT NULL,
        score INT NOT NULL,
        passed BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}
