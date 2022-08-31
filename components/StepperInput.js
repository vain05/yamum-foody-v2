import React from 'react'
import { Text, View } from 'react-native'

import { IconButton } from '../components'

import { FONTS, COLORS, icons, SIZES } from '../constants'

const StepperInput = ({ containerStyle, value = 1, onAdd, onMinus }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 60,
        width: 130,
        backgroundColor: COLORS.lightGray2,
        borderRadius: SIZES.radius,
        ...containerStyle,
      }}
    >
      <IconButton
        style={{
          width: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        icon={icons.minus}
        iconStyle={{
          height: 25,
          width: 25,
          top: 12,
          left: 12,
          tintColor: value > 1 ? COLORS.primary : COLORS.gray,
        }}
        onPress={onMinus}
      />

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            ...FONTS.h2,
          }}
        >
          {value}
        </Text>
      </View>

      <IconButton
        style={{
          width: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        icon={icons.plus}
        iconStyle={{
          height: 25,
          width: 25,
          top: 12,
          right: 12,
          tintColor: COLORS.primary,
        }}
        onPress={onAdd}
      />
    </View>
  )
}

export default StepperInput
