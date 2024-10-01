import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, StyleSheet, View, TextInput, Alert } from "react-native";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Picker } from "@react-native-picker/picker";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../App"; 

type EditScreenProps = {
  route: RouteProp<RootStackParamList, "Editar">;
};

type User = {
  name: string;
  email: string;
  login: string;
  password: string;
  city: string;
};

const Edit: React.FC<EditScreenProps> = ({ route }) => {
  const { id } = route.params; 
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [city, setCity] = useState<string>("");

  useEffect(() => {
    
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.1.101:3000/users/${id}`);
        const user = response.data;
        setName(user.name);
        setEmail(user.email);
        setLogin(user.login);
        setPassword(user.password);
        setCity(user.city);
      } catch (error) {
        console.error("Erro ao buscar detalhes do usuário:", error);
        Alert.alert("Erro", "Falha ao buscar os detalhes do usuário.");
      }
    };

    fetchUserDetails();
  }, [id]);

  const updateUser = async (user: User) => {
    try {
      const response = await axios.put(`http://192.168.1.101:3000/users/${id}`, user);
      console.log("Usuário atualizado!", response.data);
      Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar usuário!", error);
      Alert.alert("Erro", "Falha ao atualizar o usuário.");
    }
  };

  const handleSubmit = () => {
    const user: User = { name, email, login, password, city };
    updateUser(user);
  };

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Login"
            value={login}
            onChangeText={setLogin}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
          <Picker
            selectedValue={city}
            style={styles.picker}
            onValueChange={(itemValue) => setCity(itemValue)}
          >
            <Picker.Item label="Selecione uma cidade" value="" />
            <Picker.Item label="Candecity" value="Candecity" />
            <Picker.Item label="Uraicity" value="Uraicity" />
            <Picker.Item label="Corneliocity" value="Corneliocity" />
            <Picker.Item label="Recanto Of Master" value="Recanto Of Master" />
          </Picker>
          
          <Button title="Atualizar" onPress={handleSubmit} />
        </View>
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
  inputContainer: {
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export default Edit;
