import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { GlobalStoreContextProvider } from "./store";
import { Header, Footer } from "components";
import { gray200, gray400 } from "@styles/variables";

export default function App() {
  return (
    <GlobalStoreContextProvider>
      <Header />
      <View style={styles.container}></View>
      <Footer />
    </GlobalStoreContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: gray200,
    alignItems: "center",
    justifyContent: "center",
  },
});
