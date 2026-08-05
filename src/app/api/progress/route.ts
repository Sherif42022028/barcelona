import { NextResponse } from "next/server";
import { sql, initDb } from "@/lib/db";

export async function GET() {
  try {
    await initDb();
    const rows = await sql`SELECT completed_modules FROM user_progress WHERE user_id = 'default_user' LIMIT 1;`;
    if (rows && rows.length > 0) {
      return NextResponse.json({ completedModules: rows[0].completed_modules });
    }
    return NextResponse.json({ completedModules: [] });
  } catch (error: any) {
    console.error("GET progress error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await initDb();
    const body = await request.json();
    const { completedModules } = body;

    const existing = await sql`SELECT id FROM user_progress WHERE user_id = 'default_user' LIMIT 1;`;

    if (existing && existing.length > 0) {
      await sql`
        UPDATE user_progress 
        SET completed_modules = ${JSON.stringify(completedModules)}::jsonb, updated_at = CURRENT_TIMESTAMP 
        WHERE user_id = 'default_user';
      `;
    } else {
      await sql`
        INSERT INTO user_progress (user_id, completed_modules) 
        VALUES ('default_user', ${JSON.stringify(completedModules)}::jsonb);
      `;
    }

    return NextResponse.json({ success: true, completedModules });
  } catch (error: any) {
    console.error("POST progress error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
