import { getUserById, createUser, updateUser, dropUserById } from "@/lib/dbAction";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
  
        if (id) {
          const user = await getUserById(id);
          if (user) return NextResponse.json(user);
          else throw new Error("User not found");
        }
  
        
  

        throw new Error("Invalid request, provide  id");
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({ error: error.message ? error.message : error }, { status: 400 });
    }

}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const user = await createUser(body);
        if(user) return NextResponse.json({ id:user }, { status: 200 });
        else throw new Error("Failed to create user");
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({ error: error.message ? error.message : error }, { status: 400 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const user = await updateUser(body.id, body);
        if(user) return NextResponse.json({ updates:user }, { status: 200 });
        else throw new Error("Failed to update user");
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({ error: error.message ? error.message : error }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const user = await dropUserById(body.id);
        if(user) return NextResponse.json({ updates:user }, { status: 200 });
        else throw new Error("Failed to update user");
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({ error: error.message ? error.message : error }, { status: 400 });
    }
}
