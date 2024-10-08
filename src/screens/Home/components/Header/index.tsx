import React from "react";
import { Container, Greeting, Message, Name, Picture } from "./styles";
import { TouchableOpacity } from "react-native";
import { Power } from "phosphor-react-native";
import theme from "../../../../theme";
export function HomeHeader() {
  return (
    <Container>
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
