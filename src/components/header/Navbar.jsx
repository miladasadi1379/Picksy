'use client'
import React, { useEffect, useState } from "react";
import {
    Box, Flex,
    Text, Button, Stack,
    Tooltip,
    MenuList,
    MenuGroup,
    Menu, MenuButton, MenuItem,
    Avatar
} from "@chakra-ui/react";
import Image from "next/image";
import SiteIcon from '@/assets/cashback.png'
import Close from '@mui/icons-material/Close';
import { Search2Icon } from "@chakra-ui/icons";
import AppsIcon from '@mui/icons-material/Apps';
import Link from "next/link";
import { createClient } from '@/utils/supabase/client'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import PasswordIcon from '@mui/icons-material/Password';
import BentoIcon from '@mui/icons-material/Bento';
import { toast } from "react-toastify";
import bread from '@/assets/bread.svg'
import fish from '@/assets/fish.svg'
import juice from '@/assets/juice.svg'
import vegetables from '@/assets/veg.svg'
import spice from '@/assets/organic.svg'
import dairy from '@/assets/dairy.svg'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MenuIcons from '@mui/icons-material/Menu';
import CloseIconError from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';


const NavBar = (props) => {
    const supabase = createClient();

    const [isOpen, setIsOpen] = useState(false);
    const [session, setSession] = useState(null)
    const [payloadDB, setpayloadDB] = useState(null)
    const [cartCount, setCountCount] = useState(0)

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        // event change on DB
        const channel = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'picksy',
                },
                (payload) => setpayloadDB(payload?.new)
            )
            .subscribe()

        getCartQty();
    }, [])

    // get cart length
    async function getCartQty() {
        const { data, error } = await supabase
            .schema('picksy')
            .from('card')
            .select('id')
        setCountCount(data.length)
    }
    if (payloadDB !== null) {
        setpayloadDB(null);
        return getCartQty();
    }

    async function handleSignOut() {
        const { error } = await supabase.auth.signOut()
        if (!error) {
            toast.error('مشکلی رخ داد', {
                theme: 'dark',
                icon: <CloseIconError style={{ color: 'darkred' }} />
            })
            console.log(error?.message)
        }
    }

    // send req for email
    async function sendReqPassword() {
        const { data, error } = await supabase.auth
            .resetPasswordForEmail(session?.user.email,
                { redirectTo: 'http://localhost:3000/dashboard/changepassword' }
            )
        if (data) {
            toast.success('لطفا ایمیل خود را چک نمایید', {
                theme: 'dark',
                icon: <DoneIcon style={{ color: 'white' }} />
            })
        } else {
            toast.error('مشکلی رخ داد', {
                theme: 'dark',
                icon: <CloseIconError style={{ color: 'darkred' }} />
            })
            console.log(error.message)
        }
    }
    return (
        <NavBarContainer {...props}>
            {
                session === null ? (
                    <Link href="/login">
                        <Button
                            size="md"
                            rounded="md"
                            colorScheme="dark"
                            color={["white", "white", "white", "white"]}
                        >
                            ورود
                        </Button>
                    </Link>
                ) : (
                    <>
                        <Flex className="flexCenter" zIndex={+99}>
                            <Menu direction="rtl" >
                                <MenuButton >
                                    <Tooltip label='پروفایل' defaultIsOpen={false} hasArrow bg='black'>
                                        <Avatar bg='black' icon={<PersonOutlineIcon fontSize='4rem' />} />
                                    </Tooltip>
                                </MenuButton>
                                <MenuList>
                                    <MenuGroup>
                                        <Link href="/dashboard">
                                            <MenuItem my='1rem'>
                                                <Text display='flex' color='ActiveBorder'>
                                                    <BentoIcon style={{ marginInline: '.5rem' }} />
                                                    داشبورد
                                                </Text>
                                            </MenuItem>
                                        </Link>
                                        <MenuItem my='1rem'>
                                            <Button variant='link' onClick={sendReqPassword}>
                                                <Text display='flex' color='ActiveBorder'>
                                                    <PasswordIcon style={{ marginInline: '.5rem' }} />
                                                    تغییر رمز عبور
                                                </Text>
                                            </Button>
                                        </MenuItem>
                                        <MenuItem my='1rem'>
                                            <Button variant='link' onClick={handleSignOut}>
                                                <Text display='flex' color='red.600'>
                                                    <LogoutIcon style={{ marginInline: '.5rem' }} />
                                                    خروج
                                                </Text>
                                            </Button>
                                        </MenuItem>
                                    </MenuGroup>
                                </MenuList>
                            </Menu>
                            <MenuItems to="/cart">
                                <Button
                                    size="md"
                                    rounded="md"
                                    colorScheme="dark"
                                    color={["white", "white", "white", "white"]}
                                    className="shopIcon flexCenter"
                                >
                                    <ShoppingBagIcon style={{ marginInline: '0rem', borderRadius: '2rem' }} />
                                    <Box className="badgeShopIcon">
                                        {cartCount}
                                    </Box>
                                </Button>
                            </MenuItems>
                        </Flex>
                    </>
                )
            }

            <MenuToggle toggle={toggle} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} />
        </NavBarContainer>
    );

};

