import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native';

export default function ListCell({ data, onPress }) {
  console.log("ListCell", data)
  return (
    <TouchableHighlight onPress={() => onPress(data)} style={styles.container}>
      <View style={{
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        height: 250,
        width: 200

      }}>
        <Image
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
          source={{ uri: data.item[`im:image`][2].label }}
        />
        <Text
          numberOfLines={2}
          style={{ color: 'white', fontSize: 12, marginTop: 5, marginHorizontal: 5, fontWeight: "bold", }}>
          {data.item.title.label}
        </Text>
        <Text style={{ color: 'white', fontSize: 10, marginTop: 5 }}>
          {`${data.item[`im:price`].label}  ${data.item[`im:releaseDate`].attributes.label}`}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    margin: 5,
    // backgroundColor: 'white',
    // borderColor: 'grey',
    borderRadius: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
});
