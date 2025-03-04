import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import ProductActions from "./ProductActions";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  if (!product || !product.image || !product.name || !product.price) {
    return <div>Produto inválido</div>;
  }

  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');

  const { deleteProduct, editProduct } = useProductsQuery();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct.mutateAsync(pid);
    success ? toast.success(message) : toast.error(message);
  };

  const handleEditProduct = async (pid, data) => {
    const { success, message } = await editProduct.mutateAsync({ pid, data });
    success ? toast.success(message) : toast.error(message);
  };

  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      margin={2}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} />
      <Box padding={4}>
        <Heading as='h3' size='md' mb={2}>{product.name}</Heading>
        <Text fontWeight='bold' color={textColor} fontSize='xl' mb={4} w='full'>R${product.price}</Text>

        <ProductActions
          product={product}
          onDelete={handleDeleteProduct}
          onEdit={handleEditProduct}
        />
      </Box>
    </Box>
  );
};

export default ProductCard;
