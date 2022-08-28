import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from "react-native"

import {AuthLayout} from "../"

import {
    FONTS,
    COLORS,
    SIZES,
    icons
} from constants

import {
    FormInput
} from "../../components"

const SignIn = () => {

    const [email,setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [emailError, setEmailError] = React.useState("")

    return (
        <AuthLayout
            title = "Let's Sign You In"
            subtitle = "Welcome back, you've been missed"
        >
            <View
                style = {{
                    flex: 1,
                    marginTop: SIZES.padding*2
                }}
            >
                {/* FormInput */}
                <FormInput
                    label = "Email"
                    keyboardType = "email-address"
                    autoCompleteType = "email"
                    onChange={(value) =>{
                        setEmail(value)
                    }}
                    errorMsg = {emailError}
                    appendComponent = {
                        <View
                            style = {{
                                justifyContent: 'center',
                                
                            }}
                        > 
                            <Image
                            style = {{
                                
                            }}
                            />
                                

                        </View>
                    }
                />
                {/* Save me and I forgor 💀 */}
                
                {/* Sign in */}

                {/* Sign up */}
            </View>
        </AuthLayout>
    )
}