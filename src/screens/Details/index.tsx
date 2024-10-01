import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import axios from "axios";

interface User {
  name: string;
  email: string;
  login: string;
  password: string;
  city: string;
}

// Tipagem para o parâmetro da rota
type DetailsScreenProps = {
  route: RouteProp<RootStackParamList, 'Detalhes'>;
};

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const { id } = route.params;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.1.101:3000/users/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar detalhes do usuário:", error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Nome: {user?.name}</Text>
      <Text style={styles.cardTitle}>Email: {user?.email}</Text>
      <Text style={styles.cardTitle}>Login: {user?.login}</Text>
      <Text style={styles.cardTitle}>Cidade: {user?.city}</Text>
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
    width: 300,
  },
  cardTitle: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DetailsScreen;
