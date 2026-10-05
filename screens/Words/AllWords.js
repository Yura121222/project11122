import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";

import Item from "../../components/ListItem";

function AllWords({ navigation }) {
  const words = useSelector((state) => state.wordsLearning.words);
  const colors = useSelector((state) => state.theme.colors);

  return (
    <>
      <Pressable
        style={[styles.addPressable, { backgroundColor: colors.primary900 }]}
        onPress={() => navigation.navigate("AddWord")}
      >
        <Ionicons name="add-outline" size={46} color={colors.fontInverse} />
      </Pressable>
      <View style={{ flex: 2, backgroundColor: colors.appBackground }}>
        <FlatList
          data={words}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.word}
          ListEmptyComponent={
            <View style={{ ...styles.empty, backgroundColor: colors.fontInverse }}>
              <Text style={[styles.textEmpty, { color: colors.primary200 }]}>No words yet</Text>
            </View>
          }
          ListHeaderComponent={
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../../assets/study(option3).png")}
              />
            </View>
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 5,
    zIndex: 10,
  },
  addPressable: {
    position: "absolute",
    width: 60,
    borderRadius: 30,
    aspectRatio: 1,
    top: 200,
    right: "10%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 5,
  },
  image: {
    width: "55%",
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
    resizeMode: "contain",
  },
  empty: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  textEmpty: {
    fontSize: 40,
  },
});

export default AllWords;
