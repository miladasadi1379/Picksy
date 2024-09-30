import { toast } from 'react-toastify';
import { createClient } from '@/utils/supabase/client'

const supabase = createClient();

export async function github() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',

    })
    if (data) toast.success('موفقیت آمیز بود')
    else toast.error('مشکلی پیش آمد')
    console.log(error)
}
export async function google() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    })
    if (data) toast.success('موفقیت آمیز بود')
    else toast.error('مشکلی پیش آمد')
    console.log(data)
    console.log(error)
}