import { ThemeProvider } from 'styled-components/native';
import { SignIn } from './src/screens/SignIn';
import theme from './src/theme';
import { Loading } from './src/components/Loading'
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'
import { StatusBar } from 'expo-status-bar'

export default function App() {

  const [fontLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  if (!fontLoaded) {
    return (<Loading />)
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        style='light'
        translucent
        backgroundColor='transparent'
      />
      <SignIn />
    </ThemeProvider>
  );
}
