import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import bin from './assets/bin.png';


function App() {

  const [txt, setTxt] = useState('')
  const [ind, setInd] = useState('')
  const [list, setList] = useState([])
  const [counter, setCounter] = useState(0)
  const [isEditing, setIsEditing] = useState(false)

  const add = () => {
    setList([...list, txt]);
    setTxt('');
    setCounter(counter + 1);
  }

  const edit = (e, i) => {
    setIsEditing(true);
    setInd(i);
    setTxt(e);
  }

  const saveEdit = (e, i) => {
    let editedTxt = txt;
    list.splice(ind, 1, editedTxt)
    setIsEditing(false);
    console.log(txt);
    setTxt('');
  }

  const del = (i) => {
    list.splice(i, 1)
    setList([...list]);
    setCounter(counter - 1);
  }

  const clearAll = () => {
    setList([]);
    console.log(list);
    setCounter(0);
  }


  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>
          To Do App
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <TextInput
            style={[styles.input]}
            placeholder='Enter a task'
            value={txt}
            onChangeText={(e) => { setTxt(e) }}
          />
          <View>
            {isEditing ?
              <TouchableOpacity style={[styles.button, { backgroundColor: '#7b337d', paddingVertical: 15 }]} onPress={() => saveEdit()}>
                <Text style={[styles.btnText]}>Save</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.button, { backgroundColor: '#7b337d', paddingVertical: 15 }]} onPress={() => add()}>
                <Text style={[styles.btnText]}>Add</Text>
              </TouchableOpacity>
            }
          </View>
        </View>

        <View style={{ marginBottom: 5 }}>
          <Text>You have: {counter <= 0 ? 'No' : counter} {counter == 1 ? 'task' : 'tasks'}</Text>
        </View>

        {list && list.map((e, i) => {
          return (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, flexWrap: 'nowrap' }}>

              <Text style={[styles.text]}>{e}</Text>

              <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity style={[styles.button, { backgroundColor: '#c874b2' }]} onPress={() => edit(e, i)}>
                  <Text style={[styles.btnText]}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, { backgroundColor: '#c874b2' }]} onPress={() => del(i)}>
                  <Text style={[styles.btnText]}>Delete</Text>
                </TouchableOpacity>

              </View>
            </View>
          )
        })}

        <TouchableOpacity onPress={clearAll}
          style={[styles.clearBtn]}>
          <Image source={bin}
            style={{ width: 30, height: 30 }}
          // resizeMode='stretch'
          />
        </TouchableOpacity>
      </View>
    </>
  )
}


export default App;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fefdfe',
    height: '100%',
  },
  heading: {
    fontSize: 35,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#430d4b',
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#430d4b',
  },
  text: {
    fontSize: 18,
    color: '#430d4b',
  },
  input: {
    width: '80%',
    padding: 10,
    fontSize: 18,
    backgroundColor: 'white',
    marginVertical: 20,
    borderWidth: 0.1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  button: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,

  },
  btnText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center'
  },
  clearBtn: {
    zIndex: 1,
    position: 'absolute',
    right: 20,
    bottom: 20,
  }
});