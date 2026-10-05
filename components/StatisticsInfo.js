import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import InfoCard from "./InfoCard";

function StatisticsInfo() {
  const words = useSelector((state) => state.wordsLearning.words);
  const counts = { 0: 0, 1: 0, 2: 0 };

  words.forEach((word) => {
    const status = word.status ?? 0;
    counts[status] = (counts[status] || 0) + 1;
  });

  return (
    <View style={styles.container}>
      <InfoCard caption={"To learn"} number={counts[0]} color={"hotpink"} />
      <InfoCard caption={"In process"} number={counts[1]} color={"lightgreen"} />
      <InfoCard caption={"Learned"} number={counts[2]} color={"lightblue"} />
    </View>
  );
}

export default StatisticsInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "20%",
  },
});
