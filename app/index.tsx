import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
  const [number, setNumber] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [numberFact, setNumberFact] = useState('');
  const [dateFact, setDateFact] = useState('');
  const [loading, setLoading] = useState(false);

  // Set today's date as default when component mounts
  useEffect(() => {
    const today = new Date();
    setMonth((today.getMonth() + 1).toString()); // getMonth() returns 0-11
    setDay(today.getDate().toString());
  }, []);

  const fetchNumberFact = async () => {
    if (!number) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://numbersapi.com/${number}/trivia`);
      setNumberFact(response.data);
    } catch (error) {
      setNumberFact('Error fetching number fact');
    }
    setLoading(false);
  };

  const fetchDateFact = async () => {
    if (!month || !day) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://numbersapi.com/${month}/${day}/date`);
      setDateFact(response.data);
    } catch (error) {
      setDateFact('Error fetching date fact');
    }
    setLoading(false);
  };

  // Fetch date fact when component mounts with today's date
  useEffect(() => {
    if (month && day) {
      fetchDateFact();
    }
  }, [month, day]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Number Facts</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a number"
          keyboardType="numeric"
          value={number}
          onChangeText={setNumber}
        />
        <TouchableOpacity style={styles.button} onPress={fetchNumberFact}>
          <Text style={styles.buttonText}>Get Number Fact</Text>
        </TouchableOpacity>
        {numberFact ? <Text style={styles.fact}>{numberFact}</Text> : null}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Date Facts</Text>
        <View style={styles.dateInputs}>
          <TextInput
            style={[styles.input, styles.dateInput]}
            placeholder="Month (1-12)"
            keyboardType="numeric"
            value={month}
            onChangeText={setMonth}
          />
          <TextInput
            style={[styles.input, styles.dateInput]}
            placeholder="Day (1-31)"
            keyboardType="numeric"
            value={day}
            onChangeText={setDay}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={fetchDateFact}>
          <Text style={styles.buttonText}>Get Date Fact</Text>
        </TouchableOpacity>
        {dateFact ? <Text style={styles.fact}>{dateFact}</Text> : null}
      </View>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  dateInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    width: '48%',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fact: {
    marginTop: 15,
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
}); 