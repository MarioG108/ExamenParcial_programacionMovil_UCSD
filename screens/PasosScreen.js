import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const META_DIARIA = 10000;

export default function PasosScreen() {
  const [pasos, setPasos] = useState(0);

  const sumarPasos = (cantidad) => {
    setPasos((prev) => prev + cantidad);
  };

 

  const porcentaje = Math.min((pasos / META_DIARIA) * 100, 100);

  const obtenerMensaje = () => {
    if (pasos === 0) return 'Empieza a caminar!';
    if (pasos < 2000) return 'Buen comienzo!';
    if (pasos < 5000) return 'Vas muy bien!';
    if (pasos < META_DIARIA) return 'Casi llegas a la meta!';
    return 'Meta diaria alcanzada!';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contador de Pasos</Text>

      <View style={styles.circuloContainer}>
        <View style={styles.circulo}>
          <Text style={styles.numeroPasos}>{pasos.toLocaleString()}</Text>
          <Text style={styles.labelPasos}>pasos</Text>
        </View>
      </View>

      <Text style={styles.mensaje}>{obtenerMensaje()}</Text>


      <View style={styles.botonesSumar}>
        <TouchableOpacity
          style={[styles.botonSumar, styles.botonPequeno]}
          onPress={() => sumarPasos(1)}
        >
          <Text style={styles.textoBoton}>+1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botonSumar, styles.botonMediano]}
          onPress={() => sumarPasos(10)}
        >
          <Text style={styles.textoBoton}>+10</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botonSumar, styles.botonGrande]}
          onPress={() => sumarPasos(100)}
        >
          <Text style={styles.textoBoton}>+100</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botonReiniciar} onPress={() => setPasos(0)}>
        <Text style={styles.textoReiniciar}>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 30,
  },
  circuloContainer: {
    marginBottom: 20,
  },
  circulo: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  numeroPasos: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
  },
  labelPasos: {
    fontSize: 16,
    color: '#e8f5e9',
  },
  mensaje: {
    fontSize: 18,
    color: '#388e3c',
    fontWeight: '600',
    marginBottom: 20,
  },

  botonesSumar: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  botonSumar: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
  },
  botonPequeno: {
    width: 80,
    backgroundColor: '#81c784',
  },
  botonMediano: {
    width: 90,
    backgroundColor: '#4caf50',
  },
  botonGrande: {
    width: 100,
    backgroundColor: '#2e7d32',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  botonReiniciar: {
    backgroundColor: '#ef5350',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  textoReiniciar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
