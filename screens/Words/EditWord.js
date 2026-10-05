import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { playSound } from "../../services/soundHandler";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { wordsLearningActions } from "../../store/wordsLearningSlice";

function EditWord({ route, navigation }) {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.theme.colors);
  const [wordData, setWordData] = useState(() => route.params.wordData);

  function onSave() {
    dispatch(wordsLearningActions.updateWord(wordData));
    navigation.navigate("AllWords");
  }

  function onChangeWordData(text, propName) {
    setWordData((prevData) => ({ ...prevData, [propName]: text }));
  }

  return (
    <>
      <Image
        style={{
          width: "40%",
          marginTop: 80,
          marginBottom: 20,
          height: undefined,
          aspectRatio: 1,
          alignSelf: "center",
          resizeMode: "contain",
        }}
        source={require("../../assets/edit-koala.png")}
      />

      <View style={styles.receivedInfoContainer}>
        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
          <Text style={[styles.word, { color: colors.fontMain }]}>{wordData.word}</Text>
          {wordData.audio && (
            <Pressable
              style={styles.playPressable}
              onPress={() => playSound(wordData.audio)}
            >
              <Ionicons name="volume-medium-outline" size={28} color={colors.primary900} />
            </Pressable>
          )}
        </View>
        <View style={{ flexDirection: "row", alignItems: "baseline", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: colors.grey600 }]}>phonetics:</Text>
            <TextInput
              value={wordData.phonetics}
              style={[styles.input, { borderColor: colors.primary200, color: colors.fontMain }]}
              onChangeText={(text) => onChangeWordData(text, "phonetics")}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: colors.grey600 }]}>part of speach:</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.primary200, color: colors.fontMain }]}
              value={wordData.partOfSpeech}
              onChangeText={(text) => onChangeWordData(text, "partOfSpeech")}
            />
          </View>
        </View>
        <Text style={[styles.label, { color: colors.grey600 }]}>meaning:</Text>
        <TextInput
          style={[styles.input, { borderColor: colors.primary200, color: colors.fontMain }]}
          multiline
          numberOfLines={4}
          onChangeText={(text) => onChangeWordData(text, "meaning")}
          value={wordData.meaning}
          textAlignVertical={"top"}
        />
        {wordData.word && (
          <Pressable
            style={[styles.buttonContainer, { backgroundColor: colors.primary900 }]}
            onPress={onSave}
          >
            <Text style={{ fontSize: 24, color: colors.fontInverse }}>Save</Text>
          </Pressable>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 6,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    paddingTop: 10,
  },
  inputContainer: {
    margin: 12,
  },
  receivedInfoContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 32,
  },
  word: {
    fontSize: 32,
    paddingHorizontal: 10,
  },
  phonetics: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  partOfSpeech: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  meaning: {
    fontSize: 16,
    padding: 13,
  },
  buttonContainer: {
    borderRadius: 4,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 14,
  },
  playPressable: {
    marginHorizontal: 20,
  },
});

export default EditWord;
