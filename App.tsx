import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/Home";
import DetailsScreen from "./src/screens/Details";
import Add from "./src/screens/Add";
import Edit from "./src/screens/Edit";

type RootStackParamList = {
  Início: undefined;
  Detalhes: { id: number };
  Editar: { id: number };
  Adicionar: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Início" component={HomeScreen} />
        <Stack.Screen name="Detalhes" component={DetailsScreen} />
        <Stack.Screen name="Adicionar" component={Add} />
        <Stack.Screen name="Editar" component={Edit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

export type { RootStackParamList };
