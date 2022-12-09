import React, {FC} from 'react';
import {QuestionCircleOutlined} from '@ant-design/icons';
import {Card, Input, Popover} from 'antd';
import styled from 'styled-components';

type Props = {
  title: string;
  tips: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export const TitleInput: FC<Props> = ({tips, title, value, onChange, placeholder}) => {
  return (
    <VideoName>
      <TipsAndTitle>
        {title} &nbsp;
        <Popover content={<Tips>{tips}</Tips>}>
          <QuestionCircleOutlined style={{fontSize: 16, color: '#030303'}} />
        </Popover>
      </TipsAndTitle>
      <VideoNameInput
        placeholder={placeholder}
        value={value}
        bordered={false}
        max={50}
        onChange={onChange}
      />
    </VideoName>
  );
};

const VideoName = styled(Card)`
  padding: 0 12px var(--mt-spacing-3x) 12px;
  :focus-within {
    border: 1px solid #40a9ff;
  }
  .ant-card-body {
    padding: 0;
  }
  margin-bottom: var(--mt-spacing-3x);
  border: 1px solid rgba(96, 96, 96, 0.5);
  border-radius: 4px;
`;

const TipsAndTitle = styled.p`
  padding: var(--mt-spacing-1x) 0 3px 0;
  margin: 0;
  color: var(--mt-upload-icon-color);
`;

const VideoNameInput = styled(Input)`
  padding-left: 0;
`;

const Tips = styled.div`
  max-width: 300px;
  font-size: var(--mt-tab-system-font-size);
`;
