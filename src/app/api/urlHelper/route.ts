import { transcriptionFromYoutubeUrl } from "@/lib/url_helper";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const url = request.nextUrl.searchParams.get("url");
        if (url) {
          const { text, lang } = await transcriptionFromYoutubeUrl(url);
          return NextResponse.json({ text, lang });
        }
  
        throw new Error("Invalid request, provide url");
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({ error: error.message ? error.message : error }, { status: 400 });
    }   

}
