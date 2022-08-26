import React from "react";
import {
    View,
    Text,
    TextInput
} from "react-native";

import {
    FONTS,
    COLORS,
    SIZES
} from "../../constants";

const FormInput = ({
    containerStyle,
    label,
    placeholder,
    inputStyle,
    prependComponent,
    appendComponent,
    onChange,
    secureTextEntry,
    keyboardType = "default",
    autoCompleteType = "off",
    autoCapitalize = "none",
    errorMsg = ""
}) => {
    return (
        <View
            style = {{
                ...containerStyle
            }}
        >
            {/* Label Error */}
                <View>
                    
                </View>
            {/* Text input */}
        </View>
    )
}

export default FormInput;