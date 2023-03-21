import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { Counter } from "./features/counter/counter";
import { Problems } from "./features/problems/problems";
import { store } from "./store";
import { Users } from "./features/userlogin/users";
import { Login } from "./features/userlogin/login";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        {/* <Problems></Problems> */}
        <Users></Users>
        <Login></Login>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
