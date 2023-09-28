import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

export default function CadastrarUsuarios() {
  const API_ENDPOINT = 'https://65148c8ddc3282a6a3cd489a.mockapi.io/api/users';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error( error);
    }
  };

  const createUser = async () => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });
      if (response.ok) {

        fetchUsers();
      
        setName('');
        setEmail('');
      } else {
        console.error('Erro ao criar usuário');
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Cadastro de Usuários</Text>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
        style={{ fontSize: 18, marginBottom: 12, padding: 8, borderWidth: 1 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={{ fontSize: 18, marginBottom: 12, padding: 8, borderWidth: 1 }}
      />
      <Button title="Cadastrar Usuário" onPress={createUser} />
      <Text style={{ fontSize: 24, marginTop: 16 }}>Lista de Usuários</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text style={{ fontSize: 16 }}>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}




