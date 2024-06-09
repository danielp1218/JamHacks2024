import {NextResponse} from "next/server";
import { supabase } from "../supabase";
import PostgrestError from "@supabase/postgrest-js/src/PostgrestError";

const getPatientList = async (doctorID: string) => {
    const { data, error } = await supabase
        .from('users')
        .select('patients')
        .eq('id', doctorID)
    if (error) {
        return error;
    }
    return data[0]['patients'];
}

const getDoctorList = async (patientID: string) => {
    const { data, error } = await supabase
        .from('users')
        .select('doctors')
        .eq('id', patientID)
    if (error) {
        return error;
    }
    return data[0]['doctors'];
}

export async function POST(request: Request) {
    const patientID = request.url.split('/')[2];
    const { doctorID } = await request.json();
    let patientsRes = await getPatientList(doctorID);
    let doctorsRes = await getDoctorList(patientID);
    if(patientsRes instanceof PostgrestError || doctorsRes instanceof PostgrestError) {
        return NextResponse.json({ error: 'error' }, { status: 500 });
    }
    let patientList = patientsRes as string[];
    let doctorList = doctorsRes as string[];
    patientList.push(patientID);
    doctorList.push(doctorID);
    supabase.from('users').update({patients: patientList }).eq('id', doctorID).select()
    supabase.from('users').update({doctors: doctorList }).eq('id', patientID).select()
    return NextResponse.json({ message: 'success!' }, { status: 200 });
}