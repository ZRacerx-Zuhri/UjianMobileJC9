import React, { Component } from 'react'
import {StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Button,
    Item, Input
} from 'native-base'

import Fire from '../firebase'


class DetailDiaryScreen extends Component {

    state = {
        karyawan: this.props.navigation.getParam('data_STAFFKARYAWAN'),
        edit: false,
        Name: this.props.navigation.getParam('data_STAFFKARYAWAN').Name,
        Age: this.props.navigation.getParam('data_STAFFKARYAWAN').Age,
        Position: this.props.navigation.getParam('data_STAFFKARYAWAN').Position
    }

    Delete =  () => {

        Fire.database().ref(`STAFFKARYAWAN/${this.props.uid}/${this.state.karyawan.id}`).remove()

       this.props.navigation.goBack()
    }

    onSaveButton = () => {

        Fire.database().ref(`STAFFKARYAWAN/${this.props.uid}/${this.state.karyawan.id}`)
        .update({
            Name: this.state.Name,
            Age: this.state.Age,
            Position: this.state.Position
        })

        this.props.navigation.goBack()
    }

    Edit = () => {

        this.setState({edit: true})
    }

    onCancelButton = () => {

        this.setState({edit: false})
    }

    render() {

        if(this.state.edit){

            var karyawan = this.state.karyawan

            return (
                <Container>
                        <View style={styles.container}>
                            <Text style={{fontSize: 25}}>Edit Karyawan</Text>
                            <View style={styles.wrapper}>
                                <Item rounded>
                                    <Input
                                        value = {this.state.Name}
                                        placeholder='Title'
                                        onChangeText={(text) => this.setState({Name: text})}
                                    />
                                </Item>

                                <Item rounded>
                                    <Input
                                        value = {this.state.Age}
                                        placeholder='Title'
                                        onChangeText={(Number) => this.setState({Age: Number})}
                                    />
                                </Item>

                                <Item rounded>
                                    <Input
                                        value = {this.state.Position}
                                        placeholder='Title'
                                        onChangeText={(text) => this.setState({Position: text})}
                                    />
                                </Item>

                                <View style={styles.button}>
                                    <Button block onPress={this.onSaveButton}>
                                        <Text>SAVE</Text>
                                    </Button>
                                    <Button block onPress={this.onCancelButton}>
                                        <Text>CANCEL</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                </Container>
            )

        }else{
            var karyawan = this.state.karyawan
            return (
                <Container>
                    <Content>

                        <Text style={{fontSize: 20}}>Detail Karyawan</Text>

                        <Card>
                            <CardItem>
                                <Text>Name: {karyawan.Name}</Text>
                            </CardItem>
                            <CardItem>
                                <Text>Age: {karyawan.Age}</Text>
                            </CardItem>
                            <CardItem>
                                <Text>Position: {karyawan.Position}</Text>
                            </CardItem>
                            <View style={styles.button}>
                                <Button block onPress={this.Edit}><Text>Edit</Text></Button>
                                <Button block onPress={this.Delete}><Text>Delete</Text></Button>
                            </View>
                        </Card>
                    </Content>
                </Container>
            )
        }
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    button: {
        height: 100,
        justifyContent: 'space-between',
        marginTop: 10
    }
})

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}
export default connect(mapStateToProps)(DetailDiaryScreen)