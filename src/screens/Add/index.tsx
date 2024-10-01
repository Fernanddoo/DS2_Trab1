import React, { useState } from "react";
import axios from "axios";
import { Button, StyleSheet, View, TextInput, Alert } from "react-native";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Picker } from "@react-native-picker/picker";

type User = {
  name: string;
  email: string;
  login: string;
  password: string;
  city: string;
};

const Add = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const postUsers = async (user: User) => {
    try {
      const response = await axios.post("http://192.168.1.101:3000/users", user);
      console.log("Usuário cadastrado!", response.data);
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar usuário!", error);
      Alert.alert("Erro", "Falha ao cadastrar usuário.");
    }
  };

  const handleSubmit = () => {
    const user: User = { name, email, login, password, city };
    postUsers(user);
  };

  return (
    <View style={styles.screen}>
      <Header hideAddButton={true} />
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

          <Button title="Enviar" onPress={handleSubmit} />
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

export default Add;
