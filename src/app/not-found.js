import { Box, Flex, Text } from "@chakra-ui/react";

export default function Custom404() {
    return (
        <Flex
            className="flexCenter"
            minH='100vh'
            bgColor='black'
            borderBottom='1px solid white'
        >
            <Box>
                <Text color='white' fontSize='large'>
                    صفحه مورد نظر یافت نشد💔
                </Text>
                <Text color='red'
                    textAlign='center'
                    fontFamily={"fantasy"}
                    fontWeight='1rem'
                    fontSize='2rem'
                >
                    404
                </Text>
            </Box>
        </Flex>
    )
}