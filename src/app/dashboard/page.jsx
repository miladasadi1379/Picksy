'use client'
import { useState, useEffect, useRef } from 'react';
import {
    Box, Button, SimpleGrid, Text,
    AlertDialog, AlertDialogBody,
    AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
    AlertDialogOverlay,
    useDisclosure, Input,
    Select, Spinner
} from '@chakra-ui/react'

import SideBar from '@/components/main/SideBar'
import EditIcon from '@mui/icons-material/Edit';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';


function UpdateItem({ id, getData }) {
    const supabase = createClient();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);


    // update item
    async function handleUpdate() {
        setLoading(true);
        let fetchStatus = '';
        let fetchError = '';

        if (id === 'FullName') {
            const { error, status } = await supabase
                .schema('picksy')
                .from('userInfo')
                .update({ fullName: text })
                .eq('id', '1')
            fetchStatus = status;
            fetchError = error;
        };
        if (id === 'phone') {
            const { error, status } = await supabase
                .schema('picksy')
                .from('userInfo')
                .update({ phone: text })
                .eq('id', '1')
            fetchStatus = status;
            fetchError = error;
        };
        if (id === 'IdNumber') {
            const { error, status } = await supabase
                .schema('picksy')
                .from('userInfo')
                .update({ idNumber: text })
                .eq('id', '1')
            fetchStatus = status;
            fetchError = error;
        };
        if (id === 'email') {
            const { error, status } = await supabase
                .schema('picksy')
                .from('userInfo')
                .update({ email: text })
                .eq('id', '1')
            fetchStatus = status;
            fetchError = error;
        };
        if (id === 'birthDay') {
            const { error, status } = await supabase
                .schema('picksy')
                .from('userInfo')
                .update({
                    birth_day: text,
                    birth_mouth: text,
                    birth_year: text
                })
                .eq('id', '1');
            fetchStatus = status;
            fetchError = error;
        }

        if (fetchStatus === 204) {
            setLoading(false);
            toast.success("با موفقیت ویرایش شد", {
                theme: 'dark',
                icon: <DoneIcon style={{ color: 'white' }} />
            })
            getData()
        } else if (fetchError) {
            setLoading(false);
            toast.error('مشکلی رخ داد', {
                theme: 'dark',
                icon: <CloseIcon style={{ color: 'darkred' }} />
            })
            console.log(error.message)
        }
    }


    // get input
    function handleChange(e) {
        setText(e.target.value)
    }


    return (
        <>
            <Button
                variant='ghost'
                color='black'
                onClick={onOpen}
            >
                <EditIcon />
            </Button>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Text mt='2rem' color='black'>ویرایش</Text>
                    </AlertDialogHeader>
                    <AlertDialogCloseButton style={{ color: 'black' }} />
                    <AlertDialogBody>
                        <Input
                            placeholder='عبارت جدید را وارد نمایید'
                            onChange={handleChange}
                            color='black'
                            border='1px solid black'
                        />
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                            variant='solid'
                            colorScheme='green'
                            onClick={() => handleUpdate() && onClose()}
                            mx='1rem'
                            _loading={loading === true ? true : false}
                        >
                            ذخیره
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

function UpdateItemBirthDay({ id, getData }) {
    const supabase = createClient();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    const [text, setText] = useState({
        day: '',
        mounth: '',
        year: ''
    });
    const [loading, setLoading] = useState(false);

    console.log('Text:', text)
    console.log('id:', id)
    const day = []
    for (let i = 0; i < 31; i++) {
        day.push(i + 1)
    }
    const mounth = []
    for (let i = 0; i < 12; i++) {
        mounth.push(i + 1)
    }
    const year = []
    for (let i = 1300; i < 1390; i++) {
        year.push(i + 1)
    }

    // update item
    async function handleUpdate() {
        setLoading(true);

        if (id === 'birthDay') {
            const { error, status } = await supabase
                .schema('picksy')
                .from('userInfo')
                .update({
                    birth_day: text.day,
                    birth_mouth: text.mounth,
                    birth_year: text.year
                })
                .eq('id', '1');

            if (status === 204) {
                setLoading(false);
                toast.success("با موفقیت ویرایش شد", {
                    theme: 'dark',
                    icon: <DoneIcon style={{ color: 'white' }} />
                })
                getData()
            } else if (error) {
                setLoading(false);
                toast.error('مشکلی رخ داد', {
                    theme: 'dark',
                    icon: <CloseIcon style={{ color: 'darkred' }} />
                })
                console.log(error.message)
            }
        }
    }


    // get input
    function handleChangeDay(e) {
        setText({ ...text, day: e.target.value })
    }
    function handleChangeMounth(e) {
        setText({ ...text, mounth: e.target.value })
    }
    function handleChangeYear(e) {
        setText({ ...text, year: e.target.value })
    }

    // show day
    function showDay() {
        return (
            <>
                <Text color='black' my='.5rem'>روز</Text>
                <Select color='black' w='6rem' onChange={handleChangeDay}>
                    {
                        day.map((item, key) => (
                            <option key={key} value={item}>{item}</option>
                        ))
                    }
                </Select>
            </>
        )
    }

    // show mounth
    function showMounth() {
        return (
            <>
                <Text color='black' my='.5rem'>ماه</Text>
                <Select color='black' w='6rem' onChange={handleChangeMounth}>
                    {
                        mounth.map((item, key) => (
                            <option key={key} value={item}>{item}</option>
                        ))
                    }
                </Select>
            </>
        )
    }

    // show years
    function showYear() {
        return (
            <>
                <Text color='black' my='.5rem'>سال</Text>
                <Select color='black' w='6rem' onChange={handleChangeYear}>
                    {
                        year.map((item, key) => (
                            <option key={key} value={item}>{item}</option>
                        ))
                    }
                </Select>
            </>
        )
    }


    return (
        <>
            <Button
                variant='ghost'
                color='black'
                onClick={onOpen}
            >
                <EditIcon />
            </Button>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Text mt='2rem' color='black'>ویرایش تاریخ تولد</Text>
                    </AlertDialogHeader>
                    <AlertDialogCloseButton style={{ color: 'black' }} />
                    <AlertDialogBody>

                        <Box display='flex'>
                            <Box mx='1rem'>{showDay()}</Box>
                            <Box mx='1rem'>{showMounth()}</Box>
                            <Box mx='1rem'>{showYear()}</Box>
                        </Box>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                            variant='solid'
                            colorScheme='green'
                            onClick={() => handleUpdate() && onClose()}
                            mx='1rem'
                            _loading={loading === true ? true : false}
                        >
                            ذخیره
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}


export default function Dashboard() {
    const supabase = createClient();

    const [data, setData] = useState([]);
    const [session, setSession] = useState([]);
    const [loading, setLoading] = useState(false)

    async function getData() {
        setLoading(true);
        const { data, error } = await supabase
            .schema('picksy')
            .from('userInfo')
            .select()
        if (data) {
            setLoading(false)
            setData(data)
        } else {
            setLoading(false)
            console.log(error?.message)
        }
    }

    async function getSession() {
        setLoading(true);
        const { data, error } = await supabase.auth.getSession()
        if (data) {
            setLoading(false)
            setSession(data.session.user.email)
        } else {
            setLoading(false)
            console.log(error?.message)
        }
    }


    useEffect(() => {
        getData()
        getSession()
    }, [])


    async function sendReqPassword() {
        setLoading(true);
        const { data, error } = await supabase.auth
            .resetPasswordForEmail(session, { redirectTo: 'http://localhost:3000/dashboard/changepassword' })
        if (data) {
            setLoading(false)
            toast.success("لطفا ایمیل خود را چک نمایید", {
                theme: 'dark',
                icon: <DoneIcon style={{ color: 'white' }} />
            })
        } else {
            setLoading(false)
            toast.error('مشکلی رخ داد', {
                theme: 'dark',
                icon: <CloseIcon style={{ color: 'darkred' }} />
            })
            console.log(error.message)
        }
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
                mb={{ base: '0', sm: '4rem', md: '0', lg: '0' }}
            >
                {
                    loading === true ? (
                        <>
                            <Box className='flexCenter' minH='inherit'>
                                <Spinner size='xl' color='black' />
                            </Box>
                        </>
                    ) : (
                        <SimpleGrid
                            w={'100%'}
                            gridTemplateColumns={{
                                base: 'repeat(1, minmax(0, 1fr))',
                                sm: 'repeat(1, minmax(0, 1fr))',
                                md: 'repeat(1, minmax(0, 1fr))',
                                lg: 'repeat(2, minmax(0, 1fr))',
                            }}
                            spacing={1}
                        >
                            {
                                data?.map((item, key) => (
                                    <>
                                        <Box
                                            display={'flex'}
                                            h={'5rem'}
                                            w='100%'
                                            border={'1px solid black'}
                                            borderRadius={'.5rem'}
                                            key={key}
                                        >
                                            <Box display={'block'} w='50%' m='1rem'>
                                                <Text fontSize='sm' color='GrayText'>نام و نام خانوادگی</Text>
                                                <Text fontSize='md'>{item.fullName}</Text>
                                            </Box>
                                            <Box m='1rem' w='inherit' className='flexLeft'>
                                                <Button
                                                    colorScheme='dark'
                                                    variant='link'
                                                    onClick={``}
                                                >
                                                    <UpdateItem id={'FullName'} getData={getData} />
                                                </Button>
                                            </Box>
                                        </Box>

                                        <Box
                                            display={'flex'}
                                            h={'5rem'}
                                            w='100%'
                                            border={'1px solid black'}
                                            borderRadius={'.5rem'}
                                        >
                                            <Box display={'block'} w='50%' m='1rem'>
                                                <Text fontSize='sm' color='GrayText'>کد ملی</Text>
                                                <Text fontSize='md'>{item.idNumber}</Text>
                                            </Box>
                                            <Box m='1rem' w='inherit' className='flexLeft'>
                                                <Button
                                                    colorScheme='dark'
                                                    variant='link'
                                                >
                                                    <UpdateItem id={'IdNumber'} getData={getData} />
                                                </Button>
                                            </Box>
                                        </Box>

                                        <Box
                                            display={'flex'}
                                            h={'5rem'}
                                            w='100%'
                                            border={'1px solid black'}
                                            borderRadius={'.5rem'}
                                        >
                                            <Box display={'block'} w='50%' m='1rem'>
                                                <Text fontSize='sm' color='GrayText'>شماره موبایل</Text>
                                                <Text fontSize='md'>{item.phone}</Text>
                                            </Box>
                                            <Box m='1rem' w='inherit' className='flexLeft'>
                                                <Button
                                                    colorScheme='dark'
                                                    variant='link'
                                                >
                                                    <UpdateItem id={'phone'} getData={getData} />
                                                </Button>
                                            </Box>
                                        </Box>

                                        <Box
                                            display={'flex'}
                                            h={'5rem'}
                                            w='100%'
                                            border={'1px solid black'}
                                            borderRadius={'.5rem'}
                                        >
                                            <Box display={'block'} w='50%' m='1rem'>
                                                <Text fontSize='sm' color='GrayText'>ایمیل</Text>
                                                <Text fontSize='smaller' display='flex'>{item.email}</Text>
                                            </Box>
                                            <Box m='1rem' w='inherit' className='flexLeft'>
                                                <Button
                                                    colorScheme='dark'
                                                    variant='link'
                                                    id='email'
                                                >
                                                    <UpdateItem id={'email'} getData={getData} />
                                                </Button>
                                            </Box>
                                        </Box>

                                        <Box
                                            display={'flex'}
                                            h={'5rem'}
                                            w='100%'
                                            border={'1px solid black'}
                                            borderRadius={'.5rem'}
                                        >
                                            <Box display={'block'} w='50%' m='1rem'>
                                                <Text fontSize='sm' color='GrayText'>تاریخ تولد</Text>
                                                <Text fontSize='md'>{`${item.birth_year}/${item.birth_mouth}/${item.birth_day}`}</Text>
                                            </Box>
                                            <Box m='1rem' w='inherit' className='flexLeft'>
                                                <Button
                                                    colorScheme='dark'
                                                    variant='link'
                                                >
                                                    <UpdateItemBirthDay id={'birthDay'} getData={getData} />
                                                </Button>
                                            </Box>
                                        </Box>

                                        <Box
                                            display={'flex'}
                                            h={'5rem'}
                                            w='100%'
                                            border={'1px solid black'}
                                            borderRadius={'.5rem'}
                                        >
                                            <Box display={'block'} w='50%' m='1rem'>
                                                <Text fontSize='sm' color='GrayText'>رمز عبور</Text>
                                                <Text fontSize='md'>******</Text>
                                            </Box>
                                            <Box m='1rem' w='inherit' className='flexLeft'>
                                                <Button
                                                    colorScheme='dark'
                                                    variant='link'
                                                    onClick={sendReqPassword}
                                                    isLoading={loading === true ? true : false}
                                                >
                                                    <EditIcon />
                                                </Button>
                                            </Box>
                                        </Box>
                                    </>
                                ))
                            }
                        </SimpleGrid>
                    )
                }
            </Box>
        </SimpleGrid>
    )
}

