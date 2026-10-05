import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getWordInfo } from "../../services/wordsHandler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { playSound } from "../../services/soundHandler";
import { wordsLearningActions } from "../../store/wordsLearningSlice";

function AddWord({ navigation }) {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.theme.colors);
  const [text, setText] = useState();
  const [wordData, setWordData] = useState();

  function onChangeText(text) {
    setWordData(undefined);
    setText(text);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (text) {
        const wordDataReceived = await getWordInfo(text);
        setWordData(wordDataReceived);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  useEffect(() => {
    navigation.setOptions({
      title: wordData?.word ? `Adding word "${wordData.word}"` : `Adding word`,
    });
  }, [navigation, wordData]);

  function onAdd() {
    if (wordData?.word) {
      dispatch(wordsLearningActions.addWord(wordData));
    }
    navigation.navigate("AllWords");
  }

  return (
    <>
      <Image
        style={{
          marginTop: 80,
          marginBottom: 20,
          width: "40%",
          height: undefined,
          aspectRatio: 1,
          alignSelf: "center",
          resizeMode: "contain",
        }}
        source={require("../../assets/add-koala.png")}
      />
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.grey600 }]}>Your word to search:</Text>
        <TextInput
          style={[styles.input, { borderColor: colors.primary200, color: colors.fontMain }]}
          onChangeText={onChangeText}
          value={text}
          placeholder="type here.."
          placeholderTextColor={colors.grey600}
        />
      </View>
      {wordData && (
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
            <Text style={[styles.phonetics, { color: colors.fontMain }]}>{wordData.phonetics}</Text>
          </View>
          <Text style={[styles.partOfSpeech, { color: colors.fontMain }]}>{wordData.partOfSpeech}</Text>
          <Text style={[styles.meaning, { color: colors.fontMain }]}>{wordData.meaning}</Text>
          {wordData.word && (
            <Pressable style={[styles.buttonContainer, { backgroundColor: colors.primary900 }]} onPress={onAdd}>
              <Text style={{ fontSize: 24, color: colors.fontInverse }}>Add</Text>
            </Pressable>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  inputContainer: {
    marginHorizontal: 12,
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
  },
  playPressable: {
    marginHorizontal: 20,
  },
});

export default AddWord;
