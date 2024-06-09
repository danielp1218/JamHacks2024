import {NextResponse} from "next/server";
import { supabase } from "../util/supabase";
import {walletToId} from "@/app/api/util/convert";

export async function POST(request: Request) {
    const { doctorWallet, patientID } = await request.json();
    const doctorID = await walletToId(doctorWallet);

    let patientList: string[] = [];
    let doctorList: string[] = [];
    let err:any  = null;
    await supabase.from('users')
        .select()
        .eq('uuid', doctorID).then(({ data, error }) => {
            if (error) {
                err = error;
            } else{
                patientList = data[0].patients!;
            }
        });
    if(err){
        return NextResponse.json({ message: err }, { status: 500 });
    }
    await supabase.from('users')
        .select()
        .eq('uuid', patientID).then(({ data, error }) => {
            if (error) {
                err = error;
            } else{
                doctorList = data[0].doctors!;
            }
        });
    if(err){
        return NextResponse.json({ message: err }, { status: 500 });
    }
    if(patientList.includes(patientID) || doctorList.includes(doctorID)){
        return NextResponse.json({ message: 'User is already a patient!' }, { status: 200 });
    }
    patientList.push(patientID);
    doctorList.push(doctorID);
    await supabase.from('users').update({patients: patientList }).eq('uuid', doctorID).select()
    await supabase.from('users').update({doctors: doctorList }).eq('uuid', patientID).select()
    return NextResponse.json({ message: 'Successfully added!' }, { status: 200 });
}