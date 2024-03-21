import { Flex, FormControl, Heading, useColorModeValue, Input, FormErrorMessage, Button, useToast, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useNavigate} from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const navigate = useNavigate();
  const{
        handleSubmit,
        register,
        formState:{errors, isSubmitting}
    } = useForm();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const {login} = useAuth(); // login function from the jwt auth file
  const toast = useToast();
  /* Submit form function */
  const submitForm = async (values) => {
      try {
        await login(values.email, values.password);
      } catch (error) {
        toast({
          title: "Invalid email or password",
          status: 'error',
          isClosable: true,
          duration: 1500
        });
      }
  };
  return (
    <>
    <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'} background={useColorModeValue('gray.100', "gray.700")} p={12} rounded={6}>
      <Heading mb={6}>Login</Heading>
      <form onSubmit={handleSubmit(submitForm)}>
        <FormControl isInvalid={errors.email}>
          <Input placeholder="Email" 
            background={useColorModeValue('gray.300', "gray.600")}
            type="email"
            size={'lg'}
            mt={6}
            {...register("email",{
                required: 'This field cannot be empty',
            })}/>
          <FormErrorMessage>
              {errors.email?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <InputGroup size={'lg'} mt={6}>
            <Input placeholder="Password" 
              background={useColorModeValue('gray.300', "gray.600")}
              type={show ? 'text' : "password"}
              {...register("password",{
                  required: 'This field cannot be empty',
              })}/>
            <InputRightElement>
              <Button size={'xl'} onClick={handleClick} background={'none'} _hover={{bg:'none'}}>
                {show ? <FiEyeOff/> : <FiEye/>}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
              {errors.password?.message}
          </FormErrorMessage>
        </FormControl>
        <Button isLoading={isSubmitting} loadingText="Logging in..." width={'100%'} colorScheme="green"  variant='outline' mt={6} type="submit">Login</Button>
      </form>
      <Button onClick={() => navigate("/register", {replace: true})} width={'100%'} colorScheme="gray"  variant='outline' mt={6}>Register Instead</Button>
    </Flex>
    </>
  )
}
