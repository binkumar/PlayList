import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

class HorizontalScroll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0
        };
    }

    onSnapToItem(slideIndex) {
        this.setState({ activeSlide: slideIndex });
        if (this.props.onSnapToItem) {
            this.props.onSnapToItem(slideIndex);
        }
    }

    getPagination() {
        const { activeSlide } = this.state;
        const { data } = this.props;
        return (
            <Pagination
                dotsLength={data.length}
                activeDotIndex={activeSlide}
                containerStyle={horizontalScrollStyles.containerStyle}
                dotContainerStyle={horizontalScrollStyles.dotContainerStyle}
                dotStyle={horizontalScrollStyles.dotStyle}
                inactiveDotStyle={horizontalScrollStyles.inactiveDotStyle}
                inactiveDotOpacity={1}
                inactiveDotScale={1}
                carouselRef={this.carousel}
                tappableDots={!!this.carousel}
            />
        );
    }

    renderItem({ item, index }) {
        if (this.props.renderItem) {
            this.props.renderItem(item, index);
        }
    }

    render() {
        const {
            data,
            renderItem,
            sliderWidth,
            itemWidth,
            marginRight,
            paginationEnabled
        } = this.props;
        return (
            <View>
                <Carousel
                    ref={carousel => (this.carousel = carousel)}
                    activeSlideAlignment={'start'}
                    data={data}
                    renderItem={renderItem}
                    sliderWidth={sliderWidth}
                    bounces
                    overScrollMode={'always'}
                    itemWidth={itemWidth}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    onSnapToItem={this.onSnapToItem.bind(this)}
                    peekEnabled
                    slideStyle={{
                        marginRight
                    }}
                    containerCustomStyle={
                        horizontalScrollStyles.containerCustomStyle
                    }
                />
                {paginationEnabled && this.getPagination()}
            </View>
        );
    }
}

const horizontalScrollStyles = StyleSheet.create({
    containerCustomStyle: {
        marginLeft: 0
    },
    dotStyle: {
        width: 15,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 0,
        backgroundColor: 'gray'
    },
    inactiveDotStyle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 0,
        backgroundColor: 'gray'
    },
    containerStyle: {
        marginTop: 5.5,
        marginBottom: 6,
        height: 20,
        paddingVertical: 0
    },
    dotContainerStyle: {
        marginHorizontal: 2.5
    }
});


export default HorizontalScroll;
