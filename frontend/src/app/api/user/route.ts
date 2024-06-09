import { NextResponse } from "next/server";
import {supabase} from "../supabase";

export async function GET(request: Request) {
    const data = await request.formData();
    return NextResponse.json(supabase.from('users').select().eq('wallet', data.get("wallet") as string));
}