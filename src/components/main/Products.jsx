import { createClient } from '@/utils/supabase/client';
import { Box, Card, CardBody, Divider, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import StarRateIcon from '@mui/icons-material/StarRate';
import Link from 'next/link';
import Paginate from '@/components/main/Paginate'
import CustomNumeralNumericFormat from './helpers/price';


export default async function Products({ searchParams }) {

    const supabase = createClient();
    let start = searchParams?.s
    let end = searchParams?.e

    let orderedData =
        searchParams?.q === 'new' ? "created_at" :
            searchParams?.q === 'best' ? 'sell_number' :
                searchParams?.q === 'lowest' ? 'sell_number' :
                    searchParams?.q === 'most' ? 'price' :
                        searchParams?.q === 'cheapest' ? 'price' : 'created_at'

    let category =
        searchParams?.q === 'vegetables' ? "vegetables" :
            searchParams?.q === 'breads' ? "breads" :
                searchParams?.q === 'juice' ? "juice" :
                    searchParams?.q === 'spice' ? "spice" :
                        searchParams?.q === 'meat' ? "meat" :
                            searchParams?.q === 'dairy' ? "dairy" :
                                ""

    // get default data
    let query = supabase
        .schema('picksy')
        .from('products')
        .select('*')

    if (orderedData) {
        query = query.order(
            orderedData,
            { ascending: searchParams?.t === 'true' ? true : false }
        )
    }
    if (category) {
        query = query
            .eq('category', category)
            .order(
                orderedData,
                { ascending: searchParams?.t === 'true' ? true : false }
            )
    }
    // return data from DB
    const { data, error } = await query

    // slice data for show data
    const res = data?.slice(
        start === undefined ? 0 : start,
        end === undefined ? 9 : end
    )

    return (
        <>
            <SimpleGrid columns={{ base: 4, sm: 2, md: 2, lg: 3 }} spacing={2} my={2} >
                {
                    res?.map((item, key) => (
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
                }

            </SimpleGrid >
            <Box display='block' minWidth={{ base: '50rem', sm: '100%' }} >
                <Paginate length={data?.length} />
            </Box>
        </>
    )
}