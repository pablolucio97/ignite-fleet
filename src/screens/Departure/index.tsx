import { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { LicensePlateInput } from "../../components/LicensePlate";
import { TextAreaInput } from "../../components/TextAreaInput";
import { licensePlateValidate } from "../../utils/licensePlateValidate";
import { Container, Content } from "./styles";

export function Departure() {
  const [description, setDescription] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  const descriptionRefInput = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);
  const keyboardAvoidingViewBehavior =
    Platform.OS === "android" ? "height" : "position";

  function handleDepartureRegister() {
    if (!licensePlateValidate(licensePlate)) {
      licensePlateRef.current?.focus();
      return Alert.alert(
        "Placa inválida",
        "A placa é inválida. Por favor, informa a placa correta."
      );
    }
  }

  return (
    <Container>
      <Header title="Saída" />
      <KeyboardAvoidingView
        behavior={keyboardAvoidingViewBehavior}
      >
        <ScrollView>
          <Content>
            <LicensePlateInput
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRefInput.current?.focus()}
              returnKeyType="next"
              onChangeText={setLicensePlate}
            />
            <TextAreaInput
              ref={descriptionRefInput}
              label="Finalizade"
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              blurOnSubmit
              onChangeText={setDescription}
            />
            <Button title="Registar Saída" onPress={handleDepartureRegister}/>
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
