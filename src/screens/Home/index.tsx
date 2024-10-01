import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import UserCard from "../../components/UserCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

type User = {
  id: number;
  name: string;
  email: string;
};

const HomeScreen = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://192.168.1.101:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  //Para manter a lista atualizada
  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.container}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <UserCard id={item.id} name={item.name} email={item.email} fetchUsers={fetchUsers} />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

export default HomeScreen;
