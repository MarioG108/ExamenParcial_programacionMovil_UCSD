import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FRASES = [
  {
    frase: '¡Voy a ser el Rey de los Piratas!',
    personaje: 'Monkey D. Luffy',
  },
  {
    frase: 'Si me pides que me rinda, no lo haré. Si me pides que me rinda, te venceré.',
    personaje: 'Roronoa Zoro',
  },
  {
    frase: 'Las personas mueren cuando son olvidadas. Eso es lo que creo.',
    personaje: 'Dr. Hiluluk',
  },
  {
    frase: 'No importa cuántos obstáculos haya, encontraré el camino.',
    personaje: 'Monkey D. Luffy',
  },
  {
    frase: 'Un hombre no vive su vida mirando atrás con arrepentimientos.',
    personaje: 'Roronoa Zoro',
  },
  {
    frase: 'Nada ha pasado todavía.',
    personaje: 'Roronoa Zoro',
  },
  {
    frase: 'Cuando el mundo entero te dé la espalda, ¡da media vuelta y enfrenta el mundo!',
    personaje: 'Perona',
  },
  {
    frase: 'Solo porque alguien sea fuerte no significa que tenga razón.',
    personaje: 'Monkey D. Luffy',
  },
  {
    frase: 'El sueño no muere nunca, aunque el soñador lo haga.',
    personaje: 'Bellamy',
  },
  {
    frase: 'No me importa si soy llamado un monstruo. Voy a ser el mejor espadachín del mundo.',
    personaje: 'Roronoa Zoro',
  },
  {
    frase: '¡Quiero vivir! ¡Llévame al mar contigo!',
    personaje: 'Nami',
  },
  {
    frase: 'Los sueños de las personas no mueren. ¡Son interminables!',
    personaje: 'Whitebeard',
  },
  {
    frase: 'Defiende lo que es tuyo con todo tu ser, eso es lo que significa ser un hombre.',
    personaje: 'Portgas D. Ace',
  },
];

export default function FrasesScreen() {
  const [indiceActual, setIndiceActual] = useState(0);
  const [animando, setAnimando] = useState(false);

  const cambiarFrase = () => {
    if (animando) return;
    setAnimando(true);
    let nuevoIndice;
    do {
      nuevoIndice = Math.floor(Math.random() * FRASES.length);
    } while (nuevoIndice === indiceActual);
    setIndiceActual(nuevoIndice);
    setTimeout(() => setAnimando(false), 300);
  };

  const fraseActual = FRASES[indiceActual];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Frases de One Piece</Text>

      <View style={styles.tarjeta}>
        <Text style={styles.comillas}>"</Text>
        <Text style={styles.textoFrase}>{fraseActual.frase}</Text>
        <Text style={styles.comillasCierre}>"</Text>
        <View style={styles.separador} />
        <Text style={styles.personaje}>— {fraseActual.personaje}</Text>
      </View>

      <Text style={styles.contador}>
        {indiceActual + 1} de {FRASES.length} frases
      </Text>

      <TouchableOpacity style={styles.boton} onPress={cambiarFrase}>
        <Text style={styles.textoBoton}>Nueva Frase</Text>
      </TouchableOpacity>

      <View style={styles.puntosContainer}>
        {FRASES.map((_, i) => (
          <View
            key={i}
            style={[styles.punto, i === indiceActual && styles.puntoActivo]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1b2a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 30,
  },
  tarjeta: {
    backgroundColor: '#1b2a3b',
    borderRadius: 16,
    padding: 28,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#ffd700',
    shadowColor: '#ffd700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    width: '100%',
  },
  comillas: {
    fontSize: 60,
    color: '#ffd700',
    lineHeight: 40,
    marginBottom: 5,
  },
  textoFrase: {
    color: '#e0e0e0',
    fontSize: 18,
    lineHeight: 28,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  comillasCierre: {
    fontSize: 60,
    color: '#ffd700',
    lineHeight: 30,
    textAlign: 'right',
  },
  separador: {
    height: 1,
    backgroundColor: '#ffd70044',
    marginVertical: 10,
  },
  personaje: {
    color: '#ffd700',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  contador: {
    color: '#666',
    fontSize: 13,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#ffd700',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 25,
  },
  textoBoton: {
    color: '#0d1b2a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  puntosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    maxWidth: 250,
  },
  punto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
  },
  puntoActivo: {
    backgroundColor: '#ffd700',
  },
});
