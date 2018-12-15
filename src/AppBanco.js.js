import React, { Component } from 'react';
import {ToastAndroid, Button, StyleSheet, Text, TextInput, Picker, View,
        Switch, CheckBox, Slider} from 'react-native';
export default class AppBanco extends Component {
    constructor(props) {
        super(props);
        this.state = {
			email: '',
			cuit: '',
            moneda: 1,
            capitalInicial: 0.00,
            capitalFinal: 0.00,
			dias: 10,
			condiciones: false,
			tasa: 0.0,
			intereses: 0.00,
			
        };
		rtdo="";
       this.hacerPlazoFijo = this.hacerPlazoFijo.bind(this);
	   this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }
	
	forceUpdateHandler(){
		this.forceUpdate();
	}
	
    hacerPlazoFijo() {
		if(this.state.email== '' || this.state.cuit=='' || this.state.capitalInicial==''){
			alert("Error\nComplete todos los campos");
		}else{
			if(this.state.condiciones){
				rtdo="Capital Inicial: "+this.state.capitalInicial+"\nIntereses: "+this.state.intereses+"\nDias: "+this.state.dias;
				if(this.state.moneda==1) rtdo=rtdo+"\nMoneda: Dolar";
				else rtdo=rtdo+"\nMoneda: Pesos ARS";
				this.forceUpdateHandler();
				ToastAndroid.show('Plazo fijo exitoso', ToastAndroid.LONG);
			}else{
				rtdo="";
				this.forceUpdateHandler();
				alert("Error\nDebe aceptar los terminos y condiciones");
			}
		}
    }
	
	calcularTasa(){
		if(this.state.dias<30 && this.state.capitalInicial<=5000){
				this.setState({tasa: 25.0});
			}
			else if(this.state.dias>=30 && this.state.capitalInicial<=5000){
				this.setState({tasa: 27.5});
			}
			else if(this.state.dias<30 && this.state.capitalInicial>5000 && this.state.capitalInicial<=99999){
				this.setState({tasa: 30.0});
			}
			else if(this.state.dias>=30 &&  this.state.capitalInicial>5000 && this.state.capitalInicial<=99999){
				this.setState({tasa: 32.3});
			}else if(this.state.dias<30 &&  this.state.capitalInicial>99999) {
				this.setState({tasa: 35.0});
			} else this.setState({tasa: 38.5});
	}
	
	intereses(){
		this.setState({intereses: (this.state.capitalInicial*( Math.pow(1+this.state.tasa/100,this.state.dias/360)-1)).toFixed(2)});
		this.setState({capitalFinal:(Number(this.state.capitalInicial) + Number(this.state.intereses))});
	}
	
	actualizarDatos(valor){
		this.setState({ dias: Math.round(Number(valor))});
		this.calcularTasa();
		this.intereses();
	}
	
	
    render() {
        return (
            <View style={styles.container}>
                <Text>Correo Electronico</Text>
                <TextInput
				style=
				{{
				height: 35,width:200, borderColor: 'gray', borderWidth: 1
				}}
				keyboardType="email-address"
				onChangeText={(valor) => this.setState({email: valor})}
				></TextInput>
                <Text>CUIT</Text>
                <TextInput
				style=
				{{
				height: 35,width:200, borderColor: 'gray', borderWidth: 1
				}}
				keyboardType="numeric"
				onChangeText={(valor) => this.setState({cuit: valor})}
				></TextInput>
                <Text>Moneda</Text>
                <Picker
                    style={{ width: 200 }}
                    selectedValue={this.state.moneda}
                    onValueChange={(valor) => this.setState({ moneda: valor })}>
                    <Picker.Item label="Dolar" value="1" />
                    <Picker.Item label="Pesos ARS" value="2" />
                </Picker>
                <Text>Monto</Text>
                <TextInput
				style=
				{{
				height: 35,width:200, borderColor: 'gray', borderWidth: 1
				}}
				keyboardType="decimal-pad"
				onChangeText={(valor) => this.setState({capitalInicial: Number(valor)})}>
				</TextInput>
                <Text>Dias</Text>
                <Slider
					maximumValue={180}
					minimumValue={10}
					style={{ width: 350 }}
					onValueChange={(valor) => this.actualizarDatos(valor)}>
				</Slider>
                <Text>{this.state.dias} dias</Text>
				<Text>${this.state.intereses}</Text>
				<Text>Avisar por mail</Text>
                <Switch></Switch>
                <Text>Aceptar Terminos y Condiciones</Text>
                <CheckBox
				value={this.state.condiciones}
				title='Acepto condiciones'
				onChange={() => this.setState({ condiciones: !this.state.condiciones })}/>
                <Button title="Hacer Plazo Fijo"
                    color="#FF0000"
                    onPress={this.hacerPlazoFijo}>
                </Button>
				<Text>{rtdo}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});