import { HStack, VStack } from '@chakra-ui/react';
import { FormsManager } from 'components/forms/FormsManager';
import React from 'react';

interface LoginProps {

}

const Login: React.FC<LoginProps> = () => {
    return (
        <VStack justify={"center"} align="center" h={"100vh"} gap={[10, 20]}>
            <FormsManager.Login />
            <FormsManager.CreateUser />
        </VStack>
    );
};

export default Login;