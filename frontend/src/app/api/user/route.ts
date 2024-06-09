import { NextResponse } from "next/server";
import {supabase} from "../util/supabase";

export async function GET(request: Request) {
    const wallet = request.url.split("?")[1];
    const { data, error } = await supabase.from('users').select().eq('wallet', wallet).single();
    if (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
}