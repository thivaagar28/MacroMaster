import { Button, Flex, FormControl, FormErrorMessage, Input, Spinner, useColorModeValue, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axiosInstance from '../../services/axios';
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const DetailsForm = () => {
    const [loading, setLoading] = useState(true);
    const toast = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const color = useColorModeValue('gray.300', "gray.600");
    const refreshPage = () => {
        window.location.reload(false);
    }

    // User Detail get function
    const getUserDetails = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/users/me');
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/login', { replace: true, state: { from: location } });
            } else {
                toast({
                    title: "Something went wrong",
                    status: 'error',
                    isClosable: 'true',
                    duration: 1500
                });
            }
        } finally{
            setLoading(false);
        }
    }

    const{
        handleSubmit,
        register,
        formState:{errors, isSubmitting, isDirty},
    } = useForm({
        defaultValues : getUserDetails
    });

    /* Submit form function */
    const submitForm = async (values) => {
        if (isDirty){
            try {
                await axiosInstance.post('/users/update', values);
                toast({
                    title : "Changes made successfully. Page will be reloaded in few seconds.",
                    status: 'success',
                    isClosable: 'true',
                    duration: 1500
                });
                setTimeout( refreshPage, 2000);
            } catch (error) {
                toast({
                        title : "Something went wrong",
                        status: 'error',
                        isClosable: 'true',
                        duration: 1500
                    })
            }    
        } else {
            toast({
                title : "Cannot submit default values",
                status: 'error',
                isClosable: 'true',
                duration: 1500
            });
        }
    };

  
  return (
    loading ? (<Spinner thickness='4px' speed='0.65s' emptyColor='green.200' color='green.500' size={'xl'}/>) : 
    <form onSubmit={handleSubmit(submitForm)}>
        <FormControl isInvalid={errors.first_name}>
            <Input placeholder="First Name" 
                background={color}
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
                background={color}
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
        <FormControl isInvalid={errors.username}>
            <Input placeholder="Username" 
                background={color}
                type="text"
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
        <Flex px={4} mt={2}>
            <Button isLoading={isSubmitting} loadingText="Making Changes..." width={'100%'} colorScheme="green"  variant='outline' mt={6} type="submit">Change Details</Button>
        </Flex>
      </form>
  )
}
