import React, {useEffect, useRef, useState} from 'react';
import * as pdfjs from 'pdfjs-dist';
import {EventBus, PDFSinglePageViewer} from "pdfjs-dist/web/pdf_viewer";
import './index.css';
import {ProCard} from "@ant-design/pro-components";
import {Pagination, Space, Button} from "antd";
import {PlusOutlined, MinusOutlined} from '@ant-design/icons';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const url = 'https://bjpcjp.github.io/pdfs/devops/linux-commands-handbook.pdf'

export type PdfComponentProps = { };

const PdfComponent: React.FC<PdfComponentProps> = (props) => {
  const containerRef: any = useRef(null);
  const pdfRef: any = useRef(null);
  const pdfViewerRef = useRef<PDFSinglePageViewer | null>(null);

  const [pageSize, setPageSize] = useState(1);

  const renderPage = () => {
    const eventBus = new EventBus();
    const pdfViewer = new PDFSinglePageViewer({
      container: containerRef.current,
      viewer: pdfRef.current,
      eventBus,
    });

    eventBus.on("pagesinit", function () {
      pdfViewer.currentScaleValue = "page-width";
    });

    pdfjs.getDocument(url).promise.then(pdfDoc => {
      pdfViewer.setDocument(pdfDoc);
      setPageSize(pdfDoc.numPages)
    });

    pdfViewerRef.current = pdfViewer
  }

  const onPageChange = (pageNumber: number) => {
    pdfViewerRef.current?.scrollPageIntoView({pageNumber})
  }

  useEffect(() => renderPage(), [containerRef, pdfRef]);

  return (
    <div>
      <ProCard bordered layout="center" style={{height: '50vh'}}>
        <div ref={containerRef} id="viewerContainer" style={{width: '100%', height: "100%", position: 'absolute', overflow: 'auto'}}>
          <Space size={3} style={{top: '5px', left: '5px', position: 'sticky', zIndex: 100}}>
            <Button icon={<MinusOutlined />} size="small" onClick={()=> pdfViewerRef.current?.decreaseScale()}/>
            <Button icon={<PlusOutlined />} size="small" onClick={()=> pdfViewerRef.current?.increaseScale()}/>
          </Space>
          <div ref={pdfRef} id="viewer" className="pdfViewer"/>
        </div>
      </ProCard>
      <ProCard layout="center">
        <Pagination
          simple
          hideOnSinglePage
          defaultCurrent={1}
          pageSize={1}
          total={pageSize}
          onChange={onPageChange}
        />
      </ProCard>
    </div>
  )
};
export default PdfComponent;
