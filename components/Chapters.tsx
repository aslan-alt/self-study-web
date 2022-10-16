import React, {FC, useState} from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {Course} from '@/DB/entity';
import {IconButton} from '@/components/IconButton';

export const Chapters: FC<{courses?: Course[]}> = ({courses}) => {
  const [selectedId, setSelectedId] = useState(0);

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
    </Container>
  );
};

const Container = styled.ul``;

const Chapter = styled.li<{select?: boolean}>`
  padding: var(--cx-spacing-1x) var(--cx-spacing-3x);
  ${({select}) => (select ? 'background: #e5e5e5;' : '')}
`;
const LinkContent = styled.a`
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: var(--cx-spacing-3x);
`;
