import { createDairy, dropDairyById, getDairyById, getDairiesByUserId, updateDairy } from "@/lib/dbAction";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const author = request.nextUrl.searchParams.get("author");
        const id = request.nextUrl.searchParams.get("id");
  
        if (author) {
          const dairies = await getDairiesByUserId(author);
          if (dairies) return NextResponse.json(dairies);
          else throw new Error("User not found");
        }
  
        if (id) {
          const dairy = await getDairyById(id);
          if (dairy) return NextResponse.json(dairy);
          else throw new Error("Dairy not found");
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
        const dairy = await createDairy(body);
        if(dairy) return NextResponse.json({ id:dairy }, { status: 200 });
        else throw new Error("Failed to create dairy");
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({ error: error.message ? error.message : error }, { status: 400 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const dairy = await updateDairy(body.id, body);
        if(dairy) return NextResponse.json({ updates:dairy }, { status: 200 });
        else throw new Error("Failed to update dairy");
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({ error: error.message ? error.message : error }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const dairy = await dropDairyById(body.id);
        if(dairy) return NextResponse.json({ updates:dairy }, { status: 200 });
        else throw new Error("Failed to update dairy");
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({ error: error.message ? error.message : error }, { status: 400 });
    }
}


