import { useRef } from "react";
import { TextInput } from "react-native";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { LicensePlateInput } from "../../components/LicensePlate";
import { TextAreaInput } from "../../components/TextAreaInput";
import { Container, Content } from "./styles";
export function Departure() {
  const descriptionRefInput = useRef<TextInput>(null);
  function handleDepartureRegister() {
    console.log("OK!");
  }
  return (
    <Container>
      <Header title="Saída" />
      <Content>
        <LicensePlateInput
          label="Placa do veículo"
          placeholder="BRA1234"
          onSubmitEditing={() => descriptionRefInput.current?.focus()}
          returnKeyType="next"
        />
        <TextAreaInput
          ref={descriptionRefInput}
          label="Finalizade"
          placeholder="Vou utilizar o veículo para..."
          onSubmitEditing={handleDepartureRegister}
          returnKeyType="send"
          blurOnSubmit
        />
        <Button title="Registar Saída" />
      </Content>
    </Container>
  );
}
