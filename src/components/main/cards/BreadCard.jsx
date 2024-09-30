import { Box, Grid, Text, Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function BreadCard() {

    return (
        <Grid
            className='mainImg'
            id='bgBread'
            sx={{
                display: "flex",
                minHeight: '50vh',
                placeItems: "center",
                textAlign: "center",
                placeContent: "center",

            }}
        >
            <Box id='glassCard' p={8}>
                <Text fontSize='lg' color={'pink'}>نان های حجیم</Text>
                <Text fontSize='md' my={2} color={'pink.900'}>لذیذ ترین طعم ها</Text>
                <Link href={'/products/breads'}>
                    <Button colorScheme='pink' my={2}>ادامه</Button>
                </Link>
            </Box>
        </Grid>
    )
}