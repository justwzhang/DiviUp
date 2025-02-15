import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { GlobalStoreContext, GlobalStoreContextProvider } from './store';

export default function App() {
  console.log({
    str: "test"
  });
  return (
    <GlobalStoreContextProvider>
      <View style={styles.container}>
        {/* <Button  title="Learn More"></Button> */}
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </GlobalStoreContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
