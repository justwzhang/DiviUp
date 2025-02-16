import { View, Text, TouchableOpacity } from "react-native";
import { useStore } from "../../store";
import { StyleSheet } from 'react-native';
import { primary, secondary } from "@styles/variables";
import { OleoScript_400Regular, OleoScript_700Bold, useFonts } from "@expo-google-fonts/oleo-script";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function Header(){

    const [fontsLoaded] = useFonts({
        OleoScriptRegular: OleoScript_400Regular,
        OleoScriptBold: OleoScript_700Bold,
    });
    const store = useStore().store;
    const nav = useNavigation();
    function changeScreen(){
      store.changeScreen("r", nav );
    }

    return(
        <LinearGradient
            colors={[primary, secondary]}
            start={{x:0, y:0}}
            end={{x:1, y:0}}
            style={styles.pageHeader}
        >
            <TouchableOpacity onPress={()=>{changeScreen()}}>
                <Text style={styles.DiviUpText}> DiviUp </Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
  pageHeader: {
    width:'100%',
    height:110,
  },
  DiviUpText:{
    paddingTop:50,
    paddingLeft:20,
    fontFamily:"OleoScriptRegular",
    color:"white",
    fontSize:40
  }
});