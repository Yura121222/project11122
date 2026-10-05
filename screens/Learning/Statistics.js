import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import StatisticsInfo from "../../components/StatisticsInfo";
import ImagePile from "../../components/ImagePile";

export default function Statistics() {
  const colors = useSelector((state) => state.theme.colors);

  return (
    <View style={[styles.container, { backgroundColor: colors.appBackground }]}>
      <StatisticsInfo />
      <ImagePile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
