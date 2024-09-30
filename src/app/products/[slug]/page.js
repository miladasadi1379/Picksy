import { createClient } from '@/utils/supabase/client';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import Image from 'next/image';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import StarIcon from '@mui/icons-material/Star';
import CustomNumeralNumericFormat from '@/components/main/helpers/price'
import AddItems from '@/components/main/helpers/AddItems'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { toast } from "react-toastify";

export default async function Product({ params }) {
    const supabase = createClient();
    // get defalut data
    const { data, error } = await supabase
        .schema('picksy')
        .from('products')
        .select('id,image,title,star,price,sell_number')
        .eq('id,', params.slug)
    if (error) {
        toast.error('مشکلی رخ داد', {
            theme: 'dark',
            icon: <CloseIcon style={{ color: 'darkred' }} />
        })
        console.log(error.message)
    }

    return (
        <>
            <SimpleGrid
                columns={{ base: 1, sm: 1, md: 2, lg: 3 }}
                w={{ base: '100%', sm: '100%', md: '100%', lg: '100%' }}
                display={{ base: 'flex', sm: 'grid', md: 'flex', lg: 'flex' }}
                mb='50rem'

            >
                <Box
                    w={{ base: '100%', sm: '100%', md: '55%', lg: '70%' }}
                    display='flex'
                    className='flexRight'
                    minHeight='90vh'
                    boxShadow='lg'
                    mb='50rem'
                >
                    {
                        data?.map((item, key) => (
                            <>
                                <Box>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        borderRadius='lg'
                                        width={400}
                                        height={300}
                                    />
                                </Box>
                                <Box className='flexCenter' w='100%' >
                                    <Box display='block' textAlign='center' w='inherit' >
                                        <Text color='black' fontSize='larger' key={key} textAlign='right'>
                                            {item.title}
                                        </Text>
                                        <Box display='flex' placeItems='center' my='1rem'>
                                            <CrisisAlertIcon style={{ color: 'red' }} />
                                            <Text color='black' fontSize='small'>
                                                {item.sell_number}  عدد فروخته شده
                                            </Text>
                                        </Box>
                                        <Box display='flex' placeItems='center'>
                                            <StarIcon style={{ color: 'gold' }} />
                                            <Text color='black' fontSize='small'>
                                                {item.star}
                                            </Text>
                                        </Box>
                                        <Box className='flexLeft' mx='3rem'>
                                            <Box display='flex' >
                                                <Text color='black' fontSize='xx-large'>
                                                    <CustomNumeralNumericFormat
                                                        value={item.price}
                                                        thousandSeparator=","
                                                    />

                                                </Text>
                                                <Text color='black' className='priceProduct' fontSize='smaller'>
                                                    تومان
                                                </Text>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </>
                        ))
                    }
                </Box>
                <Box
                    w={{ base: '100%', sm: '95%', md: '45%', lg: '30%' }}
                    minHeight='80vh'
                    border={'1px solid gray'}
                    borderRadius={'.5rem'}
                    boxShadow='md'
                    m='1rem'
                >
                    <AddItems productPrice={data[0]?.price} productId={data[0]?.id} />
                </Box>
            </SimpleGrid>
        </>
    )
}