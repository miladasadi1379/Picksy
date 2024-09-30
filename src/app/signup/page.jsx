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
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function SignUpPage() {
    const CFaUserAlt = chakra(PersonIcon);
    const CFaLock = chakra(LockOpenIcon);
    const supabase = createClient();
    const route = useRouter();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [allowValidation, setAllowValidation] = useState(false);
    const [errorValidationEmail, setErrorValidationEmail] = useState(false);
    const [errorValidationPassword, setErrorValidationPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);
    const handlePasswordClick = (e) => setPassword(e.target.value);
    const handleEmailClick = (e) => setEmail(e.target.value);

    // handle login
    async function handleLogin(e) {
        e.preventDefault();

        if (email.includes('@' || '.com') && password.length > 6) {
            const { error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    emailRedirectTo: 'http://localhost:3000/login'
                }
            });
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
                toast.success("با موفقیت ساخته شد", {
                    theme: 'dark',
                    icon: <DoneIcon style={{ color: 'white' }} />
                })
                route.push('/login')
            }
            setAllowValidation(true);
        }
        if (password.length < 6) {
            setErrorValidationPassword(true);
        }
        else if (email !== '@') {
            setErrorValidationEmail(true);
        }

    }

    return (
        <Flex
            flexDirection="column"
            height="100vh"
            justifyContent="center"
            alignItems="center"
            mb={{ base: '0rem', sm: '8rem', md: '0rem', lg: '0rem' }}
        >
            <Stack
                flexDir="column"
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
                <Text fontSize={"x-large"} color="black">ساخت حساب کاربری</Text>
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
                            </FormControl>

                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="dark"
                                width="full"
                                rounded='md'
                                onClick={handleLogin}
                            >
                                ساختن حساب
                            </Button>
                            <hr class="hr-text gradient" data-content="یا" />
                            <Button
                                colorScheme={'orange'}
                                size="md"
                                rounded="md"
                            >
                                <GoogleIcon />
                            </Button>
                            <Button
                                colorScheme={'teal'}
                                size="md"
                                rounded="md"
                            >
                                <GitHubIcon />
                            </Button>
                            <Box color="black" textAlign={'center'}>
                                اکانت دارید؟{" "}
                                <Link href="/login">
                                    ورود به حساب
                                </Link>

                            </Box>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
};

