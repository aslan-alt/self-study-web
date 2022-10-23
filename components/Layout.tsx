import React, {FC} from 'react';
import {Layout as AntdLayout, Menu, Breadcrumb, Card} from 'antd';
import {isEmpty} from 'lodash';
import Link from 'next/link';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {Course} from '@/DB/entity';
import {Header} from '@/components/Header';

const {Sider} = AntdLayout;

export const Layout: FC<{courses?: Course[]}> = ({courses}) => {
  const router = useRouter();
  const selectedId = String(router.query.id ?? 1);

  const currentChapter = courses.find((item) => String(item.id) === selectedId);
  const videos = courses.filter(
    (item) => !isEmpty(item.videos) && item.id === Number(router.query.id)
  );
  return (
    <Container>
      <Header />
      <LayoutBody>
        <Left width={240} className="site-layout-background">
          <Menu
            mode="inline"
            selectedKeys={[selectedId]}
            style={{height: '100%', borderRight: 0}}
            items={courses?.map((chapter) => {
              return {
                key: chapter.id,
                label: <Link href={`/chapter/${chapter.id}`}>{chapter.title}</Link>,
              };
            })}
          />
        </Left>
        <Content style={{padding: '0 24px 24px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>{currentChapter?.title ?? ''}</Breadcrumb.Item>
          </Breadcrumb>
          {isEmpty(videos) ? <Card>内容为空</Card> : <Card>我是内容</Card>}
        </Content>
      </LayoutBody>
    </Container>
  );
};

const Left = styled(Sider)`
  overflow-y: scroll;
  overflow-x: hidden;
  background: var(--mt-theme-background-color);
`;

const Container = styled(AntdLayout)`
  height: 100vh;
  overflow: hidden;
  background: var(--mt-theme-background-color);
`;

const LayoutBody = styled(AntdLayout)`
  margin-top: 80px;
`;

const Content = styled(AntdLayout)`
  background: var(--mt-theme-background-color);
`;
