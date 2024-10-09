import { useNavigation } from "@react-navigation/native";
import React from "react";
import { CarStatus } from "../../components/CarStatus";
import { HomeHeader } from "./components/Header";
import { Container, Content } from "./styles";

export function Home() {
  const { navigate } = useNavigation();

  function handleRegisterMoviment() {
    navigate("departure");
  }

  return (
    <Container>
      <HomeHeader />
      <Content>
        <CarStatus licensePlate="XXX-1234" onPress={handleRegisterMoviment} />
      </Content>
    </Container>
  );
}
