'use client'
import { useState } from "react";
import {
    Flex,
    Input,
    Button,
    Stack,
    Box,
    Text,
    useColorModeValue,
    Divider,
    SimpleGrid,
    Card,
    CardBody,
    Spinner
} from "@chakra-ui/react";

import Link from "next/link";
import { Search2Icon } from "@chakra-ui/icons";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import CustomNumeralNumericFormat from "@/components/main/helpers/price";
import StarRateIcon from '@mui/icons-material/StarRate';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export default function SearchPage() {
    const supabase = createClient();

    const [text, setText] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [showMessage, setShowMessage] = useState('')

    // get data with query
    async function getData(e) {
        setLoading(true)
        e.preventDefault();
        const { data, error } = await supabase
            .schema('picksy')
            .from('products')
            .select()
            .textSearch('title', text, {
                type: "phrase",
                config: "english",
            })
        if (data) {
            setLoading(false)
            setData(data)
        }
        if (data.length === 0) {
            setShowMessage('موردی یافت نشد')
        }
        else {
            setLoading(false)
            console.log(error?.message)
        }
    }

    function getText(e) {
        setText(e.target.value);
    }

    return (
        <Flex
            flexDirection="column"
            minHeight="100vh"
            placeItems={'center'}
            my='2rem'
        >
            <Stack
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                border={'1px solid black'}
                p={4}
                boxShadow={"dark-lg"}
                borderRadius={'1rem'}
                w={{ base: "90%", sm: '80%', md: "80%" }}
                mb={{ base: '0rem', sm: '8rem', md: '0rem', lg: '0rem' }}
            >
                <Box minW={{ base: "90%", sm: '70%', md: "70%" }}>
                    <form>
                        <Box
                            position="relative" dir="rtl"
                            className="flexCenter"
                        >
                            <Input
                                type="text"
                                name="entry.1808449400"
                                px="25px"
                                my="1rem"
                                height="3rem"
                                width={'20rem'}
                                rounded=".5rem"
                                bg={useColorModeValue('gray.200', 'gray.600')}
                                _placeholder={{ color: 'black' }}
                                placeholder="جستجو..."
                                _focus={{ outline: '0', _placeholder: { color: 'gray.600' } }}
                                color="black"
                                borderWidth={0}
                                zIndex={0}
                                w={{ base: "90%", sm: '80%', md: "80%" }}
                                onChange={getText}
                            />
                            <Button
                                colorScheme="dark"
                                type="submit"
                                height="50px"
                                bg="black"
                                px="15px"
                                zIndex={+1}
                                size={'lg'}
                                onClick={getData}
                                typeof="submit"
                            >
                                <Search2Icon color="gray.200" />
                            </Button>
                        </Box>
                    </form>
                </Box>
                {
                    data.length === 0 ? (
                        <Box className="flexCenter">
                            <Text color='black' display='flex'>
                                {showMessage}
                            </Text>
                        </Box>
                    ) : (
                        <SimpleGrid
                            columns={{ base: 4, sm: 1, md: 2, lg: 3 }}
                            spacing={2}
                            my={2}
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
                                                        src={item.image}
                                                        alt={item.title}
                                                        borderRadius='lg'
                                                        width='300'
                                                        height='300'
                                                    />
                                                    <Stack mt='6' spacing='3'>

                                                        <Text fontSize='large' height='4rem'>{item.title}</Text>

                                                        <Text className='flexLeft' fontSize='md' >
                                                            {item.star}
                                                            <StarRateIcon style={{ color: 'gold' }} fontSize='small' />
                                                        </Text>


                                                        <Box fontSize='lg' textAlign='center' display='flex' color='black' placeContent={'end'}>
                                                            <CustomNumeralNumericFormat
                                                                value={item.price}
                                                                thousandSeparator=","
                                                            />
                                                            <Text color='black' className='priceProduct' fontSize='smaller'>
                                                                تومان
                                                            </Text>
                                                        </Box>

                                                    </Stack>
                                                </Link>
                                            </CardBody>
                                            <Divider />
                                        </Card>
                                    ))
                                )

                            }

                        </SimpleGrid >
                    )
                }

            </Stack>

        </Flex>
    );
};

