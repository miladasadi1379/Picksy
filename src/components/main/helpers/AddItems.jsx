'use client'
import { useState, useEffect } from "react"
import { Box, Button, Text } from "@chakra-ui/react";
import CustomNumeralNumericFormat from "./price";
import { Divider } from '@chakra-ui/react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-toastify'


export default function AddItems({ productPrice, productId }) {
    const supabase = createClient();

    const [qty, setQty] = useState(1);
    const [price, setPrice] = useState(productPrice);
    const [oldId, setOldId] = useState(null);
    const [loadingAddCart, setLoadingAddCart] = useState(false);
    const [alreadyToCart, setAlreadyToCart] = useState(false);


    useEffect(() => {
        async function getIdFromDb() {
            const { data, status, error } = await supabase
                .schema('picksy')
                .from('card')
                .select('id')
            setOldId(data)
            for (let i = 0; i < data.length; i++) {
                console.log("alreadyToCartFor:", alreadyToCart)
                if (data[i]?.id === productId) {
                    setAlreadyToCart(true)
                }
            }
        }
        getIdFromDb();
    }, [])


    // handle AddCart
    async function addToCart() {
        setLoadingAddCart(true);
        if (alreadyToCart === false) {
            const { status, error } = await supabase
                .schema('picksy')
                .from('card')
                .upsert({ id: productId, count: qty })
                .select()

            if (status === 201) {
                setLoadingAddCart(false);
                setAlreadyToCart(true)
                toast.success('به سبد خرید اضافه شد')
            } else if (error) {
                setLoadingAddCart(false);
                console.log(error.message)
                toast.error('مشکلی رخ داد')
            }
        }
    }

    function decreaseQty() {
        if (qty >= 2) {
            setQty(qty - 1)
        }
    }

    function increaseQty() {
        if (qty <= 4) {
            setQty(qty + 1)
        }
    }


    return (
        <>
            <Box display='block' textAlign={'center'} mt='2rem'>
                <Text color='black' fontSize='large' mx='1rem'>
                    تعداد را انتخاب نمایید
                </Text>
            </Box>

            <Box className="flexCenter">
                <Box direction='row' spacing={4} className="flexCenter" minH={'30vh'} mb='1rem'>
                    <Button
                        colorScheme='red'
                        variant='outline'
                        onClick={increaseQty}
                        isDisabled={qty === 5 ? true : false}
                    >
                        <AddCircleIcon />
                    </Button>

                    <Text color='black' fontSize='x-large' mx='1rem'>
                        {qty}
                    </Text>

                    <Button
                        colorScheme='gray'
                        variant='outline'
                        onClick={decreaseQty}
                        isDisabled={qty === 1 ? true : false}
                    >
                        <RemoveCircleIcon />
                    </Button>
                </Box>
            </Box>

            <Divider style={{ width: '50%', margin: 'auto' }} />

            <Box className="flexCenter" my='1rem'>
                <Text color='black' fontSize='medium' mx='2rem' className="flexRight">قیمت نهایی:</Text>

                <Box color='black' fontSize='large' display='flex' mx='3rem' textAlign={'center'} placeContent={'end'} >
                    <CustomNumeralNumericFormat
                        value={price * qty}
                        thousandSeparator=","
                    />
                    <Text color='black' className='priceProduct' fontSize='smaller'>
                        تومان
                    </Text>
                </Box>
            </Box>

            <Box className="flexCenter" mt='5rem'>
                <Button
                    colorScheme='red'
                    variant='solid'
                    w={'80%'}
                    onClick={addToCart}
                    isLoading={loadingAddCart === true ? true : false}
                    isDisabled={alreadyToCart === true ? true : false}
                >
                    {
                        alreadyToCart === false ? 'افزودن به سبد خرید' : 'در سبد خرید موجود است'
                    }
                </Button>
            </Box>
        </>
    )
}