import { Box, Grid, Text, Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function MilkCard() {

    return (
        <Grid
            className='mainImg'
            id='bgMilk'
            sx={{
                display: "flex",
                minHeight: '50vh',
                placeItems: "center",
                textAlign: "center",
                placeContent: "center",

            }}
        >
            <Box id='glassCard' p={8}>
                <Text fontSize='lg' color={'blue.800'}>لبنیات خوشمزه</Text>
                <Text fontSize='md' my={2} color={'green.900'}>صبحونه لذت بخش بخور</Text>
                <Link href={'/products/dairy'}>
                    <Button colorScheme='green' my={2}>ادامه</Button>
                </Link>
            </Box>
        </Grid>
    )
}