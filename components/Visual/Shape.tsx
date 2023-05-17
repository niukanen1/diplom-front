import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface ShapeProps {
  color: string;
  svgPath: string;
  width: number | string;
  height: number | string;
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
}

const Shape = ({ color, svgPath, width, height, top = 0, bottom = undefined, right = undefined, left = 0 }: ShapeProps) => {
  const positionStyle: ViewStyle = {
    position: 'absolute',
    top: bottom !== undefined ? undefined : top,
    bottom: bottom !== undefined ? bottom : undefined,
    right: right !== undefined ? right : undefined,
    left: right !== undefined ? undefined : left,
    width,
    height,
  };

  return (
    <View style={[styles.container, positionStyle]}>
      <Svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        <Path d={svgPath} fill={color} />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Shape;
