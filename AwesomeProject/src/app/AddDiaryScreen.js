import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {Container, Text, Textarea, Button, Item, Input} from 'native-base'

import Fire from '../firebase'

class addKaryawan extends Component {

    state = {
        Name: "",
        Age: 0,
        Position: ""
    }

    ADDKaryawan = async () => {
        await Fire.database().ref(`STAFFKARYAWAN/${this.props.uid}`)
        .push({
            Name : this.state.Name,
            Age: this.state.Age,
            Position: this.state.Position
        })


        this.props.navigation.goBack()
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Text style={{fontSize: 15}}>ADD Karyawan</Text>
                    <View style={styles.wrapp}>

                        <Item rounded>
                            <Input
                                placeholder='Name'
                                onChangeText={(text) => this.setState({Name: text})}
                            />
                        </Item>

                        <Item rounded>
                            <Input
                                placeholder='Age'
                                onChangeText={(Number) => this.setState({Age: Number})}
                            />
                        </Item>

                        <Item rounded>
                            <Input
                                placeholder='Position'
                                onChangeText={(text) => this.setState({Position: text})}
                            />
                        </Item>

                        <View style={styles.button}>
                            <Button block onPress={this.ADDKaryawan}>
                                <Text>Add Karyawan</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    wrapp: {
        width: '90%',
        marginTop: 20
    },
    button: {
        marginTop: "10%",
        width: "100%",

    }
})

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(addKaryawan)