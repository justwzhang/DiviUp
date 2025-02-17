import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { GlobalStoreContextProvider } from "./store";
import { Header, Footer, ReceiptsScreenList, FriendsScreenList, FriendCreate, FriendEdit } from "components";
import { gray200} from "@styles/variables";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { RootStackParamList } from "utils/types/store-types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GlobalStoreContextProvider>
        <NavigationContainer>
        <Header />
          <Stack.Navigator initialRouteName="ReceiptsList">
            <Stack.Screen name="ReceiptsList" component={ReceiptsScreenList} options={{headerShown:false}}/>

            <Stack.Screen name="FriendsList" component={FriendsScreenList} options={{headerShown:false}}/>
            <Stack.Screen name="FriendCreate" component={FriendCreate} options={{headerShown:false}}/>
            <Stack.Screen name="FriendEdit" component={FriendEdit} options={{headerShown:false}}/>
          </Stack.Navigator>
          <Footer />
        </NavigationContainer>
    </GlobalStoreContextProvider>
  );
}
