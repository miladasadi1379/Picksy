import { Flex, Box, SimpleGrid } from '@chakra-ui/react'
import MainCarousel from '@/components/main/MainCarousel'
import { Divider } from '@chakra-ui/react'
import SortProduct from '@/components/main/SortProduct'
import Products from '@/components/main/Products'

export default function Home({ searchParams }) {
  return (

    <SimpleGrid
      minChildWidth='120px'
      spacing='5rem'
      minHeight={'100vh'}
      columns={{ base: 4, sm: 2, md: 2, lg: 3 }}
    >
      <Flex placeContent={'center'} >
        <Box width={{ base: 1, sm: '90%', md: '80%' }} >
          <MainCarousel />
          <Divider />
          <SortProduct searchParams={searchParams?.q} />
          <Divider />
          <Products searchParams={searchParams} />
        </Box>
      </Flex>
    </SimpleGrid >
  );
}
