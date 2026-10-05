import "react-native-gesture-handler";
import { Provider } from "react-redux";

import MainNavigator from "./navigators/MainNavigator";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
