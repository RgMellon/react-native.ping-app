import { TextInput, TextInputProps } from "react-native";

type Props = {
    placeholder: string
} & TextInputProps;
export function PingInput({placeholder, ...props}: Props) {
   return <TextInput placeholder={placeholder}
                     className="border border-ping-gray p-2 h-12 mt-10 border-solid w-full rounded-md" 
                    {...props} />
}