import React, { useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Image
} from "react-native";

const DetailModelScreen = ({ data, onClose }) => {

    const { item } = data;
    const detailsContainer = () => (
        <View style={styles.modalView}>
            <View style={{
                flex: 1,
                padding: 5,
                justifyContent: 'flex-start'

            }}>
                <Image
                    style={{ width: 200, height: 200, alignSelf: 'center' }}
                    resizeMode="contain"
                    source={{ uri: item[`im:image`][2].label }}
                />
                <Text style={{ color: 'white', fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>
                    Title:
                    </Text>
                <Text style={{ color: 'white', fontSize: 14, marginTop: 5 }}>
                    {item.title.label}
                </Text>
                <Text style={{ color: 'white', fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>
                    Category:
                    </Text>
                <Text style={{ color: 'white', fontSize: 14, marginTop: 5 }}>
                    {item.category.attributes.label}
                </Text>
                <Text style={{ color: 'white', fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>
                    Price:
                    </Text>
                <Text style={{ color: 'white', fontSize: 14, marginTop: 5 }}>
                    {item[`im:price`].label}
                </Text>
                <Text style={{ color: 'white', fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>
                    Artist:
                    </Text>
                <Text style={{ color: 'white', fontSize: 14, marginTop: 5 }}>
                    {item[`im:artist`].label}
                </Text>
                <Text style={{ color: 'white', fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>
                    Name:
                    </Text>
                <Text style={{ color: 'white', fontSize: 14, marginTop: 5 }}>
                    {item[`im:name`].label}
                </Text>
                <Text style={{ color: 'white', fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>
                    Release Date:
                    </Text>
                <Text style={{ color: 'white', fontSize: 14, marginTop: 5 }}>
                    {item[`im:releaseDate`].attributes.label}
                </Text>
                <Text style={{ color: 'white', fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>
                    Rights:
                    </Text>
                <Text style={{ color: 'white', fontSize: 14, marginTop: 5 }}>
                    {item.rights.label}
                </Text>
            </View>
        </View>
    )
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => {
                            onClose();
                        }}
                    >
                        <Text style={styles.textStyle}>X</Text>
                    </TouchableHighlight>
                    {detailsContainer()}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        marginTop: 44,
        backgroundColor: '#7E7C7C'
    },
    modalView: {
        marginHorizontal: 15,
        // marginBottom: 50,
        marginTop: 5,
        flex: 0.9,
        backgroundColor: "black",
        borderRadius: 20,
        padding: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        height: 35,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginLeft: 15,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default DetailModelScreen;
