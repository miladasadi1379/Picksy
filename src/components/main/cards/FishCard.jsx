import { Box, Grid, Text, Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function FishCard() {

    return (
        <Grid
            className='mainImg'
            id='bgFish'
            sx={{
                display: "flex",
                minHeight: '50vh',
                placeItems: "center",
                textAlign: "center",
                placeContent: "center",

            }}
        >
            <Box id='glassCard' p={8}>
                <Text fontSize='lg' color={'purple'}>ماهی های تازه</Text>
                <Text fontSize='md' my={2} color={'blue.900'}>تازه ترین طعم ماهی</Text>
                <Link href={'/products/fish'}>
                    <Button colorScheme='orange' my={2}>ادامه</Button>
                </Link>
            </Box>
        </Grid>
    )
}