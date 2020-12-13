import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Image, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';

import HamburgerMenu from './Component/HamburgerMenu';
import ListCell from './Component/ListCell';
import { queryDB } from '../RealmDB';
import DetailModelScreen from './DetailModelScreen';
import HorizontalScroll from './Component/HorizontalView';
import { apiKeys } from '../Redux/Actions/Helper/apiKeys';
import * as actions from '../Redux/Actions';
import { getFilteredAlbum } from '../Redux/Selectors/getAlbums';

const mockData = {};
const horizontalMargin = 10;
const cardWidth = 200;
class ListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            orginalMockData: mockData,
            tableDataSource: mockData,
            isLoading: false,
            isModelVisible: false,
            selectedItem: null
        };
        this.searchData = this.searchData.bind(
            this
        );
        this.searchData = debounce(
            this.searchData,
            500
        );
    }

    componentDidMount() {
        this.props.fetchContent(apiKeys.topalbums)
    }

    searchData = (text) => {
        const query = 'name CONTAINS[c] ' + "\"" + text + "\"" + " OR locality CONTAINS[c] " + "\"" + text + "\"";
        queryDB(query)
            .then(data => {
                console.log(data)
                this.setState({ tableDataSource: data, isLoading: false });
            })
            .catch(error => {
                this.setState({ tableDataSource: null, isLoading: false });
                console.log(error);
            });
    }

    createSearchView() {
        return (
            <View
                style={styles.searchView}>
                <Image
                    style={{ flex: 0.2, height: 20, width: 20 }}
                    resizeMode="contain"
                    source={require('../Resources/search.png')}
                />
                <TextInput
                    style={{ height: 35, flex: 1, backgroundColor: 'white' }}
                    autoFocus={true}
                    clearTextOnFocus={false}
                    placeholderTextColor={'grey'}
                    placeholder={'Search here'}
                    underlineColorAndroid="transparent"
                    value={this.state.searchText}
                    onChangeText={text => {
                        if (text === '') {
                            this.setState({ searchText: text, tableDataSource: this.state.orginalMockData });
                        } else {
                            this.setState({ searchText: text, isLoading: true }, () => {
                                this.searchData(text);
                            });
                        }
                    }}
                />
            </View>
        );
    }

    openDetailView = () => (
        <DetailModelScreen
            data={this.state.selectedItem}
            onClose={() => this.setState({ isModelVisible: false, selectedItem: null })}
        />
    );

    tableData = () => {
        const { album_list } = this.props;
        let tableList = []
        if (album_list && album_list.entry && album_list.entry.length > 0) {
            let categories = []
            album_list.entry.forEach((value, index) => {
                if (categories.indexOf(value.category.attributes.label) === -1) {
                    categories.push(value.category.attributes.label);
                }

            });
            categories.map(cat => {
                const Cat_Christmas_Data = getFilteredAlbum(album_list.entry, cat);
                console.log("Cat_Christmas_Data", Cat_Christmas_Data)
                if (Cat_Christmas_Data) tableList.push({ cat: cat, data: Cat_Christmas_Data })
            })
        }
        console.log("tableData", tableList)
        return tableList;
    }

    render() {
        const tableData1 = this.tableData();
        const deviceWidth = Dimensions.get('window').width;
        return (
            <View style={styles.container}>
                <HamburgerMenu
                    screenTitle={'List'}
                    onMenuPress={() => this.props.navigation.openDrawer()} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
                    style={{ flex: 1, marginHorizontal: 10 }}>
                    {this.createSearchView()}
                    {this.state.isLoading && <ActivityIndicator color='black' size='large' />}
                    {tableData1.map(item =>
                        <View style={{ flex: 1, marginVertical: 5, }}>
                            <Text style={{ marginLeft: 10, color: 'white', fontSize: 18, fontWeight: "bold" }}>
                                {`${item.cat} (${item.data.length})`}
                            </Text>
                            <HorizontalScroll
                                data={item.data}
                                renderItem={val => (
                                    <ListCell
                                        data={val}
                                        onPress={data => {
                                            this.setState({ isModelVisible: true, selectedItem: data })
                                        }}
                                    />
                                )}
                                sliderWidth={deviceWidth}
                                itemWidth={cardWidth + horizontalMargin}
                            // paginationEnabled
                            />
                        </View>
                    )}

                </ScrollView>
                {this.state.isModelVisible && this.openDetailView()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7E7C7C',
    },
    mainContainer: {
        flex: 1,
        margin: 5,
        backgroundColor: 'white'
    },
    searchView: {
        height: 40,
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
    }
});

function mapStateToProps(state) {
    const { album_list } = state;
    return {
        album_list: album_list && album_list.data ? album_list.data : [],
    };
}

export default connect(
    mapStateToProps,
    actions,
)(ListScreen);
