'use client'
import {
    Button,
    Input,
    Box, useColorModeValue
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export default function Search() {
    return (
        <>
            <form action="#">
                <Box position="relative" dir="rtl">
                    <Input
                        type="email"
                        isRequired
                        name="entry.1808449400"
                        px="25px"
                        height="3rem"
                        width={'20rem'}
                        rounded=".5rem"
                        bg={useColorModeValue('gray.200', 'gray.600')}
                        _placeholder={{ color: 'black' }}
                        placeholder="جستجو..."
                        _focus={{ outline: '1px solid black' }}
                        color="black"
                        borderWidth={0}
                        zIndex={0}
                    />
                    <Button
                        colorScheme="dark"
                        type="submit"
                        height="50px"
                        position="absolute"
                        top="0"
                        right="239px"
                        left="0"
                        bg="black"
                        px="15px"
                        zIndex={+1}
                        size={'lg'}
                    >
                        <Search2Icon color="gray.200" />
                    </Button>
                </Box>
            </form>
        </>
    );
};
