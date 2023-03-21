import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { createProblem, fetchAllProblems } from "./problemsSlice";
import { ProblemEntity } from "./problemEntity";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
} from "react-native";

export function Problems() {
  const count = useSelector((state: RootState) => state.counter.value);
  const problems: ProblemEntity[] = useSelector(
    (state: RootState) => state.problems.entities
  );

  const dispatch = useDispatch<AppDispatch>();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(`subject: ${subject}, description: ${description}`);

    dispatch(createProblem(new ProblemEntity(subject, description)));
  };

  useEffect(() => {
    dispatch(fetchAllProblems());
  }, []);

  return (
    <View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setSubject}
          value={subject}
        />
        <TextInput
          style={styles.input}
          onChangeText={setDescription}
          value={description}
        />
        <Button title="Create problem" onPress={handleSubmit} />
      </View>

      <FlatList
        style={styles.listview}
        data={problems}
        renderItem={({ item }: { item: ProblemEntity }) => (
          <Text>
            {item.subject} - {item.description}
          </Text>
        )}
        keyExtractor={(item) => "" + item.id}
      />

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
    marginTop: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  listview: {
    marginTop: 80,
  },
});
