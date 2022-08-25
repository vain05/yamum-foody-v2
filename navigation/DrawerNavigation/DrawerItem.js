import React from "react";

import {
  Text,
  Image,
  TouchableOpacity
} from "react-native";

import {
  COLORS,
  FONTS,
  SIZES,
} from "../../constants"

const DrawerItem = ({ label, icon, isFocused, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 40,
        marginBottom: SIZES.base,
        alignItems: 'center',
        paddingLeft: SIZES.radius,
        borderRadius: SIZES.base,
        backgroundColor: isFocused ? COLORS.transparentBlack1 : null
      }}

      onPress={onPress}
    >
      <Image
        source={icon}
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.white
        }}
      />
      
      <Text 
        style={{
          marginLeft: 15,
          color: COLORS.white,
          ...FONTS.h3
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default DrawerItem;
