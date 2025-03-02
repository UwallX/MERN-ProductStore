import { Container, Heading, VStack, Box, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useProductStore } from "../../store/product";
import toast from 'react-hot-toast';

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: null,
      price: null,
      image: null
    }
  });

  const { createProduct } = useProductStore();

  const onSubmitData = async (data) => {
    const { success, message } = await createProduct(data);
    if(success) {
      toast.success(message);
      reset();
    } else {
      toast.error(message);
    }
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack padding={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Criar novo produto
        </Heading>

        <Box
          w={"full"} bg={useColorModeValue("white", "gray.900")}
          p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack padding={4}>
            <Input
              {...register('name')}
              placeholder='Nome do Produto'
              name='name'
              type='text'
              borderWidth="1px"
            />
            <Input
              {...register('price')}
              placeholder='Preço'
              name='price'
              type='number'
            />
            <Input
              {...register('image')}
              placeholder='Imagem'
              name='image'
              type='text'
            />

            <Button width='full' colorScheme='blue' onClick={handleSubmit(onSubmitData)}>
              Adicionar produto
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage;
