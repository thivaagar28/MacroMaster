import { Button, Flex, FormControl, FormErrorMessage, Input, InputGroup, InputRightElement, useColorModeValue, useToast } from '@chakra-ui/react';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../services/axios';

export const PasswordForm = () => {
    const toast = useToast();
    const{
        handleSubmit,
        register,
        formState:{errors, isSubmitting}
    } = useForm({});
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [show2, setShow2] = useState(false)
    const handleClick2 = () => setShow2(!show2)
    const navigate = useNavigate();
    const location = useLocation();

    const refreshPage = () => {
        window.location.reload(false);
    }

    // function to submit form
    const submitForm = async (values) => {
      console.log(values);
      try {
        await axiosInstance.post('/users/change-password', values);
        toast({
          title : "Password changed successfully.",
          status: 'success',
          isClosable: 'true',
          duration: 1500
        });
        setTimeout( refreshPage, 2000);
      } catch (error) {
        if (error.response && error.response.status === 401) {
            navigate('/login', { replace: true, state: { from: location } });
        } else {
          toast({
            title : `${error.response.data.detail}`,
            status: "error",
            isClosable: true,
            duration: 1500
          })
        }
      }
    };
  return (
    <form onSubmit={handleSubmit(submitForm)}>
        <FormControl isInvalid={errors.old_password}>
          <InputGroup size={'lg'} mt={6}>
            <Input placeholder="Old Password" 
              background={useColorModeValue('gray.300', "gray.600")}
              type={show ? 'text' : "password"}
              {...register("old_password",{
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
              {errors.old_password?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.new_password}>
          <InputGroup size={'lg'} mt={6}>
            <Input placeholder="New Password" 
              background={useColorModeValue('gray.300', "gray.600")}
              type={show2 ? 'text' : "password"}
              {...register("new_password",{
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
              <Button size={'xl'} onClick={handleClick2} background={'none'} _hover={{bg:'none'}}>
                {show2 ? <FiEyeOff/> : <FiEye/>}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
              {errors.new_password?.message}
          </FormErrorMessage>
        </FormControl>
        <Flex px={4} mt={2}>
            <Button isLoading={isSubmitting} loadingText="Making Changes..." width={'100%'} colorScheme="green"  variant='outline' mt={6} type="submit">Change Details</Button>
        </Flex>
    </form>
  )
}
