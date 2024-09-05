import { createNote, dropNoteById, getNoteById, getNotesByUserId, updateNote } from "@/lib/dbAction";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const author = request.nextUrl.searchParams.get("author");
        const id = request.nextUrl.searchParams.get("id");
  
        if (author) {
          const notes = await getNotesByUserId(author);
          if (notes) return NextResponse.json(notes);
          else throw new Error("User not found");
        }
  
        if (id) {
          const note = await getNoteById(id);
          if (note) return NextResponse.json(note);
          else throw new Error("Note not found");
        }
  

        throw new Error("Invalid request, provide author or id");
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({ error: error.message ? error.message : error }, { status: 400 });
    }

}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const note = await createNote(body);
        if(note) return NextResponse.json({ id:note }, { status: 200 });
        else throw new Error("Failed to create note");
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({ error: error.message ? error.message : error }, { status: 400 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const note = await updateNote(body.id, body);
        if(note) return NextResponse.json({ updates:note }, { status: 200 });
        else throw new Error("Failed to update note");
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({ error: error.message ? error.message : error }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const note = await dropNoteById(body.id);
        if(note) return NextResponse.json({ updates:note }, { status: 200 });
        else throw new Error("Failed to update note");
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({ error: error.message ? error.message : error }, { status: 400 });
    }
}
