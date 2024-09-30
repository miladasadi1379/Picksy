'use client'
import { useState, useEffect, useRef } from "react";
import {
    AlertDialog, AlertDialogBody,
    AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
    AlertDialogOverlay, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, GridItem,
    NumberDecrementStepper, NumberIncrementStepper, NumberInput,
    NumberInputField, NumberInputStepper, SimpleGrid, Spinner, Text, useDisclosure
} from "@chakra-ui/react";
import { createClient } from '@/utils/supabase/client'
import Image from "next/image";
import Link from "next/link";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import CustomNumeralNumericFormat from '@/components/main/helpers/price'
import { toast } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

function UpdateItem({ qtyValue, id, getData }) {
    const supabase = createClient();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    const [qty, setQty] = useState(qtyValue);
    const [loadingAddCart, setLoadingAddCart] = useState(false);

    // update item
    async function handleUpdate(id) {
        setLoadingAddCart(true);
        const { status, error } = await supabase
            .schema('picksy')
            .from('card')
            .update({ count: qty })
            .eq('id', id)

        if (status === 204) {
            setLoadingAddCart(false);
            toast.success("با موفقیت ویرایش شد", {
                theme: 'dark',
                icon: <DoneIcon style={{ color: 'white' }} />
            })
            getData()
        } else if (error) {
            setLoadingAddCart(false);
            toast.error('مشکلی رخ داد', {
                theme: 'dark',
                icon: <CloseIcon style={{ color: 'darkred' }} />
            })
            console.log(error.message)
        }
    }

    // get input
    function updateQty(value) {
        setQty(value)
    }


    return (
        <>
            <Button
                variant='ghost'
                color='orange'
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
                        <Text mt='2rem' color='black'>تعداد را وارد کنید</Text>
                    </AlertDialogHeader>
                    <AlertDialogCloseButton style={{ color: 'black' }} />
                    <AlertDialogBody>
                        <NumberInput
                            size='sm'
                            maxW={20}
                            defaultValue={qtyValue}
                            value={qty}
                            min={1}
                            max={5}
                            onChange={updateQty}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                            variant='solid'
                            colorScheme='green'
                            onClick={() => handleUpdate(id) && onClose()}
                            mx='1rem'
                        >
                            ذخیره
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

// show deleteItem & handle delete
function DeleteItem({ id, getData }) {
    const supabase = createClient();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    const [loadingAddCart, setLoadingAddCart] = useState(false);

    // delete item
    async function handleDelete(id) {
        setLoadingAddCart(true);
        const { status, error } = await supabase
            .schema('picksy')
            .from('card')
            .delete()
            .eq('id', id)

        if (status === 204) {
            setLoadingAddCart(false);
            toast.success("با موفقیت حذف شد")
            getData();
        } else if (error) {
            setLoadingAddCart(false);
            toast.success('مشکلی رخ داد')
            error.message();
        }
    }
    return (
        <>
            <Button
                variant='ghost'
                color='red'
                onClick={onOpen}>
                <DeleteIcon />
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
                        <Text mt='2rem' color='black'>حذف از سبد خرید</Text>
                    </AlertDialogHeader>
                    <AlertDialogCloseButton style={{ color: 'black' }} />
                    <AlertDialogBody>
                        <Text color='black'>این کالا از سبد خرید حذف شود؟</Text>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                            variant='solid'
                            colorScheme='red'
                            onClick={() => handleDelete(id) && onClose()}
                            mx='1rem'
                        >
                            حذف
                        </Button>
                        <Button
                            colorScheme='dark'
                            variant='solid'
                            onClick={onClose}
                            ref={cancelRef}
                        >
                            انصراف
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

// main show cart
export default function Cart() {
    const supabase = createClient();

    const [data, setData] = useState([]);
    const [total, setTotal] = useState('');
    const [loading, setLoading] = useState(false);

    // get data from server
    async function getData() {
        setLoading(true);
        const { data, error } = await supabase
            .schema('picksy')
            .from('card')
            .select('products(image,title,price),count,id')
        let totalVal = 0;
        for (let i = 0; i < data?.length; i++) {
            totalVal += data[i]?.products.price * data[i]?.count;
        }
        if (data) {
            setLoading(false);
            setData(data);
            setTotal(totalVal)
        } else {
            setLoading(false);
            console.log(error.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    // show carts
    const carts = data.map((item, key) => (
        <GridItem
            pl='2'
            border='1px solid black'
            color='black'
            borderRadius='.5rem'
            boxShadow='lg'
            textAlign='right'
            mx={{ base: '0', sm: '3rem', md: '0', lg: '0' }}
        >
            <SimpleGrid
                columns={{ base: 4, sm: 1, md: 4, lg: 4 }}
                spacing='1rem'
                className="cartItems"
                display={{ base: 'flex', sm: 'grid', md: 'flex', lg: 'grid' }}
                textAlign='right'
            >
                <Box
                    key={key}
                    margin='1rem'
                >
                    <Image
                        src={item?.products.image}
                        alt={item?.products.title}
                        borderRadius='lg'
                        width={100}
                        height={100}
                    />
                </Box>

                <Box
                    w={{ base: '2rem', sm: '15rem', md: '9rem', lg: '10rem' }}
                    textAlign='justify'
                >
                    <Link href={`/products/${item.id}`}>
                        {item?.products.title}
                    </Link>
                </Box>

                <Box
                    textAlign='right'
                    display='flex'
                    className="flexCenter"
                    mx='5rem'
                    marginRight='2rem'
                >
                    <Text mx='2rem'>{item?.count}{` `} عدد</Text>
                    <CustomNumeralNumericFormat
                        value={item?.products.price}
                        thousandSeparator=","
                    />
                    <Text color='black' className='priceProduct' fontSize='smaller'>
                        تومان
                    </Text>
                </Box>

                <Box
                    className="flexCenter"
                    mx='1rem'
                    mb='1rem'
                >
                    <Button
                        _hover={{ bg: 'none' }}
                        bg='none'
                    >
                        <UpdateItem qtyValue={item?.count} id={item?.id} getData={getData} />
                    </Button>
                    <Button
                        _hover={{ bg: 'none' }}
                        bg='none'
                    >
                        <DeleteItem id={item?.id} getData={getData} />
                    </Button>
                </Box>
            </SimpleGrid>
        </GridItem>
    ))



    return (
        <>
            <SimpleGrid
                minChildWidth='120px'
                spacing='1rem'
                minHeight={'60vh'}
                gridTemplate={'none'}
                p='1rem'
                gridAutoRows='min-content'
                mb={{ base: '0rem', sm: '8rem', md: '0rem', lg: '0rem' }}

            >
                <Breadcrumb color='black' >
                    <BreadcrumbItem _hover={{ background: 'none', color: 'gray' }}>
                        <BreadcrumbLink href='/'>خانه</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem _hover={{ background: 'none', color: 'gray' }} isCurrentPage>
                        <BreadcrumbLink href='#'>سبد خرید</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                {
                    loading === true ? (
                        <Box className="flexCenter" minH='60vh'>
                            <Spinner size='xl' color='black' />
                        </Box>
                    ) : (carts)
                }
                <GridItem
                    pl='2'
                    border='1px solid black'
                    color='black'
                    borderRadius='.5rem'
                    boxShadow='lg'
                    height='min-content'
                    bgColor='black'
                >
                    <SimpleGrid
                        columns={{ base: 4, sm: 2, md: 2, lg: 4 }}
                        spacing='1rem'
                        className="cartItemsTotal"
                        display='flex'
                        color='white'
                        minHeight='15vh'
                    >
                        <Box>جمع کل:</Box>
                        <Box display='flex'>
                            <CustomNumeralNumericFormat
                                value={total}
                                thousandSeparator=","
                            />
                            <Text color='white' className='priceProduct' fontSize='smaller'>
                                تومان
                            </Text>
                        </Box>
                        <Box w={'30%'}>
                            <Button
                                colorScheme="light"
                                color='black'
                                m='1rem'
                                leftIcon={<CreditScoreIcon style={{ marginInline: '.5rem' }} />}
                                w='100%'

                            >
                                پرداخت
                            </Button>
                        </Box>
                    </SimpleGrid>
                </GridItem>
            </SimpleGrid>
        </>
    )
}