import { NextResponse } from "next/server";
import { sql, initDb } from "@/lib/db";

export async function POST(request: Request) {
  try {
    await initDb();
    const body = await request.json();
    const { moduleId, score, passed } = body;

    await sql`
      INSERT INTO exam_scores (user_id, module_id, score, passed) 
      VALUES ('default_user', ${moduleId}, ${score}, ${passed});
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("POST score error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
