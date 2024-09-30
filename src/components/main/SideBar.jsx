'use client'
import {
    Avatar, Box, Button,
    Text, Tooltip
} from '@chakra-ui/react'
import Link from 'next/link'
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import RedeemIcon from '@mui/icons-material/Redeem';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'react-toastify';


export default function SideBar() {
    const supabase = createClient();

    const [sizeMenu, setSizeMenu] = useState(4)
    const [showTitle, setShowTitle] = useState(false)
    const [shopTitle, setShopTitle] = useState('سفارش ها')
    const [locationTitle, setLocationTitle] = useState('آدرس ها')
    const [favoriteTitlte, setFavoriteTitlte] = useState("لیست های من")
    const [redeemTitle, setRedeemTitle] = useState("کارت های هدیه")
    const [exitTitle, setExitTitle] = useState("خروج")
    const [infoTitle, setInfoTitle] = useState("اطلاعات حساب کاربری")

    function handleChange() {
        if (sizeMenu === 4) {
            setSizeMenu(12)
            setShowTitle(true)
        } else if (sizeMenu === 12) {
            setSizeMenu(4)
            setShowTitle(false)
        }
    }
    async function handleSignOut() {
        const { error } = await supabase.auth.signOut()
        if (!error) {
            toast.error('مشکلی رخ داد')
            console.log(error.message)
        }
    }


    return (
        <>
            {/* show for md & lg devices */}
            <Box
                Box
                display={{ base: 'none', sm: 'none', md: 'block', lg: 'block' }
                }
                minHeight={'100vh'}
                w={{ base: '0', sm: '0', md: '25%', lg: '20%' }}
                color='black'
                borderLeft='1px solid black'
            >
                <Box w='100%'>
                    <Box className='flexCenter' my='2rem'>
                        <Avatar size='2xl' bg='red.500' icon={<PersonOutlineIcon fontSize='1.5rem' />} />
                    </Box>
                    <Box textAlign='center' my='1rem'>
                        <Text fontSize='large' >میلاد اسعدی</Text>
                    </Box>

                    <Box className='flexRight' m='1rem'>
                        <Text fontSize='small' >سطح کاربری:</Text>
                        <Text fontSize='small' >عادی</Text>
                    </Box>

                    <Link href={'/dashboard/orders'} >
                        <Button id='btnDash' variant='link' mx='1rem' h='3rem' w='100%' className='flexRight btnDash'>
                            <ShoppingBagIcon style={{ marginLeft: '.5rem' }} />
                            سفارش ها
                        </Button>
                    </Link>

                    <Link href={'/dashboard/favourite'} >
                        <Button id='btnDash' variant='link' mx='1rem' h='3rem' w='100%' className='flexRight btnDash'>
                            <FavoriteIcon style={{ marginLeft: '.5rem' }} />
                            لیست های من
                        </Button>
                    </Link>

                    <Link href={'/dashboard/myaddress'} >
                        <Button id='btnDash' variant='link' mx='1rem' h='3rem' w='100%' className='flexRight btnDash'>
                            <AddLocationIcon style={{ marginLeft: '.5rem' }} />
                            آدرس ها
                        </Button>
                    </Link>

                    <Link href={'/dashboard/gift'} >
                        <Button id='btnDash' variant='link' mx='1rem' h='3rem' w='100%' className='flexRight btnDash'>
                            <RedeemIcon style={{ marginLeft: '.5rem' }} />
                            کارت های هدیه
                        </Button>
                    </Link>

                    <Link href={'/dashboard'} >
                        <Button id='btnDash' variant='link' mx='1rem' h='3rem' w='100%' className='flexRight btnDash'>
                            <PersonIcon style={{ marginLeft: '.5rem' }} />
                            اطلاعات حساب کاربری
                        </Button>
                    </Link>

                    <Button
                        id='btnDash'
                        variant='link' mx='1rem' h='3rem' w='100%'
                        className='flexRight btnDash' color='red.600'
                        onClick={handleSignOut}
                    >
                        <LogoutIcon style={{ marginLeft: '.5rem' }} />
                        خروج
                    </Button>
                </Box>
            </Box >

            {/* show for small devices */}
            < Box
                display={{ base: 'block', sm: 'block', md: 'none', lg: 'none' }}
                minHeight={'100vh'}
                w={{ base: '0', sm: `${sizeMenu}rem`, md: '0', lg: '0' }}
                color='black'
                borderLeft='1px solid black'
            >
                <Button
                    id='btnDash' variant='link' mx='1rem'
                    h='3rem' w='100%' className='flexRight'
                    _hover={{ color: "gray.700" }}
                    onClick={handleChange}
                >
                    <Tooltip label={showTitle === true ? 'کوچک نمایی' : 'منو کامل'} defaultIsOpen={false} hasArrow bg='black'>
                        {showTitle === true ? <ArrowForwardIcon /> : <ArrowBackIcon />}
                    </Tooltip>
                </Button>
                <Link href={'/dashboard/orders'} >
                    <Button id='btnDash' variant='link' mx='1rem' h='3rem' w='100%' className='flexRight'>
                        <Tooltip label='سفارش ها' defaultIsOpen={false} hasArrow bg='black'>
                            <ShoppingBagIcon style={{ marginLeft: '.5rem' }} className="sidebarIcon" />
                        </Tooltip>
                        {showTitle === true ? shopTitle : null}
                    </Button>
                </Link>

                <Link href={'/dashboard/favourite'} >
                    <Button id='btnDash' variant='link' mx='1rem' h='3rem' w='100%' className='flexRight'>
                        <Tooltip label='لیست های من' defaultIsOpen={false} hasArrow bg='black'>
                            <FavoriteIcon style={{ marginLeft: '.5rem' }} className="sidebarIcon" />
                        </Tooltip>
                        {showTitle === true ? favoriteTitlte : null}
                    </Button>
                </Link>

                <Link href={'/dashboard/myaddress'} >
                    <Button id='btnDash' variant='link' mx='1rem' h='3rem' w='100%' className='flexRight'>
                        <Tooltip label='آدرس ها' defaultIsOpen={false} hasArrow bg='black'>
                            <AddLocationIcon style={{ marginLeft: '.5rem' }} className="sidebarIcon" />
                        </Tooltip>
                        {showTitle === true ? locationTitle : null}
                    </Button>
                </Link>

                <Link href={'/dashboard/gift'} >
                    <Button id='btnDash' variant='link' mx='1rem' h='3rem' w='100%' className='flexRight'>
                        <Tooltip label='کارت های هدیه' defaultIsOpen={false} hasArrow bg='black'>
                            <RedeemIcon style={{ marginLeft: '.5rem' }} className="sidebarIcon" />
                        </Tooltip>
                        {showTitle === true ? redeemTitle : null}
                    </Button>
                </Link>

                <Link href={'/dashboard'} >
                    <Button id='btnDash' variant='link' mx='1rem' h='3rem' w='100%' className='flexRight'>
                        <Tooltip label='اطلاعات حساب کاربری' defaultIsOpen={false} hasArrow bg='black'>
                            <PersonIcon style={{ marginLeft: '.5rem' }} className="sidebarIcon" />
                        </Tooltip>
                        {showTitle === true ? infoTitle : null}

                    </Button>
                </Link>

                <Button
                    id='btnDash'
                    variant='link' mx='1rem' h='3rem' w='100%'
                    className='flexRight' color='red.600'
                >
                    <Tooltip label='خروج' defaultIsOpen={false} hasArrow bg='black'>
                        <LogoutIcon style={{ marginLeft: '.5rem' }} className="sidebarIcon" />
                    </Tooltip>
                    {showTitle === true ? exitTitle : null}
                </Button>
            </Box >
        </>
    )
}