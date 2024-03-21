import { Flex, FormControl, Heading, useColorModeValue, Input, FormErrorMessage, Button, useToast, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useNavigate} from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axiosInstance from "../../services/axios";

export const Register = () => {
  const navigate = useNavigate();
  const{
        handleSubmit,
        register,
        formState:{errors, isSubmitting}
    } = useForm();
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const toast = useToast();
  /* Submit registration form data */
  const submitForm = async (values) => {
    try {
        await axiosInstance.post('/users/create', values);
        toast({
            title: "Account created successfully",
            status: "success",
            isClosable: true,
            duration: 1500
        });
        navigate("/login", {replace: true});
    } catch (error) {
        toast({
            title : `${error.response.data.detail}`,
            status: "error",
            isClosable: true,
            duration: 1500
        })
    }
  };
  return (
    <>
    <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'} background={useColorModeValue('gray.100', "gray.700")} p={12} rounded={6}>
      <Heading mb={6}>Register</Heading>
      <form onSubmit={handleSubmit(submitForm)}>
        <Flex flexDir={'row'} gap={2}>
            <FormControl isInvalid={errors.first_name}>
                <Input placeholder="First Name" 
                    background={useColorModeValue('gray.300', "gray.600")}
                    type="text"
                    size={'lg'}
                    mt={6}
                    {...register("first_name",{
                        required: 'This field cannot be empty',
                        minLength :{
                            value : 3,
                            message : "Must have at least 3 characters"
                        },
                        maxLength : {
                            value : 24,
                            message: "Must have at most 24 characters"
                        }
                    })}/>
                <FormErrorMessage>
                    {errors.first_name?.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.last_name}>
                <Input placeholder="Last Name" 
                    background={useColorModeValue('gray.300', "gray.600")}
                    type="text"
                    size={'lg'}
                    mt={6}
                    {...register("last_name",{
                        required: 'This field cannot be empty',
                        minLength :{
                            value : 3,
                            message : "Must have at least 3 characters"
                        },
                        maxLength : {
                            value : 24,
                            message: "Must have at most 24 characters"
                        }
                    })}/>
                <FormErrorMessage>
                    {errors.last_name?.message}
                </FormErrorMessage>
            </FormControl>    
        </Flex>
        <Flex flexDir={'row'} gap={2}>
            <FormControl isInvalid={errors.username}>
                <Input placeholder="Username" 
                    background={useColorModeValue('gray.300', "gray.600")}
                    type="text"
                    variant={'filled'}
                    size={'lg'}
                    mt={6}
                    {...register("username",{
                        required: 'This field cannot be empty',
                        minLength :{
                            value : 5,
                            message : "Must have at least 5 characters"
                        },
                        maxLength : {
                            value : 24,
                            message: "Must have at most 24 characters"
                        }
                    })}/>
                <FormErrorMessage>
                    {errors.username?.message}
                </FormErrorMessage>
            </FormControl>    
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
        </Flex>
        <FormControl isInvalid={errors.password}>
          <InputGroup size={'lg'} mt={6}>
            <Input placeholder="Password" 
              background={useColorModeValue('gray.300', "gray.600")}
              type={show ? 'text' : "password"}
              {...register("password",{
                  required: 'This field cannot be empty',
                  minLength:{
                    value:5,
                    message: "Password should be atleast 5 characters ling"
                },
                maxLength:{
                    value:24,
                    message: "Password should be at most 24 characters"
                }
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
        <Button isLoading={isSubmitting} loadingText="Registering..." width={'100%'} colorScheme="green"  variant='outline' mt={6} type="submit">Register</Button>
      </form>
      <Button onClick={() => navigate("/login", {replace: true})} width={'100%'} colorScheme="gray"  variant='outline' mt={6}>Login Instead</Button>
    </Flex>
    </>
  )
}
