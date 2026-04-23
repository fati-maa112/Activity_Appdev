import { Dimensions, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const CustomTextInput = ({
  placeholder,
  label,
  labelStyle,
  value,
  onChangeText,
  containerStyle,
  textStyle,
  ...props
}) => {
  const { width } = Dimensions.get('window');

  return (
    <View style={containerStyle}>
      {/* Only render label if it's a string */}
      {typeof label === 'string' && label.length > 0 ? <Text style={labelStyle}>{label}</Text> : null}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[
          textStyle,
          {
            width: width * 0.9,
            borderBottomWidth: 1,
          },
        ]}
        {...props}
      />
    </View>
  );
};

export default CustomTextInput;