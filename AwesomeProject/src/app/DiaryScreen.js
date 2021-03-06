import React, { Component } from 'react'
import {View, BackHandler, StyleSheet, FlatList, ScrollView} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import {connect} from 'react-redux'
import {Button, Text, Container} from 'native-base'

import ListDiary from './components/ListDiary'

import Fire from '../firebase'

import {onLogout} from '../store/actions'


class DiaryScreen extends Component {

    state = {
        snapShot: {}
    }

    onPressLogout = async () => {
        // Logout dari firebase
        await Fire.auth().signOut()
        // Logout dari redux
        this.props.onLogout()

        // kembali ke halaman auth
        this.props.navigation.navigate('Auth')
    }

    onBackButton = () => {
        alert('Tombol back di tekan')

        return true
    }

    onAddDiary = () => {
        this.props.navigation.navigate('AddDiary')
    }

    getData = () => {
        // Get data
        Fire.database().ref(`STAFFKARYAWAN/${this.props.uid}`)
        .once('value', (snapShot) => {

            if(snapShot.exists()){
                this.setState({snapShot: snapShot.val()})
            }
        })
    }

    renderList = () => {
        // array of id dari setiap diary
        let keysDiary = Object.keys(this.state.snapShot)
        let listDiary = []

        // key : id dari diary
        keysDiary.forEach((key) => {
            listDiary.push({
                Name : this.state.snapShot[key].Name,
                Age : this.state.snapShot[key].Age,
                Position : this.state.snapShot[key].Position,
                id: key
            })
        })



        return <FlatList
                    keyExtractor = {(val) => val.id}
                    style = {styles.flaslist}
                    data={listDiary}
                    renderItem ={(asd)=>{
                        return <ListDiary data={asd} key={asd.id}/>
                    }}
                />
    }

    render() {
        return (
            <Container>
                <NavigationEvents
                    // ComponentDidMount
                    onDidFocus = {() => {
                        // non aktifkan tombol back pada device
                        BackHandler.addEventListener('hardwareBackPress', this.onBackButton)
                        // get semua diary milik user
                        this.getData()
                    }}

                    // ComponentWillUnmount
                    onWillBlur = {() => {
                        BackHandler.removeEventListener('hardwareBackPress', this.onBackButton)
                    }}
                />

                <View style={styles.container}>
                    <Text>List Karyawan Screen</Text>

                    <Button onPress ={this.onPressLogout}>
                        <Text>Logout</Text>
                    </Button>


                    {this.renderList()}

                    <View style={styles.button}>
                        <Button onPress={this.onAddDiary}>
                            <Text>Add Karyawan</Text>
                        </Button>
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginVertical: 20
    },
    flaslist: {
        alignSelf: 'stretch'
    }
})

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps, {onLogout})(DiaryScreen)