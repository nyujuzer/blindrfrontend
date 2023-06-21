import { StyleSheet } from "react-native"
import { BackgroundColor } from "../../components/helpers/StyleVars"
export const RegisterStyles = StyleSheet.create({
    center:{
        flex:1,
        alignContent:"center",
        alignItems:"center",
        
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BackgroundColor,
    },
    borderTest: {
        borderColor: "#fff",
        borderWidth: 3
    },
    card: {
        marginTop:30,
        backgroundColor: "#252525",
    },
    test: {
        position: "absolute",
        top: "95%",
        left: "60%",
    },
    container: {
        flex: 1,
        width:'10%',
        height:'10%',

        alignItems: 'center',
    },
    modalView:{
        height:'30%',
        width:"30%",

        borderRadius:20,
    },
    header: {
        color: "white"
    },
    radio: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 100,
    },
    label: {
        color: "white",
        fontSize: 25,
    },
    radioLabelActive:{
        color:"white"
    },
    radioLabelPassive:{
        color:'gray'
    }
})