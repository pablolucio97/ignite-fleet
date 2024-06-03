import { IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useState } from "react";
import backgroundImg from "../assets/background.png";
import { Button } from "../components/Button";
import { Container, Slogan, Title } from "./styles";

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  GoogleSignin.configure({
    scopes: ["email", "profile"],
    webClientId: WEB_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
  });

  const handleSign = async () => {
    try {
      setIsAuthenticating(true);
      const authInfo = await GoogleSignin.signIn();
      console.log(authInfo)
    } catch (error) {
      console.log("Error at trying to sign in: ", error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veículos</Slogan>
      <Button
        title="Entrar com Google"
        onPress={handleSign}
        isLoading={isAuthenticating}
      />
    </Container>
  );
}