const CloseIcon = () => (
    <Button>
        <Close />
    </Button>
);

const HumIcon = () => (
    <Button>
        <MenuIcons />
    </Button>
);

const MenuToggle = ({ toggle, isOpen }) => {
    return (
        <Box display={{ base: "block", md: "none" }} onClick={toggle}>
            {isOpen ? <CloseIcon /> : <HumIcon />}
        </Box>
    );
};

const MenuItems = ({ children, isLast, to = "/", ...rest }) => {
    return (
        <Link href={to} sx={{ minWidth: '1rem' }}>
            <Text display="block" {...rest} color={'black'}>
                {children}
            </Text>
        </Link>
    );
};

export const MenuLinks = ({ isOpen }) => {
    return (
        <Box
            display={{ base: isOpen ? "block" : "none", md: "block" }}
            flexBasis={{ base: "100%", md: "auto" }}
        >
            <Stack
                spacing={4}
                align="center"
                justify={["end", "end", "start", "center"]}
                direction={["column", "row", "row", "row"]}
                pt={[1, 4, 0, 0]}
            >

                <MenuItems to="/search" >
                    <Tooltip label='جستجو' defaultIsOpen={false} hasArrow bg='black'>
                        <Search2Icon style={{ marginInline: '1rem' }} />
                    </Tooltip>
                </MenuItems>

                <Menu
                    direction="rtl"
                    display={{ base: "none", sm: 'block', md: "none" }}
                    size={'4rem'}
                >
                    <MenuButton color='black'>
                        دسته بندی
                        <AppsIcon style={{ marginInline: '0rem' }} />
                    </MenuButton>
                    <MenuList zIndex={+99} border='1px solid black'>
                        <MenuGroup>
                            <MenuItem >
                                <Link href="/?q=vegetables">
                                    <Text display='flex' placeItems='center' color='ActiveBorder'>
                                        <Image src={vegetables} className="iconNavbar" />
                                        سبزیجات
                                    </Text>
                                </Link>
                            </MenuItem>
                            <MenuItem >
                                <Link href="/?q=breads">
                                    <Text display='flex' placeItems='center' color='ActiveBorder'>
                                        <Image src={bread} className="iconNavbar" />
                                        نان ها
                                    </Text>
                                </Link>
                            </MenuItem>
                            <MenuItem >
                                <Link href="/?q=dairy">
                                    <Text display='flex' placeItems='center' color='ActiveBorder'>
                                        <Image src={dairy} className="iconNavbar" />
                                        لبنیات
                                    </Text>
                                </Link>
                            </MenuItem>
                            <MenuItem >
                                <Link href="/?q=juice ">
                                    <Text display='flex' placeItems='center' color='ActiveBorder'>
                                        <Image src={juice} className="iconNavbar" />
                                        تنقلات و نوشیدنی
                                    </Text>
                                </Link>
                            </MenuItem>
                            <MenuItem >
                                <Link href="/?q=meat">
                                    <Text display='flex' placeItems='center' color='ActiveBorder'>
                                        <Image src={fish} className="iconNavbar" />
                                        گوشت
                                    </Text>
                                </Link>
                            </MenuItem>
                            <MenuItem >
                                <Link href="/?q=spice">
                                    <Text display='flex' placeItems='center' color='ActiveBorder'>
                                        <Image src={spice} className="iconNavbar" />
                                        ادویه جات
                                    </Text>
                                </Link>
                            </MenuItem>
                        </MenuGroup>
                    </MenuList>
                </Menu>

                <MenuItems to="/">
                    پیکسی
                    <Tooltip label='خانه' defaultIsOpen={false} hasArrow bg='black'>
                        <Image src={SiteIcon} width={40} height={40} />
                    </Tooltip>
                </MenuItems>

            </Stack>
        </Box>
    );
};

const NavBarContainer = ({ children, ...props }) => {

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            p={4}
            bg={["whitesmoke", "whitesmoke", "transparent", "transparent"]}
            color={["white", "white", "primary.700", "primary.700"]}
            {...props}
            dir="ltr"
            boxShadow='md'
            border={'1px solid black'}
            display={{ base: 'flex', sm: 'none', md: 'flex', lg: 'flex' }}
        >
            {children}
        </Flex>
    );
};

export default NavBar;
