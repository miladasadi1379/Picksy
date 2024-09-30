'use client'
import {
    Box, Text, Button, Stack, Menu,
    MenuButton, MenuList, MenuGroup, MenuItem
} from '@chakra-ui/react'
import FilterListIcon from '@mui/icons-material/FilterList';
import Link from 'next/link';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function SortProduct({ searchParams }) {

    const newest = 'جدید ترین'
    const best = 'پر فروش ترین'
    const lowest = 'کم فروش ترین'
    const most = 'گران ترین'
    const cheapest = 'ارزان ترین'
    // show select menu for responsive
    function ShowSelect() {
        return (
            <Stack
                direction='row'
                spacing={4}
                mx={2}
                display={{ base: "none", sm: 'block', md: "none" }}
                className='flexLeft'
                w={{ base: "70%", md: "0" }}
            >
                <Menu
                    direction="rtl"
                    display={{ base: "none", sm: 'block', md: "none" }}
                >
                    <MenuButton
                        display={{ base: "none", sm: 'block', md: "none" }}
                    >
                        {
                            searchParams === 'new' ? newest :
                                searchParams === 'best' ? best :
                                    searchParams === 'lowest' ? lowest :
                                        searchParams === 'most' ? most :
                                            searchParams === 'cheapest' ? cheapest : "پیش فرض"
                        }
                        <ArrowDropDownIcon />
                    </MenuButton>
                    <MenuList>
                        <MenuGroup>
                            <MenuItem >
                                <Link href="/?q=new">
                                    <Text display='flex' color='ActiveBorder'>
                                        جدید ترین
                                    </Text>
                                </Link>
                            </MenuItem>
                            <MenuItem >
                                <Link href="/?q=best">
                                    <Text display='flex' color='ActiveBorder'>
                                        پر فروش ترین
                                    </Text>
                                </Link>
                            </MenuItem>
                            <MenuItem >
                                <Link href="/?q=lowest ">
                                    <Text display='flex' color='ActiveBorder'>
                                        کم فروش ترین
                                    </Text>
                                </Link>
                            </MenuItem>
                            <MenuItem >
                                <Link href="/?q=most ">
                                    <Text display='flex' color='ActiveBorder'>
                                        گران ترین
                                    </Text>
                                </Link>
                            </MenuItem>
                            <MenuItem >
                                <Link href="/?q=cheapest">
                                    <Text display='flex' color='ActiveBorder'>
                                        ارزان ترین
                                    </Text>
                                </Link>
                            </MenuItem>
                        </MenuGroup>

                    </MenuList>
                </Menu>
            </Stack>
        )
    }

    return (
        <Box
            bg='black'
            borderRadius={'.5rem'}
            w='100%'
            p={4}
            color='white'
            my={4}
            className='flexRight'
        >
            <Box className='flexCenter'>
                <FilterListIcon />
                <Text>مرتب سازی:</Text>
            </Box>

            <ShowSelect />

            <Stack
                direction='row'
                spacing={4}
                mx={2}
                display={{ base: "none", md: "block" }}
            >
                <Link href="/?q=new">
                    <Button className={`${searchParams === 'new' ? 'activeLink' : null}`} variant='link' ml={'.4rem'}>
                        جدید ترین
                    </Button>
                </Link>

                <Link href="/?q=best">
                    <Button className={`${searchParams === 'best' ? 'activeLink' : null}`} variant='link' mx={'.4rem'}>
                        پر فروش ترین
                    </Button>
                </Link>

                <Link href="/?q=lowest&t=true ">
                    <Button className={`${searchParams === 'lowest' ? 'activeLink' : null}`} variant='link' mx={'.4rem'}>
                        کم فروش ترین
                    </Button>
                </Link>

                <Link href="/?q=most ">
                    <Button className={searchParams === 'most' ? 'activeLink' : null} variant='link' mx={'.4rem'}>
                        گران ترین

                    </Button>
                </Link>

                <Link href="/?q=cheapest&t=true">
                    <Button className={`${searchParams === 'cheapest' ? 'activeLink' : null}`} variant='link' mx={'.4rem'}>
                        ارزان ترین
                    </Button>
                </Link>
            </Stack>
        </Box>
    )
}