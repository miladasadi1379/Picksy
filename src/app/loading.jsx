import { Box, Spinner } from "@chakra-ui/react";
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <Box className="flexCenter" minH='100vh'>
            <Spinner color="black" />
        </Box>
    )
}