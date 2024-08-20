import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import CharacterCard from './CharacterCard';
import api from './api';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchCharacters = async (page) => {
    try {
      const response = await api.get(`character/?page=${page}`);
      if (response.data.results.length > 0) {
        setCharacters(prevCharacters => [...prevCharacters, ...response.data.results]);
        setHasMore(response.data.info.next !== null);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderItem = ({ item }) => <CharacterCard character={item} />;

  return (
    <FlatList
      data={characters}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={<Text style={styles.header}>Rick and Morty Characters</Text>}
      ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
});

export default CharacterList;
