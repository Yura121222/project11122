import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { playSound } from "../services/soundHandler";
import { wordsLearningActions } from "../store/wordsLearningSlice";

function WordCard({ wordInfo, setNext }) {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.theme.colors);
  const [showFullInfo, setShowFullInfo] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.wordContainer, { borderColor: colors.primary200 }]}
        onPress={() => setShowFullInfo(true)}
      >
        <Text style={[styles.word, { color: colors.fontMain }]}>{wordInfo.word}</Text>
        {showFullInfo && (
          <>
            <Text style={[styles.phonetics, { color: colors.fontMain }]}>{wordInfo.phonetics}</Text>
            <Pressable
              style={styles.playPressable}
              onPress={() => playSound(wordInfo.audio)}
            >
              <Ionicons
                name="volume-medium-outline"
                size={28}
                color={colors.primary900}
              />
            </Pressable>
            <Text style={[styles.meaning, { color: colors.fontMain }]}>{wordInfo.meaning}</Text>
          </>
        )}
      </Pressable>
      {showFullInfo && (
        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={() => {
              setNext();
              setShowFullInfo(false);
            }}
            style={({ pressed }) => [
              styles.remember,
              {
                backgroundColor: colors.secondary800,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text style={[styles.rememberText, { color: colors.fontInverse }]}>Didn't know it</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              dispatch(wordsLearningActions.updateWordLearnInfo(wordInfo.word));
              setShowFullInfo(false);
            }}
            style={({ pressed }) => [
              styles.remember,
              {
                backgroundColor: colors.primary900,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text style={[styles.rememberText, { color: colors.fontInverse }]}>Knew it</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wordContainer: {
    flex: 4,
    margin: 10,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: "center",
    paddingVertical: 140,
    justifyContent: "space-around",
  },
  word: {
    fontSize: 28,
    fontWeight: "800",
  },
  phonetics: {
    fontSize: 18,
  },
  meaning: {
    fontSize: 18,
  },
  remember: {
    flex: 1,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  rememberText: {
    fontSize: 20,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default WordCard;
