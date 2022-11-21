import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Coords } from '../../app/types';
import { Colors } from '../../constants/colors';
import { Button } from '../UI/Button';
import { LocationPicker } from './LocationPicker';
import { Visit } from '../../models/visit';

export function VisitForm({ onCreateVisit }: any) {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredExperience, setEnteredExperience] = useState('');
  const [enteredLocation, setEnteredLocation] = useState<Coords>();

  function changeTitleHandler(title: string) {
    setEnteredTitle(title);
  }

  function changeExperienceHandler(experience: string) {
    setEnteredExperience(experience);
  }

  const pickLocationHandler = useCallback((location: Coords) => {
    setEnteredLocation(location);
  }, []);

  function savePlaceHandler() {
    if (enteredTitle !== '' && enteredLocation !== null) {
      let visitData = new Visit(
        enteredTitle,
        enteredExperience,
        enteredLocation,
      );
      onCreateVisit(visitData);
    }
    return;
  }
  useState();
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={changeTitleHandler}
          value={enteredTitle}
          style={styles.input}
        />
        <Text style={styles.label}>Experience</Text>
        <TextInput
          multiline={true}
          onChangeText={changeExperienceHandler}
          value={enteredExperience}
          style={styles.input}
        />
      </View>
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Save Visit</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
