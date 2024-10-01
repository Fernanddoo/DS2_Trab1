import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import axios from "axios";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../App"

type UserCardProps = {
  id: number;
  name: string;
  email: string;
  fetchUsers: () => void;
};

const UserCard: React.FC<UserCardProps> = ({ id, name, email, fetchUsers }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://192.168.1.101:3000/users/${id}`);
      Alert.alert("Sucesso", "Usuário excluído com sucesso!");
      fetchUsers(); // Atualiza a lista de usuários após excluir
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      Alert.alert("Erro", "Falha ao excluir o usuário.");
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardtitles}>{name}</Text>
      <Text style={styles.cardtitles}>{email}</Text>
      <Button title="Detalhes" onPress={() => navigation.navigate("Detalhes", { id })} />
      <View style={styles.buttons}>
        <View style={styles.buttonWrapper}>
          <Button title="Editar" onPress={() => navigation.navigate("Editar", { id })} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Excluir" onPress={handleDelete} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    width: 250, // Ajusta a largura do card para um valor fixo
  },
  cardtitles: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonWrapper: {
    width: 100, // Ajusta o tamanho dos botões para que não estiquem
  },
});

export default UserCard;
