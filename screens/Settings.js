import { View, StyleSheet, Switch, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { themeActions } from "../store/themeSlice";

function Settings() {
  const dispatch = useDispatch();
  const { isDark, colors } = useSelector((state) => state.theme);

  return (
    <View style={{ ...styles.container, backgroundColor: colors.appBackground }}>
      <Text style={[styles.caption, { color: colors.fontMain }]}>Choose color theme:</Text>
      <View style={styles.switchContainer}>
        <Text style={[styles.caption, { color: colors.fontMain }]}>Light</Text>
        <Switch
          value={isDark}
          onValueChange={() => dispatch(themeActions.toggle())}
          trackColor={{
            false: colors.grey300,
            true: colors.primary300,
          }}
          thumbColor={colors.primary900}
          ios_backgroundColor={colors.primary200}
          style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
        />
        <Text style={[styles.caption, { color: colors.fontMain }]}>Dark</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  switchContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 100,
  },
  caption: {
    fontSize: 18,
    margin: 30,
  },
});

export default Settings;
