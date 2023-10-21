import { db } from "@/lib/db"
import { $notes } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { noteId } = await req.json()

        const notes = await db.select().from($notes).where(
            eq($notes.id, parseInt(noteId))
        )
        if (!notes[0].imageUrl) {
            return new NextResponse('No image url', {status: 400})
        }
    } catch (error) {
        
    }
}