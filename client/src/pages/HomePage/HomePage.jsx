import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductsQuery } from "../../hooks/useProductsQuery";
import ProductCard from "../../components/ProductCard";

const HomePage = () => {
  const { products, isLoading } = useProductsQuery();

  if(isLoading) return <div>Carregando blz</div>
  return (
    <Container maxW='container.xl' py={12}>
      <VStack padding={8}>
        <Text
          fontSize={{ base: 22, sm: 28 }}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo={"blue.500"}
          bgClip={"text"}
        >
          Produtos atuais 🚀
        </Text>

        {!isLoading && products.length == 0 &&
          <Text fontSize='xl' textAlign={'center'} fontWeight={'bold'} color={'gray.500'}>
            Nenhum produto encontrado 😥{' '}
            <Link to='/create'>
              <Text as='span' color='blue.500' _hover={{ textDecoration: 'underline' }}>
                Criar produto
              </Text>
            </Link>
          </Text>
        }

        <SimpleGrid
          columns={{
            base: 1, md: 2, lg:3
          }}
          margin={10}
          w={'full'}
        >
          {!isLoading && products.length > 0 && products.map(product => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  )
}

export default HomePage;
