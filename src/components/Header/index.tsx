import { StyleSheet, View, Text, Button } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

type HeaderProps = {
  hideAddButton?: boolean; // Prop opcional para controlar se o botão deve ser exibido
};

export default function Header({ hideAddButton }: HeaderProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Super APP - Desenvolvimento de Sistemas II</Text>
      {/* Só exibe o botão se hideAddButton for false ou undefined */}
      {!hideAddButton && (
        <Button title="Adicionar" onPress={() => navigation.navigate("Adicionar")} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
  },
  headerText: {
    color: "white",
  },
});
