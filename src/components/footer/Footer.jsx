import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import TelegramIcon from '@mui/icons-material/Telegram';
import { GitHub } from "@mui/icons-material";
import { Box, Container, Grid, GridItem, SimpleGrid, Text } from '@chakra-ui/react'


export default function Footer() {
    return (
        <SimpleGrid
        >
            <Grid
                templateColumns={`repeat(5, 6fr)`}
                gap={4} bg='black'
                h='4rem'
                position={{ base: 'unset', sm: 'fixed', md: 'unset', lg: 'unset' }}
                bottom={{ sm: '0' }}
            >
                <GridItem colSpan={2} display={'flex'} placeContent={'space-around'} placeItems={'center'} >
                    <a href='https://www.github.com/miladasadi1379' target='_blank' rel='noopener noreferre'>
                        <GitHub className="socialmedia" style={{ color: 'white' }} />
                    </a>
                    <a href='https://t.me/the_logic_life' target='_blank' rel='noopener noreferre'>
                        <TelegramIcon className="socialmedia" style={{ color: 'white' }} />
                    </a>
                    <a href='https://twitter.com/miladasadi1379' target='_blank' rel='noopener noreferre'>
                        <XIcon className="socialmedia" style={{ color: 'white' }} />
                    </a>
                    <a href='https://www.linkedin.com/in/milad-asadi-47b994302/' target='_blank'
                        rel='noopener noreferre'>
                        <LinkedInIcon className="socialmedia" style={{ color: 'white' }} />
                    </a>
                </GridItem>
                <GridItem display={'flex'} placeContent={'space-around'} placeItems={'center'} colStart={4} colEnd={6}>
                    <Text fontSize='md'>
                        میلاد اسعدی هستم عاشق برنامه نویسی❤️
                    </Text>
                </GridItem>
            </Grid>
        </SimpleGrid>
    )
}


