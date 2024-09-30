'use client'
import { useState, useEffect, useRef } from 'react';

import {
    Box, Button, Flex, SimpleGrid, Text, Tooltip, Spinner, Divider, useDisclosure,
    AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader,
    AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Input
} from "@chakra-ui/react";
import SideBar from '@/components/main/SideBar'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InventoryIcon from '@mui/icons-material/Inventory';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

// create data
function CreateItem({ getData }) {

    const supabase = createClient();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    const [address, setAddress] = useState({
        fullName: '',
        title: '',
        phone: '',
        postalCode: '',
        city: ''
    });
    const [loading, setLoading] = useState(false);
    console.log('address:', address)

    // update item
    async function handleUpdate() {
        setLoading(true);
        const { error, status } = await supabase
            .schema('picksy')
            .from('address')
            .insert({
                fullName: address.fullName,
                title: address.title,
                phone: address.phone,
                postalCode: address.postalCode,
                city: address.city
            })
        if (status === 201) {
            setLoading(false);
            toast.success("با موفقیت اضافه شد", {
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


    // get input
    function handleChange(e) {
        if (e.target.name === 'fullName') {
            setAddress({ ...address, fullName: e.target.value })
        }
        else if (e.target.name === 'address') {
            setAddress({ ...address, title: e.target.value })
        }
        else if (e.target.name === 'phone') {
            setAddress({ ...address, phone: e.target.value })
        }
        else if (e.target.name === 'postalCode') {
            setAddress({ ...address, postalCode: e.target.value })
        }
        else if (e.target.name === 'city') {
            setAddress({ ...address, city: e.target.value })
        }
    }


    return (
        <>
            <Button
                variant='solid'
                color='white'
                colorScheme='orange'
                onClick={onOpen}
            >
                ثبت آدرس جدید
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
                        <Text mt='2rem' color='black'>اضافه کردن نشانی</Text>
                    </AlertDialogHeader>
                    <AlertDialogCloseButton style={{ color: 'black' }} />
                    <AlertDialogBody>

                        <Input
                            placeholder='ادرس را وارد نمایید'
                            onChange={handleChange}
                            color='black'
                            border='1px solid black'
                            name='address'
                        />

                        <InventoryIcon fontSize="small" style={{ marginLeft: '.5rem', marginTop: '1rem', color: 'black' }} />
                        <Input
                            placeholder='شهر را وارد نمایید'
                            onChange={handleChange}
                            color='black'
                            border='1px solid black'
                            name='city'
                        />

                        <EmailIcon fontSize="small" style={{ marginLeft: '.5rem', marginTop: '1rem', color: 'black' }} />
                        <Input
                            placeholder='کد پستی را وارد نمایید'
                            onChange={handleChange}
                            color='black'
                            border='1px solid black'
                            name='postalCode'
                        />

                        <PhoneIcon fontSize="small" style={{ marginLeft: '.5rem', marginTop: '1rem', color: 'black' }} />
                        <Input
                            placeholder='شماره تلفن را وارد نمایید'
                            onChange={handleChange}
                            color='black'
                            border='1px solid black'
                            name='phone'
                        />

                        <PersonIcon fontSize="small" style={{ marginLeft: '.5rem', marginTop: '1rem', color: 'black' }} />
                        <Input
                            placeholder='نام خود را وارد نمایید'
                            onChange={handleChange}
                            color='black'
                            border='1px solid black'
                            name='fullName'
                        />
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                            variant='solid'
                            colorScheme='green'
                            onClick={() => handleUpdate() && onClose()}
                            isLoading={loading === true ? true : false}
                            w='100%'
                            m='0'
                        >
                            ذخیره
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

// update data
function UpdateItem({
    id, getData,
    fullName,
    title, phone,
    postalCode,
    city
}) {
    const supabase = createClient();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    const [address, setAddress] = useState({
        fullName: fullName,
        title: title,
        phone: phone,
        postalCode: postalCode,
        city: city
    });
    const [loading, setLoading] = useState(false);

    // update item
    async function handleUpdate() {
        setLoading(true);
        const { error, status } = await supabase
            .schema('picksy')
            .from('address')
            .update({
                fullName: address.fullName,
                title: address.title,
                phone: address.phone,
                postalCode: address.postalCode,
                city: address.city
            })
            .eq('id', id)
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


    // get input
    function handleChange(e) {
        if (e.target.name === 'fullName') {
            setAddress({ ...address, fullName: e.target.value })
        }
        else if (e.target.name === 'address') {
            setAddress({ ...address, title: e.target.value })
        }
        else if (e.target.name === 'phone') {
            setAddress({ ...address, phone: e.target.value })
        }
        else if (e.target.name === 'postalCode') {
            setAddress({ ...address, postalCode: e.target.value })
        }
        else if (e.target.name === 'city') {
            setAddress({ ...address, city: e.target.value })
        }
    }


    return (
        <>
            <Button
                variant='solid'
                onClick={onOpen}
                colorScheme='orange'
                mx='1rem'
            >
                ویرایش
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
                            placeholder='ادرس را وارد نمایید'
                            onChange={handleChange}
                            color='black'
                            border='1px solid black'
                            name='address'
                            value={address.title}
                            defaultValue={title}
                        />

                        <InventoryIcon fontSize="small" style={{ marginLeft: '.5rem', marginTop: '1rem', color: 'black' }} />
                        <Input
                            placeholder='شهر را وارد نمایید'
                            onChange={handleChange}
                            color='black'
                            border='1px solid black'
                            name='city'
                            value={address.city}
                            defaultValue={city}
                        />

                        <EmailIcon fontSize="small" style={{ marginLeft: '.5rem', marginTop: '1rem', color: 'black' }} />
                        <Input
                            placeholder='کد پستی را وارد نمایید'
                            onChange={handleChange}
                            color='black'
                            border='1px solid black'
                            name='postalCode'
                            value={address.postalCode}
                            defaultValue={postalCode}
                        />

                        <PhoneIcon fontSize="small" style={{ marginLeft: '.5rem', marginTop: '1rem', color: 'black' }} />
                        <Input
                            placeholder='شماره تلفن را وارد نمایید'
                            onChange={handleChange}
                            color='black'
                            border='1px solid black'
                            name='phone'
                            value={address.phone}
                            defaultValue={phone}
                        />

                        <PersonIcon fontSize="small" style={{ marginLeft: '.5rem', marginTop: '1rem', color: 'black' }} />
                        <Input
                            placeholder='نام خود را وارد نمایید'
                            onChange={handleChange}
                            color='black'
                            border='1px solid black'
                            name='fullName'
                            value={address.fullName}
                            defaultValue={fullName}
                        />
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                            variant='solid'
                            colorScheme='green'
                            onClick={() => handleUpdate() && onClose()}
                            isLoading={loading === true ? true : false}
                            w='100%'
                            m='0'
                        >
                            ذخیره
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default function Address() {
    const supabase = createClient();

    const [resData, setResData] = useState([]);
    const [loading, setLoading] = useState(false)

    async function getData() {
        setLoading(true);
        const { data, error } = await supabase
            .schema('picksy')
            .from('address')
            .select();
        if (data) {
            setLoading(false)
            setResData(data)
        } else {
            setLoading(false)
            console.log(error?.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    async function handleDelete(id) {
        setLoading(true)
        const { status, error } = await supabase
            .schema('picksy')
            .from('address')
            .delete()
            .eq('id', id)

        if (status === 204) {
            setLoading(false);
            toast.success("با موفقیت حذف شد")
            getData();
        } else if (error) {
            setLoading(false);
            toast.error('مشکلی رخ داد')
            error.message();
        }
    }


    return (
        <SimpleGrid display={'flex'}>
            <SideBar />

            <Box
                m='2rem'
                w='80%'
                border='1px solid black'
                borderRadius='1rem'
                mb={{ base: '2rem', sm: '10rem', md: '2rem', lg: '2rem' }}
            >
                <Flex w='100%' placeContent='space-between'>
                    <Box color='GrayText' m='1rem' borderBottom='2px solid gray'>
                        آدرس ها
                    </Box>
                    <Box m='1rem'>
                        <Button
                            variant='solid'
                            color='white'
                            colorScheme='orange'
                        >
                            <CreateItem getData={getData} />
                        </Button>
                    </Box>
                </Flex>
                {
                    loading === true ? (
                        <>
                            <Box className='flexCenter' minH='inherit'>
                                <Spinner size='xl' color='black' />
                            </Box>
                        </>
                    ) : (

                        <>
                            {
                                resData.map((item, key) => (
                                    <>
                                        <Box color='black' m='1rem'>
                                            {item.title}
                                        </Box>
                                        <Box color='GrayText' mx='1rem'>
                                            <Text display='flex' placeItems='center'>
                                                <InventoryIcon fontSize="small" style={{ marginLeft: '.5rem', marginBlock: '.2rem' }} />
                                                {item.city}
                                            </Text>
                                            <Text display='flex' placeItems='center'>
                                                <EmailIcon fontSize="small" style={{ marginLeft: '.5rem', marginBlock: '.2rem' }} />
                                                {item.postalCode}
                                            </Text>
                                            <Text display='flex' placeItems='center'>
                                                <PhoneIcon fontSize="small" style={{ marginLeft: '.5rem', marginBlock: '.2rem' }} />
                                                {item.phone}
                                            </Text>
                                            <Text display='flex' placeItems='center'>
                                                <PersonIcon fontSize="small" style={{ marginLeft: '.5rem', marginBlock: '.2rem' }} />
                                                {item.fullName}
                                            </Text>
                                            <Flex w='100%' key={key} placeContent='end'>
                                                <Box m='0rem'>
                                                    <Button color="black" variant='link' >
                                                        <Tooltip label={'ویرایش'} defaultIsOpen={false} hasArrow bg='black'>
                                                            <UpdateItem
                                                                id={item.id}
                                                                getData={getData}
                                                                city={item.city}
                                                                fullName={item.fullName}
                                                                phone={item.phone}
                                                                postalCode={item.postalCode}
                                                                title={item.title}
                                                            />
                                                        </Tooltip>
                                                    </Button>
                                                    <Button
                                                        variant='solid'
                                                        colorScheme='red'
                                                        onClick={() => handleDelete(item.id)}
                                                    >
                                                        حذف
                                                    </Button>
                                                </Box>
                                            </Flex>

                                            <Divider style={{ marginBlock: '2rem', border: '1px solid black' }} />
                                        </Box>
                                    </>
                                ))
                            }
                        </>
                    )
                }

            </Box>
        </SimpleGrid>
    )
}