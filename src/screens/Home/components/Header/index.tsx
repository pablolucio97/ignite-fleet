import { Power } from "phosphor-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../../../../theme";
import { Container, Greeting, Message, Name, Picture } from "./styles";
export function HomeHeader() {
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 24;

  return (
    <Container style={{ paddingTop }}>
      <Picture
        source={{ uri: "https://github.com/rennand.png" }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@" //generated placeholder for image from https://blurha.sh/
      />
      <Greeting>
        <Message>Olá</Message>
        <Name>Rodrigo</Name>
      </Greeting>
      <TouchableOpacity>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  );
}
