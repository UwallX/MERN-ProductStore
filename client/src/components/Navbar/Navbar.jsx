import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";

import { Link } from "react-router-dom";

import { FiPlusSquare } from "react-icons/fi";
import { GoMoon, GoSun } from "react-icons/go";

const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode();

	return (
		<Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: 22, sm: 28 }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo={"blue.500"}
          bgClip={"text"}
				>
					<Link to={"/"}>Product Store 🛒</Link>
				</Text>

        <HStack spaceX={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <FiPlusSquare />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <GoMoon /> : <GoSun />}
          </Button>
        </HStack>
			</Flex>
		</Container>
	);
};
export default Navbar;
