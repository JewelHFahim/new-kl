
import { Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';

const MyPDFDocument = () => {
  return (
    <PDFViewer width="100%" height={500}>
      <Document>
        <Page size="A4">
          <View>
            <Text>Hello, this is a PDF generated with react-pdf!</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default MyPDFDocument;
