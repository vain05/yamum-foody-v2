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
    FormInput, TextButton
} from "../../components"

const SignIn = () => {

    const [email,setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [emailError, setEmailError] = React.useState("")

    const [showPass, setShowPass] = React.useState(false)

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

                <FormInput
                    label = "Password"
                    secureTextEntry = {!showPass}
                    autoCompleteType = "password"
                    containerStyle = {{
                        marginTop: SIZES.radius
                    }}
                    onChange = {(value) => setPassword(value)}
                    appendComponent = {
                        <TouchableOpacity
                            style = {{
                                width: 40,
                                alignItems: 'flex-end',
                                justifyContent: 'center'
                            }}
                            onPress = {() => setShowPass(!showPass)}
                        >
                            <Image
                                source = {showPass ? icons.eyeclose : icons.eye}
                                style = {{
                                    height: 20,
                                    width: 20,
                                    tintColor: COLORS.gray
                                }}
                            />
                        </TouchableOpacity>
                    }
                />


                {/* Save me and I forgor 💀 */}
                
                {/* Sign in */}
                <TextButton
                    label = "Sign in"
                    buttonContainerStyle = {{
                        height: 55,
                        alignItems: 'center',
                        marginTop: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.primary
                    }}
                />

                {/* Sign up */}
            </View>
        </AuthLayout>
    )
}