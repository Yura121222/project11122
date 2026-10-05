import { View, Text, StyleSheet, Image } from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";

import WordCard from "../../components/WordCard";

export default function Play() {
  const words = useSelector((state) => state.wordsLearning.words);
  const colors = useSelector((state) => state.theme.colors);
  const wordsToStudy = words.filter((word) => word.status < 2);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  return (
    <View style={[styles.container, { backgroundColor: colors.appBackground }]}>
      {wordsToStudy.length === 0 ? (
        <>
          <Text style={[styles.text, { alignSelf: "center", color: colors.fontMain }]}>Congrats!</Text>
          <Text style={[styles.text, { color: colors.fontMain }]}>For now you have learnt all the words</Text>
          <Image
            style={styles.image}
            source={require("../../assets/well-done-icon.png")}
          />
        </>
      ) : (
        <WordCard
          wordInfo={wordsToStudy[currentWordIndex % wordsToStudy.length]}
          setNext={() =>
            setCurrentWordIndex(
              (currentWordIndex) => (currentWordIndex + 1) % wordsToStudy.length
            )
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 22,
    margin: 10,
    marginTop: 25,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
