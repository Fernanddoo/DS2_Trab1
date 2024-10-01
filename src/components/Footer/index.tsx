import { StyleSheet, View, Text } from "react-native";

export default function Footer() {
    
    return(
        <View style={styles.footer}>
            <Text style={styles.footerText}>2024 - Fernando Dreyer Radünz</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        height: 60, // Fixed height for the footer
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    footerText: {
        color: "white",
    },
});