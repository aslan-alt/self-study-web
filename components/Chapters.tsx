import React, {FC, useState} from 'react';
import {FolderAddOutlined} from '@ant-design/icons';
import {Input, Modal, Button} from 'antd';
import Link from 'next/link';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {Course} from '@/DB/entity';
import {IconButton} from '@/components/IconButton';
import {useCreateCourse} from '../hooks/useCreateCourse';
import {CourseType} from '../requests';
// import {CourseType, CreateCoursesRequest} from '../pages/api/Course/createCourse';

export const Chapters: FC<{courses?: Course[]}> = ({courses}) => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(router.query?.id ? Number(router.query.id) : 0);
  const [chapterName, setChapterName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {mutateAsync: createCourse, isLoading} = useCreateCourse();

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const {data} = await createCourse({title: chapterName, type: CourseType.FE, author: 1});
    closeModal();
    await router.push(`/chapter/${data.id}`);
    setSelectedId(data?.id);
    setChapterName('');
  };

  return (
    <Container>
      {courses?.map((chapter) => {
        return (
          <Chapter
            key={chapter.id}
            select={chapter.id === selectedId}
            onClick={() => setSelectedId(chapter.id)}
          >
            <Link href={`/chapter/${chapter.id}`}>
              <TitleAndIcon>
                <IconButton data-tn="header-icon-search" iconName="search" size={20} />
                <Title>{chapter.title}</Title>
              </TitleAndIcon>
            </Link>
          </Chapter>
        );
      })}
      <AddButton onClick={openModal}>
        <FolderAddOutlined style={{fontSize: '24px'}} />
        添加章节
      </AddButton>
      <Modal
        title="添加章节"
        open={isModalOpen}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={isLoading} onClick={handleOk}>
            创建
          </Button>,
        ]}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <Input
          placeholder="请输入章节名"
          value={chapterName}
          onChange={(e) => {
            setChapterName(e.target.value);
          }}
        />
      </Modal>
    </Container>
  );
};

const Container = styled.ul``;

const Chapter = styled.li<{select?: boolean}>`
  padding: var(--mt-spacing-1x) var(--mt-spacing-3x);
  ${({select}) => (select ? 'background: #e5e5e5;' : '')}
  color: var(--mt-spec-text-primary);
`;

const titleAndIconStyle = `
  display: grid;
  align-items: center;
  grid-template-columns: 20px 1fr;
  gap: var(--mt-spacing-3x);
  font-size: var(--mt-tab-system-font-size);
  cursor: pointer;
  font-weight: 400;
  font-family: "Roboto","Arial",sans-serif;
`;
const Title = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const TitleAndIcon = styled.div`
  ${titleAndIconStyle}
`;

const AddButton = styled(Chapter)`
  color: var(--mt-button-color);
  ${titleAndIconStyle}
`;
