import React from "react";
import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 2,
    flexGrow: 1,
  },
  group: {
    flexDirection: "column",
    gap: 10,
  },
});

const PDFExport = ({ obj1, obj2 }) => (
  <PDFDownloadLink
    document={
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View style={styles.group}>
              <Text>First name: {obj2.firstName}</Text>
              <Text>Gender: {obj1.gender}</Text>
              <Text>Address: {obj1.Address}</Text>
              <Text>Phone number: {obj1.phone}</Text>
              <Text>Field of study: {obj1.field_of_study}</Text>
              <Text>Education level: {obj1.education_level}</Text>
              <Text>Is employed: {obj1.isEmployed ? "true" : "false"}</Text>
              <Text>Email: {obj2.email}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.group}>
              <Text>Province: {obj1.province}</Text>
              <Text>District: {obj1.district}</Text>
              <Text>Sector: {obj1.sector}</Text>
              <Text>Is student: {obj1.isStudent ? "true" : "false"}</Text>
              <Text>Hackerrank score: {obj1.Hackerrank_score}</Text>
              <Text>English score: {obj1.english_score}</Text>
            </View>
          </View>
        </Page>
      </Document>
    }
    fileName={"export-doc.pdf"}
  >
    {({ blob, url, loading, error }) => (
      <button
        onClick={() => {
          if (!loading && blob) {
            saveAs(blob, `trainee_${obj2.firstName}.pdf`);
          }
        }}
        disabled={loading || !blob}
      >
        {loading ? "Generating PDF..." : "Export to PDF"}
      </button>
    )}
  </PDFDownloadLink>
);

export default PDFExport;
