'use client'
import { useState, useEffect } from 'react';
import {
    Box, Button, SimpleGrid,
    Input, Spinner
} from '@chakra-ui/react'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import SideBar from '@/components/main/SideBar'
import { createClient } from '@/utils/supabase/client';
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation';

export default function Password() {
    const supabase = createClient();
    const route = useRouter();

    const [data, setData] = useState([]);
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false)

    async function getData() {
        setLoading(true);
        const { data, error } = await supabase.auth.getSession()
        if (data) {
            setLoading(false)
            setData(data.session.user.email)
        } else {
            setLoading(false)
            console.log(error?.message)
        }
    }


    useEffect(() => {
        getData()
    }, [])

    async function changePass() {
        const { data, error } = await supabase.auth
            .updateUser({ password: newPassword })
        if (data) {
            setLoading(false);
            toast.success("با موفقیت ویرایش شد", {
                theme: 'dark',
                icon: <DoneIcon style={{ color: 'white' }} />
            })
            route.push('/dashboard')
        } else if (error) {
            setLoading(false);
            toast.error('مشکلی رخ داد', {
                theme: 'dark',
                icon: <CloseIcon style={{ color: 'darkred' }} />
            })
            console.log(error.message)
        }
    }

    function handleChange(e) {
        setNewPassword(e.target.value)
    }


    return (
        <SimpleGrid
            display={'flex'}
        >
            <SideBar />
            <Box
                minHeight={'100vh'}
                w={{ base: '80%' }}
                color='black'
                m='2rem'
                className='flexCenter'
            >
                {
                    loading === true ? (
                        <>
                            <Box className='flexCenter' minH='inherit'>
                                <Spinner size='xl' color='black' />
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box
                                w='100%'
                                border={'1px solid black'}
                                borderRadius={'.5rem'}
                                className='flexCenter'
                                p='2rem'
                            >
                                <Input
                                    placeholder='رمز جدید را وارد نمایید'
                                    onChange={handleChange}
                                    color='black'
                                    border='1px solid black'
                                    type='password'
                                />
                                <Button
                                    variant='solid'
                                    colorScheme='dark'
                                    onClick={() => changePass()}
                                    mx='1rem'
                                    _loading={loading === true ? true : false}
                                >
                                    ذخیره
                                </Button>
                            </Box>
                        </>
                    )
                }
            </Box>
        </SimpleGrid>
    )
}

