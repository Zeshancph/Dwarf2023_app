import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { createUser } from "./usersSlice";
import { UserEntity } from "./userEntity";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
} from "react-native";

export function Users() {
  const count = useSelector((state: RootState) => state.counter.value);
  const users: UserEntity[] = useSelector(
    (state: RootState) => state.users.entities
  );

  const dispatch = useDispatch<AppDispatch>();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(`userName: ${username}, password: ${password}`);

    dispatch(createUser(new UserEntity(username, password)));
  };

  return (
    <View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setUserName}
          value={username}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />
        <Button title="Create User" onPress={handleSubmit} />
      </View>

      {/* <FlatList
        style={styles.listview}
        data={problems}
        renderItem={({ item }: { item: ProblemEntity }) => (
          <Text>
            {item.subject} - {item.description}
          </Text>
        )}
        keyExtractor={(item) => "" + item.id}
      /> */}

      {/* {problems.map((problem) => (
            <View key={problem?.id}>
                <Text>{problem?.subject} - {problem?.description}</Text>
            </View>
        ))} */}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
