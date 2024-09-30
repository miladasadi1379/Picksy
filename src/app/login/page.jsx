'use client'
import { useState } from "react";
import {
    Flex,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    FormControl,
    FormHelperText,
    InputRightElement,
    Text

} from "@chakra-ui/react";
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import bgImg from '@/assets/cashback.png'
import Image from "next/image";
import Link from "next/link";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { createClient } from '@/utils/supabase/client'
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { google, github } from '@/utils/supabase/oAuth'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

export default function LoginPage() {
    const CFaUserAlt = chakra(PersonIcon);
    const CFaLock = chakra(LockOpenIcon);
    const supabase = createClient();
    const route = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [allowValidation, setAllowValidation] = useState(false);
    const [errorValidationEmail, setErrorValidationEmail] = useState(false);
    const [errorValidationPassword, setErrorValidationPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleShowClick = () => setShowPassword(!showPassword);
    const handlePasswordClick = (e) => setPassword(e.target.value);
    const handleEmailClick = (e) => setEmail(e.target.value);


    // handle login
    async function handleLogin(e) {
        e.preventDefault();

        if (email.includes('@' && '.com') && password.length > 6) {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                console.log(error?.message)
                if (error.message === 'Invalid login credentials') {
                    toast.error('ایمیل یا رمز عبور اشتباه است', {
                        theme: 'dark',
                        icon: <CloseIcon style={{ color: 'darkred' }} />
                    })
                }
                if (error.message === 'missing email or phone') {
                    toast.error('لطفا ایمیل را وارد نمایید', {
                        theme: 'dark',
                        icon: <CloseIcon style={{ color: 'darkred' }} />
                    })
                }
            } else {
                toast.success("با موفقیت وارد شدید", {
                    theme: 'dark',
                    icon: <DoneIcon style={{ color: 'white' }} />
                })
                route.push('/')
            }
            setAllowValidation(true);
        }
        if (password.length < 6) {
            setErrorValidationPassword(true);
        }
        if (email !== '@' && '.com') {
            setErrorValidationEmail(true);
        }

    }

    return (
        <Flex
            flexDirection="column"
            height="100vh"
            justifyContent="center"
            alignItems="center"
            my='2rem'
            mb={{ base: '2rem', sm: '10rem', md: '2rem', lg: '2rem' }}
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
                border={'1px solid black'}
                p={4}
                boxShadow={"dark-lg"}
                borderRadius={'1rem'}
                minHeight="80vh"
                w={{ base: "90%", sm: '80%', md: "50%" }}
            >
                <Image src={bgImg} width={100} height={100} />
                <Text fontSize={"x-large"} color="black">ورود به حساب</Text>

                <Box minW={{ base: "90%", sm: '70%', md: "70%" }}>
                    <form>
                        <Stack
                            spacing={4}
                            p="1rem"
                        >
                            <FormControl>
                                <InputGroup>
                                    <InputRightElement
                                        pointerEvents="none"
                                        color="black"
                                        children={<CFaUserAlt color="black" />}
                                    />

                                    <Input
                                        fontFamily={"sans-serif"}
                                        color={'black'}
                                        type="email"
                                        name="email"
                                        id='email'
                                        placeholder="ایمیل"
                                        px={'2.5rem'}
                                        border='1px solid black'
                                        _focus={{ border: '2px solid black ' }}
                                        onChange={handleEmailClick}
                                        isInvalid={errorValidationEmail === true ? true : false}
                                    />
                                </InputGroup>
                                {
                                    errorValidationEmail === true ?
                                        <Text color='red' w='100%'>لطفا ایمیل صحیح وارد نمایید</Text> : false
                                }
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputRightElement
                                        pointerEvents="none"
                                        color="black"
                                        children={<CFaLock color="black" />}
                                    />
                                    <Input
                                        id='password'
                                        name="password"
                                        color={'black'}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="رمز عبور"
                                        border='1px solid black'
                                        _focus={{ border: '2px solid black ' }}
                                        onChange={handlePasswordClick}
                                        isInvalid={errorValidationPassword === true ? true : false}
                                    />
                                    <InputLeftElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={handleShowClick}
                                            variant={'link'}
                                            color={'black'}
                                        >
                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </Button>
                                    </InputLeftElement>
                                </InputGroup>
                                {
                                    errorValidationPassword === true ?
                                        <Text color='red' w='100%'>حداقل دارای 6 حرف باشد</Text> : false
                                }

                                <FormHelperText textAlign="right">
                                    <Link href={'/dashboard/changepassword'}>فراموشی رمز عبور؟</Link>
                                </FormHelperText>

                            </FormControl>

                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="dark"
                                width="full"
                                onClick={handleLogin}
                                rounded="md"
                            >
                                ورود
                            </Button>
                            <hr class="hr-text gradient" data-content="یا" />
                            <Button
                                colorScheme={'orange'}
                                size="md"
                                rounded="md"
                                onClick={google}
                            >
                                <GoogleIcon />
                            </Button>
                            <Button
                                colorScheme={'teal'}
                                size="md"
                                rounded="md"
                                onClick={github}

                            >
                                <GitHubIcon />
                            </Button>
                            <Box color="black" textAlign={'center'}>
                                اکانت ندارید؟{" "}
                                <Link href="/signup">
                                    ساختن حساب
                                </Link>
                            </Box>
                        </Stack>
                    </form>
                </Box>


            </Stack>

        </Flex>
    );
};

