import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import axios from 'axios';

const App = () => {
  const [countryName, setCountryName] = useState('');
  const [medals, setMedals] = useState(null);
  const [error, setError] = useState('');

  const fetchMedals = () => {
    /*professor,eu tentei varias vezes,mas não consegui fazer com que o app procure por todos os endpoints
      porém se voce digitar um endpoint especifico na URL ele retorna o numero de medalhas de ouro,prata,
      bronze e o numetro total também
    */
    axios.get(`http://192.168.1.7:3000/3?country=${countryName}`)
      .then((response) => {
        const data = response.data;
        if (data) {
          setMedals(data);
          setError('');
        } else {
          setError('País não encontrado ou sem medalhas registradas.');
          setMedals(null);
        }
      })
      .catch(() => {
        setError('Erro ao buscar as informações. Verifique sua conexão.');
        setMedals(null);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Digite o nome do País</Text>
      <TextInput
        style={styles.input}
        value={countryName}
        onChangeText={setCountryName}
      />
      <Button title="Buscar Medalhas" onPress={fetchMedals} />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {medals ? (
        <View style={styles.medalsContainer}>
          <Text style={styles.medalText}>Ouro: {medals.gold}</Text>
          <Text style={styles.medalText}>Prata: {medals.silver}</Text>
          <Text style={styles.medalText}>Bronze: {medals.bronze}</Text>
          <Text style={styles.medalText}>Total: {medals.total}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontWeight: 'bold',
  },
  medalsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  medalText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default App;
