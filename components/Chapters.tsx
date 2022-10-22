import React, {FC, useState} from 'react';
import {FolderAddOutlined} from '@ant-design/icons';
import {Input, Modal} from 'antd';
import axios from 'axios';
import Link from 'next/link';
import styled from 'styled-components';
import {Course} from '@/DB/entity';
import {IconButton} from '@/components/IconButton';
import {CourseType, CreateCoursesRequest} from '../types/Course';
// import {CourseType, CreateCoursesRequest} from '../pages/api/Course/createCourse';

export const Chapters: FC<{courses?: Course[]}> = ({courses}) => {
  const [selectedId, setSelectedId] = useState(0);
  const [chapterName, setChapterName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              <LinkContent>
                <IconButton data-tn="header-icon-search" iconName="search" size={20} />
                {chapter.title}
              </LinkContent>
            </Link>
          </Chapter>
        );
      })}
      <Chapter
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <LinkContent>
          <FolderAddOutlined style={{fontSize: '24px'}} />
          添加章节
        </LinkContent>
      </Chapter>
      <Modal
        title="添加章节"
        open={isModalOpen}
        onOk={async () => {
          await axios
            .post<CreateCoursesRequest>('http://localhost:3000/api/Course/createCourse', {
              title: chapterName,
              type: CourseType.FE,
              author: 1,
            })
            .then((res) => {
              console.log('res---------');
              console.log(res);
            });
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <Input
          placeholder="请输入章节名"
          value={chapterName}
          onChange={(v) => {
            setChapterName(v.target.value);
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
`;
const LinkContent = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 20px 1fr;
  gap: var(--mt-spacing-3x);
  color: var(--mt-button-color);
  font-size: var(--mt-tab-system-font-size);
  cursor: pointer;
`;
