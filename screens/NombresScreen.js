import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';

export default function NombresScreen() {
  const [nombreActual, setNombreActual] = useState('');
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(false);

  const generarNombre = async () => {
    setCargando(true);
    try {
      // la api tiene 208 usuarios, elegimos uno random
      const skip = Math.floor(Math.random() * 208);
      const respuesta = await fetch(
        `https://dummyjson.com/users?limit=1&skip=${skip}`
      );
      const datos = await respuesta.json();

      if (datos.users && datos.users.length > 0) {
        const usuario = datos.users[0];
        const nombre = `${usuario.firstName} ${usuario.lastName}`;
        setNombreActual(nombre);
        setHistorial((prev) => [
          { id: Date.now().toString(), nombre },
          ...prev,
        ]);
      }
    } catch (error) {
      console.log('Error: No se pudo obtener un nombre. Verifica tu conexión.');
    } finally {
      setCargando(false);
    }
  };

  const limpiarHistorial = () => {
    setHistorial([]);
    setNombreActual('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Generador de Nombres</Text>

      <View style={styles.tarjetaNombre}>
        {cargando ? (
          <ActivityIndicator size="large" color="#6c63ff" />
        ) : (
          <Text style={styles.nombreMostrado}>
            {nombreActual || 'Presiona el botón para generar'}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.botonGenerar, cargando && styles.botonDeshabilitado]}
        onPress={generarNombre}
        disabled={cargando}
      >
        <Text style={styles.textoBoton}>
          {cargando ? 'Cargando...' : 'Generar Nombre'}
        </Text>
      </TouchableOpacity>

      {historial.length > 0 && (
        <View style={styles.historialContainer}>
          <View style={styles.historialHeader}>
            <Text style={styles.historialTitulo}>
              Historial ({historial.length})
            </Text>
            <TouchableOpacity onPress={limpiarHistorial}>
              <Text style={styles.limpiarTexto}>Limpiar</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={historial}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View style={styles.itemHistorial}>
                <Text style={styles.numeroHistorial}>{index + 1}.</Text>
                <Text style={styles.textoHistorial}>{item.nombre}</Text>
              </View>
            )}
            style={styles.lista}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7',
    padding: 20,
    paddingTop: 50,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 25,
  },
  tarjetaNombre: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  nombreMostrado: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6c63ff',
    textAlign: 'center',
  },
  botonGenerar: {
    backgroundColor: '#6c63ff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 25,
  },
  botonDeshabilitado: {
    backgroundColor: '#aaa',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  historialContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  historialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  historialTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  limpiarTexto: {
    color: '#e74c3c',
    fontSize: 14,
  },
  lista: {
    flex: 1,
  },
  itemHistorial: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  numeroHistorial: {
    color: '#999',
    marginRight: 8,
    fontSize: 15,
  },
  textoHistorial: {
    color: '#333',
    fontSize: 15,
  },
});
