import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CharacterList from './src/components/CharacterList';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CharacterList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default App;
