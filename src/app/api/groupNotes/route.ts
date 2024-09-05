import { createGroupNote, dropGroupNoteById, getGroupNoteById, getGroupNotesByUserId, updateGroupNote } from "@/lib/dbAction";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const author = request.nextUrl.searchParams.get("author");
        const id = request.nextUrl.searchParams.get("id");
  
        if (author) {
          const notes = await getGroupNotesByUserId(author);
          if (notes) return NextResponse.json(notes);
          else throw new Error("User not found");
        }
  
        if (id) {
          const note = await getGroupNoteById(id);
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
        const note = await createGroupNote(body);
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
        const note = await updateGroupNote(body.id, body);
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
        const note = await dropGroupNoteById(body.id);
        if(note) return NextResponse.json({ updates:note }, { status: 200 });
        else throw new Error("Failed to update note");
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({ error: error.message ? error.message : error }, { status: 400 });
    }
}
