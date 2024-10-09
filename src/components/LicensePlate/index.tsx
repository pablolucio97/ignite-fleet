import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { Container, Input, Label } from "./styles";
type Props = TextInputProps & {
  label: string;
};
const LicensePlateInput = forwardRef<TextInput, Props>(
  ({ label, ...rest }: Props) => {
    const { COLORS } = useTheme();
    return (
      <Container>
        <Label>{label}</Label>
        <Input
          maxLength={7}
          autoCapitalize="characters"
          placeholderTextColor={COLORS.GRAY_400}
          {...rest}
        />
      </Container>
    );
  }
);
export { LicensePlateInput };
