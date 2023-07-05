import React, { useRef, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions, Text } from 'react-native';

export default function App() {
  const [url, setUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const { width } = Dimensions.get('window');
  const imageSize = { width: width - 40, height: width - 40 };
  const [inputValue, setInputValue] = useState("");
  const handleCreate = () => {
    setLoading(true)
    setUrl(null)
    console.log(inputValue);
    fetch("http://localhost:3001/create-image", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ inputValue })
    })
      .then(res => res.json())
      .then(res => {
        setUrl(res[0])
      })
      .catch(error => {
        setUrl(null)
      })
      .finally(() => {
        setLoading(false)
      });
  }
  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, imageSize]}>
        {loading && (
          <ActivityIndicator size="large" color={"#336699"} />
        )}
        {url && (
          <Image source={{ uri: url }} style={styles.image} />
        )}
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setInputValue}
        value={inputValue}
        placeholder="Oluşturmak istediğini yaz!" 
      />
      <TouchableOpacity disabled={loading} style={[styles.button, loading && { opacity: .5 }]} onPress={() => handleCreate()}>
        <Text style={styles.buttonText}>Oluştur</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    aspectRatio: 1,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 20,
    marginBottom: 30
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius:5,
    marginBottom:20
  },
  button: {
    backgroundColor: "#336699",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  }
});
