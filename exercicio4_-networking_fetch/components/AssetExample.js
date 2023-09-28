import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

export default function AssetExample() {
  const url = 'https://6501a5d8736d26322f5c1121.mockapi.io/prova/notas';
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View>
      <Text style={styles.title}>Lista de Alunos</Text>
      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <View style={item.nota < 6 ? styles.cor1 : styles.cor2} />
                  <Text  style={{margin:12}}>{item.nome}</Text>
                </View>
                <Text>{item.nota}</Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    flexDirection: 'row',
  },
  cor1: {
    backgroundColor: 'red',
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  cor2: {
    backgroundColor: 'blue',
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  title: {
    margin: 'auto',
  },
});
