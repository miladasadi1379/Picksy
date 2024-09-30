import { Box, Grid, Text, Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function CoffeeCard() {

    return (
        <Grid
            className='mainImg'
            id='bgCoffee'
            sx={{
                display: "flex",
                minHeight: '50vh',
                placeItems: "center",
                textAlign: "center",
                placeContent: "center",

            }}
        >
            <Box id='glassCard' p={8}>
                <Text fontSize='lg' color={'yellow'}>انواع قهوه اصل</Text>
                <Text fontSize='md' my={2} color={'yellow.400'}>کل روز پر انرژی باش</Text>
                <Link href={'/products/coffee'}>
                    <Button colorScheme='yellow' my={2}>ادامه</Button>
                </Link>
            </Box>
        </Grid>
    )
}