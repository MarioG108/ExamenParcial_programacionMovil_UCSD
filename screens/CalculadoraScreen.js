import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function CalculadoraScreen() {
  const [pantalla, setPantalla] = useState('0');
  const [primerNumero, setPrimerNumero] = useState('');
  const [operacion, setOperacion] = useState('');
  const [esperandoSegundo, setEsperandoSegundo] = useState(false);

  const presionarNumero = (num) => {
    if (esperandoSegundo) {
      setPantalla(String(num));
      setEsperandoSegundo(false);
    } else {
      if (pantalla === '0') {
        setPantalla(String(num));
      } else {
        setPantalla(pantalla + String(num));
      }
    }
  };

  const presionarOperacion = (op) => {
    setPrimerNumero(pantalla);
    setOperacion(op);
    setEsperandoSegundo(true);
  };

  const calcularResultado = () => {
    if (!primerNumero || !operacion) return;

    const num1 = parseFloat(primerNumero);
    const num2 = parseFloat(pantalla);
    let resultado = 0;

    if (operacion === '+') resultado = num1 + num2;
    else if (operacion === '-') resultado = num1 - num2;
    else if (operacion === '*') resultado = num1 * num2;
    else if (operacion === '/') {
      if (num2 === 0) {
        Alert.alert('Error', 'No se puede dividir entre cero!');
        limpiar();
        return;
      }
      resultado = num1 / num2;
    }

    // evitar decimales muy largos
    const resultadoFinal = parseFloat(resultado.toFixed(6));
    setPantalla(String(resultadoFinal));
    setPrimerNumero('');
    setOperacion('');
    setEsperandoSegundo(false);
  };

  const limpiar = () => {
    setPantalla('0');
    setPrimerNumero('');
    setOperacion('');
    setEsperandoSegundo(false);
  };

  const Boton = ({ texto, onPress, esOperacion, esIgual, esLimpiar }) => (
    <TouchableOpacity
      style={[
        styles.boton,
        esOperacion && styles.botonOperacion,
        esIgual && styles.botonIgual,
        esLimpiar && styles.botonLimpiar,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.textoBoton, (esIgual || esLimpiar) && styles.textoBlanco]}>
        {texto}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora</Text>

      <View style={styles.pantalla}>
        {primerNumero !== '' && (
          <Text style={styles.operacionActual}>
            {primerNumero} {operacion}
          </Text>
        )}
        <Text style={styles.numeroPantalla} numberOfLines={1} adjustsFontSizeToFit>
          {pantalla}
        </Text>
      </View>

      <View style={styles.botones}>
        <View style={styles.fila}>
          <Boton texto="C" onPress={limpiar} esLimpiar />
          <View style={{ width: 70 }} />
          <View style={{ width: 70 }} />
          <Boton texto="÷" onPress={() => presionarOperacion('/')} esOperacion />
        </View>
        <View style={styles.fila}>
          <Boton texto="7" onPress={() => presionarNumero('7')} />
          <Boton texto="8" onPress={() => presionarNumero('8')} />
          <Boton texto="9" onPress={() => presionarNumero('9')} />
          <Boton texto="×" onPress={() => presionarOperacion('*')} esOperacion />
        </View>
        <View style={styles.fila}>
          <Boton texto="4" onPress={() => presionarNumero('4')} />
          <Boton texto="5" onPress={() => presionarNumero('5')} />
          <Boton texto="6" onPress={() => presionarNumero('6')} />
          <Boton texto="-" onPress={() => presionarOperacion('-')} esOperacion />
        </View>
        <View style={styles.fila}>
          <Boton texto="1" onPress={() => presionarNumero('1')} />
          <Boton texto="2" onPress={() => presionarNumero('2')} />
          <Boton texto="3" onPress={() => presionarNumero('3')} />
          <Boton texto="+" onPress={() => presionarOperacion('+')} esOperacion />
        </View>
        <View style={styles.fila}>
          <Boton texto="0" onPress={() => presionarNumero('0')} />
          <Boton texto="." onPress={() => {
            if (!pantalla.includes('.')) {
              setPantalla(pantalla + '.');
            }
          }} />
          <View style={{ width: 70 }} />
          <Boton texto="=" onPress={calcularResultado} esIgual />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
    justifyContent: 'flex-end',
  },
  titulo: {
    color: '#e0e0e0',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
  },
  pantalla: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    minHeight: 100,
    justifyContent: 'flex-end',
  },
  operacionActual: {
    color: '#888',
    fontSize: 18,
    textAlign: 'right',
  },
  numeroPantalla: {
    color: '#ffffff',
    fontSize: 50,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  botones: {
    gap: 10,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  boton: {
    width: 70,
    height: 70,
    backgroundColor: '#0f3460',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonOperacion: {
    backgroundColor: '#e94560',
  },
  botonIgual: {
    backgroundColor: '#4ade80',
  },
  botonLimpiar: {
    backgroundColor: '#f97316',
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  textoBlanco: {
    color: '#ffffff',
  },
});
