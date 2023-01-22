import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

let interval = null;

let seconds = 0;
let minutes = 0;
let hours = 0;

function App() {
  const [time, setTime] = useState('00:00:00');

  const [buttonText, setbuttonText] = useState('Iniciar');

  function startCronometro() {
    if (!interval) {
      interval = setInterval(() => {
        seconds++;
        if (seconds >= 60) {
          minutes++;
          seconds = 0;
          if (minutes >= 60) {
            hours = 0;
            minutes = 0;
          }
        }
        setTime(
          `${hours < 10 ? '0' + hours : hours}:${
            minutes < 10 ? '0' + minutes : minutes
          }:${seconds < 10 ? '0' + seconds : seconds}`,
        );
      }, 1000);
      setbuttonText('Parar');
    } else {
      clearInterval(interval);

      interval = null;
      setbuttonText('Iniciar');
    }
  }
  function parar() {
    setbuttonText('Iniciar');
    clearInterval(interval);
    interval = null;
    setTime('00:00:00');
    seconds = 0;
    minutes = 0;
    hours = 0;
  }

  function isDisabled() {
    return interval == null && time == '00:00:00';
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./cronometro.png')} />
      <Text style={styles.time}>{time}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          disabled={isDisabled()}
          style={
            isDisabled()
              ? [styles.button, styles.buttonDisabled]
              : styles.button
          }
          onPress={parar}>
          <Text
            style={
              isDisabled()
                ? [styles.buttonText, styles.textDisabled]
                : styles.buttonText
            }>
            Reiniciar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={startCronometro}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00eeff',
  },
  image: {
    width: 220,
    height: 220,
  },
  time: {
    fontSize: 50,
    marginTop: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 110,
    width: '95%',
  },

  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 60,
    width: 17,
    borderRadius: 9,
    margin: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  textDisabled: {
    color: '#666666',
  },
  buttonText: {
    color: '#0000ff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default App;
