import {
  LocationAccuracy,
  LocationObjectCoords,
  LocationSubscription,
  useForegroundPermissions,
  watchPositionAsync,
} from "expo-location";
import { CarSimple } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { LicensePlateInput } from "../../components/LicensePlate";
import { Loading } from "../../components/Loading";
import { LocationInfo } from "../../components/LocationInfo";
import { Map } from "../../components/Maps";
import { TextAreaInput } from "../../components/TextAreaInput";
import { getAddressLocation } from "../../utils/getAddressLocation";
import { licensePlateValidate } from "../../utils/licensePlateValidate";
import { Container, Content, Message } from "./styles";

export function Departure() {
  const [description, setDescription] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [currentCoords, setCurrentCoords] =
    useState<LocationObjectCoords | null>(null);

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions();

  useEffect(() => {
    requestLocationForegroundPermission();
  }, []);

  useEffect(() => {
    if (!locationForegroundPermission?.granted) {
      return;
    }
    let subscription: LocationSubscription;
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: 1000,
      },
      (location) => {
        setCurrentCoords(location.coords);
        getAddressLocation(location.coords).then((address) => {
          if (address) {
            setCurrentAddress(address);
          }
        });
      }
    )
      .then((response) => (subscription = response))
      .finally(() => setIsLoadingLocation(false));
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [locationForegroundPermission?.granted]);

  if (!locationForegroundPermission?.granted) {
    return (
      <Container>
        <Header title="Saída" />
        <Message>
          Você precisa permitir que o aplicativo tenha acesso a localização para
          acessar essa funcionalidade. Por favor, acesse as configurações do seu
          dispositivo para conceder a permissão ao aplicativo.
        </Message>
      </Container>
    );
  }

  function handleDepartureRegister() {
    if (!licensePlateValidate(licensePlate)) {
      licensePlateRef.current?.focus();
      return Alert.alert(
        "Placa inválida",
        "A placa é inválida. Por favor, informa a placa correta."
      );
    }
    if (description.trim().length === 0) {
      descriptionRef.current?.focus();
      return Alert.alert(
        "Finalidade",
        "Por favor, informe a finalidade da utilização do veículo"
      );
    }
  }



  if (isLoadingLocation) {
    return <Loading />;
  }

  return (
    <Container>
      <Header title="Saída" />
      <KeyboardAwareScrollView extraHeight={300}>
        {currentCoords && (
          <Map
            coordinates={[
              { latitude: -19.8240113, longitude: -43.1652822 },
              { latitude: -19.8228286, longitude: -43.1646838 },
              { latitude: -19.8270273, longitude: -43.1623234 },
            ]}
          />
        )}
        <ScrollView>
          <Content>
            {currentAddress && (
              <LocationInfo
                icon={CarSimple}
                label="Localização atual"
                description={currentAddress}
              />
            )}
            <LicensePlateInput
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
              onChangeText={setLicensePlate}
            />
            <TextAreaInput
              ref={descriptionRef}
              label="Finalizade"
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              blurOnSubmit
              onChangeText={setDescription}
            />
            <Button title="Registar Saída" onPress={handleDepartureRegister} />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
}
