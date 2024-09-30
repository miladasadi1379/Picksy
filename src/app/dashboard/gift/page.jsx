import { Box, Button, Flex, SimpleGrid, Text, Tooltip } from "@chakra-ui/react";
import SideBar from '@/components/main/SideBar'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InventoryIcon from '@mui/icons-material/Inventory';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';


export default function Gift() {

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
                        گیفت ها
                    </Box>
                    <Box m='1rem'>
                        <Button colorScheme="orange" >
                            ثبت گیفت جدید
                        </Button>
                    </Box>
                </Flex>
                <SimpleGrid display={'flex'}>
                    <Box className="flexCenter" w='100%'>
                        <Text color='red.700'>
                            در حال حاضر سفارش فعالی ندارید
                        </Text>
                    </Box>
                </SimpleGrid>
            </Box>
        </SimpleGrid>
    )
}