import { HStack, IconButton, Button, Stack, Input } from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";

const ProductActions = ({ product, onDelete, onEdit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      price: '',
      image: ''
    }
  });

  return (
    <HStack>
      <DialogRoot>
        <DialogTrigger asChild>
          <IconButton colorPalette='blue'><FaRegEdit /></IconButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Stack>
              <Input {...register('name')} placeholder={product.name} />
              <Input {...register('price')} placeholder={product.price} />
              <Input {...register('image')} placeholder={product.image} />
            </Stack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogActionTrigger>
            <DialogActionTrigger asChild>
              <Button onClick={handleSubmit((data) => onEdit(product._id, data))}>Salvar</Button>
            </DialogActionTrigger>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      <IconButton onClick={() => onDelete(product._id)} colorPalette='red'>
        <RiDeleteBin6Line />
      </IconButton>
    </HStack>
  );
};

export default ProductActions;
