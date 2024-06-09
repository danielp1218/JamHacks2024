import {supabase } from './supabase';

export async function walletToId(wallet: string): Promise<string> {
    let id: string = '';
    await supabase.from('users')
        .select('uuid')
        .eq('wallet', wallet).then(({ data, error }) => {
            if (error) {
                throw error;
            }
            id = data[0].uuid as string;
        });
    return id;
}

export async function idToName(id: string): Promise<string> {
    let name: string = '';
    await supabase.from('users')
        .select()
        .eq('uuid', id).then(({ data, error }) => {
            if (error) {
                throw error;
            }
            name = data[0]["First Name"] + " " + data[0]["Last Name"] as string;
        });
    return name;
}