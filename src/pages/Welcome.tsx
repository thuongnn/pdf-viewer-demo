import React from 'react';
import {PageContainer, ProCard} from '@ant-design/pro-components';
import PdfComponent from '@/components/PdfComponent';
import CanvasContainer from '@/components/CanvasContainer';
import './Welcome.css'

const Welcome: React.FC = () => {
  return (
    <PageContainer style={{height: "100%"}}>
      <ProCard style={{ marginBlockStart: 8 }} gutter={8} ghost>
        <ProCard style={{height: "100%"}} colSpan="30%" layout="center" bordered>
          <CanvasContainer></CanvasContainer>
        </ProCard>
        <ProCard bordered wrap>
          <PdfComponent />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default Welcome;
