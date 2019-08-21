import React, { Component } from 'react'
import {View,TouchableOpacity, StyleSheet} from 'react-native'
import {Text} from 'native-base'
import {withNavigation} from 'react-navigation'

class ListDiary extends Component {
    touchable = () => {

        this.props.navigation.navigate('DetailDiary', {data_STAFFKARYAWAN:this.props.data.item})
    }

    render() {
        return(
            <TouchableOpacity onPress={this.touchable}>
                <View style={styles.list}>
                    <Text>{this.props.data.item.Name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'green',
        padding : 10,
        marginVertical: 5,
    }
})

export default withNavigation(ListDiary)