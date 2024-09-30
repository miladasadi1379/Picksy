'use client'
import {
    Box, Flex, SimpleGrid, Text, Spinner,
    Card, CardBody, Stack, Divider,
    Button
} from "@chakra-ui/react";
import SideBar from '@/components/main/SideBar'

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

export default function Favourite() {
    const supabase = createClient();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    // get data with query
    async function getData() {
        setLoading(true)
        const { data, error } = await supabase
            .schema('picksy')
            .from('likeProducts')
            .select('products(image,title),id')

        if (data) {
            setLoading(false)
            setData(data)
        } else {
            setLoading(false)
            console.log(error?.message)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    async function handleDelete(id) {
        setLoading(true)
        const { status, error } = await supabase
            .schema('picksy')
            .from('likeProducts')
            .delete()
            .eq('id', id)
        if (status === 204) {
            setLoading(false);
            toast.success("با موفقیت حذف شد", {
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


    return (
        <SimpleGrid display={'flex'}>
            <SideBar />

            <Box
                m='2rem'
                w='80%'
                border='1px solid black'
                borderRadius='1rem'
                mb={{ base: '0', sm: '10rem', md: '0', lg: '0' }}

            >
                <Flex w='100%' placeContent='space-between'>
                    <Box color='GrayText' m='1rem' borderBottom='2px solid gray'>
                        علاقه مندی ها
                    </Box>

                </Flex>
                <SimpleGrid
                    display={'flex'}
                    className="flexCenter"
                    minH='60vh'
                >

                    {
                        data === null ? (
                            <Box className="flexCenter" w='100%'>
                                <Text color='red.700'>
                                    در حال حاضر آیتمی ندارید
                                </Text>
                            </Box>
                        ) : (
                            <SimpleGrid
                                columns={{ base: 4, sm: 1, md: 2, lg: 3 }}
                                spacing={2} my={2}
                            >
                                {
                                    loading === true ? (
                                        <Spinner size='xl' color='black' />
                                    ) : (
                                        data?.map((item, key) => (
                                            <Card
                                                maxW='sm'
                                                mb={2}
                                                key={key}
                                            >
                                                <CardBody
                                                    _hover={{
                                                        border: '1px solid black',
                                                        borderRadius: 'lg'
                                                    }}
                                                >
                                                    <Link href={`/products/${item.id}`} >

                                                        <Image
                                                            src={item?.products.image}
                                                            alt={item?.products.title}
                                                            borderRadius='lg'
                                                            width='200'
                                                            height='200'
                                                        />
                                                        <Stack mt='6' spacing='3'>
                                                            <Text fontSize='small' height='4rem'>{item?.products.title}</Text>
                                                        </Stack>
                                                    </Link>
                                                    <Box className="flexCenter">
                                                        <Button
                                                            colorScheme="red"
                                                            variant='solid'
                                                            onClick={() => handleDelete(item.id)}
                                                            isLoading={loading === true ? true : false}
                                                        >
                                                            حذف
                                                        </Button>
                                                    </Box>
                                                </CardBody>
                                                <Divider />
                                            </Card>
                                        ))
                                    )
                                }

                            </SimpleGrid >
                        )
                    }
                </SimpleGrid>
            </Box>
        </SimpleGrid>
    )
}