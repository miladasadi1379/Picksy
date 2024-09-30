import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import SideBar from '@/components/main/SideBar'

export default function Favourite() {

    return (
        <SimpleGrid display={'flex'}>
            <SideBar />

            <Box
                m='2rem'
                w='80%'
                border='1px solid black'
                borderRadius='1rem'
                mb={{ base: '2rem', sm: '10rem', md: '2rem', lg: '2rem' }}
            >
                <Flex w='100%' placeContent='space-between'>
                    <Box color='GrayText' m='1rem' borderBottom='2px solid gray'>
                        سفارش ها
                    </Box>
                </Flex>
                <SimpleGrid display={'flex'}>
                    <Box className="flexCenter" w='100%'>
                        <Text color='red.700'>
                            در حال حاضر سفارشی ندارید
                        </Text>
                    </Box>
                </SimpleGrid>
            </Box>
        </SimpleGrid>
    )
}