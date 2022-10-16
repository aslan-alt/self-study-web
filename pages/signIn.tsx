import {Input} from 'antd';
import {NextPage} from 'next';
import styled from 'styled-components';
import {User} from '@/DB/entity';

const SignIn: NextPage<{user: User}> = () => {
  return (
    <Container>
      <Input />
    </Container>
  );
};
export default SignIn;

const Container = styled.div`
  border: 1px solid red;
`;
