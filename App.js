import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import bin from './assets/bin.png';
import xIcon from './assets/x-icon.png';

function App() {

  let currentHour = new Date().getHours();
  let currentMinutes = new Date().getMinutes();
  let currentTime = (currentHour < 12) ? `${currentHour}:${currentMinutes} AM`
  : (currentHour === 12) ? `${currentHour}:${currentMinutes} PM`
  : `${currentHour -= 12}:${currentMinutes} PM`;
  
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let currentMonth = new Date().getMonth();
  const timeStamp = `${currentTime}, ${ months[currentMonth]} ${new Date().getDate()}, ${new Date().getFullYear()}`

  const [txt, setTxt] = useState('');
  const [ind, setInd] = useState('');
  const [time, setTime] = useState(timeStamp);
  const [list, setList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  const onFocus = () => {
    setError('');
  }

  const onBlur = () => {
    setError('');
  }

  const add = () => {
    if (txt !== '') {
      setError('');
      setTime(timeStamp);
      setList([...list, {txt: txt, time: time}]);
      setTxt('');
      setCounter(counter + 1);
    } else {
      setError('Please Enter Something');
    }
  };
 
  const edit = (e, i) => {
    setError('');
    setIsEditing(true);
    setInd(i);
    setTxt(e);
  };

  const saveEdit = (e, i) => {
    let editedTxt = txt;
    if (txt !== '') {
      setError('');
    list.splice(ind, 1, {
      txt: editedTxt,
      time: timeStamp,
    })
    setIsEditing(false);
    setTxt('');
  } else {
      setError('Please Enter Something');
    }
  };

  const del = i => {
    setError('');
    list.splice(i, 1);
    setList([...list]);
    setCounter(counter - 1);
  };

  const clearAll = () => {
    setError('');
    setList([]);
    setCounter(0);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>To Do App</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
          <TextInput
            style={[styles.input]}
            placeholder="Enter a task"
            value={txt}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={e => {
              setTxt(e);
            }}
          />
          <View>
            {isEditing ? (
              <TouchableOpacity
                activeOpacity={0.6}
                style={[
                  styles.button,
                  {backgroundColor: '#7b337d', paddingVertical: 15},
                ]}
                onPress={() => saveEdit()}>
                <Text style={[styles.btnText]}>Save</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.6}
                style={[
                  styles.button,
                  {backgroundColor: '#7b337d', paddingVertical: 15},
                ]}
                onPress={() => add()}>
                <Text style={[styles.btnText]}>Add</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View>
          {error ? <Text style={[styles.error]}>{error}</Text> : null}
        </View>

        <View style={{marginLeft: 5, marginBottom: 5, }}>
          <Text>
            You have: {counter <= 0 ? 'No' : counter}
            {counter == 1 ? ' task' : ' tasks'}
          </Text>
        </View>

        <ScrollView>
          {list &&
            list.map((e, i) => {
              return (
                <TouchableOpacity activeOpacity={0.6} key={i} style={[styles.li]} onPress={() => edit(e.txt, i)}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', }}>
                    <View style={{flex: 10, marginRight: 5}}>
                      <Text style={[styles.text]}>{e.txt}</Text>
                      <Text style={[styles.time]}>{e.time}</Text>
                    </View>

                    <TouchableOpacity activeOpacity={0.6} style={[ styles.button, {flex: 1, backgroundColor: 'transparent'}, ]} onPress={() => del(i)}>
                      <Image source={xIcon} style={{width: 30, height: 30}}
                        // resizeMode='stretch'
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={clearAll}
          style={[styles.clearBtn]}>
          <Image
            source={bin}
            style={{width: 30, height: 30}}
            // resizeMode='stretch'
          />
        </TouchableOpacity>
      </View>
    </>
  );
}


export default App;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fefdfe',
    height: '100%',
    maxWidth: '100%',
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
    flexWrap: 'wrap',
  },
  time: {
    flexWrap: 'wrap',
    marginTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#430d4b',
  },
  input: {
    width: '80%',
    padding: 10,
    fontSize: 18,
    backgroundColor: 'white',
    marginVertical: 20,
    borderWidth: 0.1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  error: {
    color: '#ff0000', 
    marginTop: -15,
    marginBottom: 8,
    marginLeft: 5,
  },
  li: {
    marginVertical: 7,
    padding: 10,
    paddingBottom: 7,
    maxWidth: '100%',
    borderRadius: 10,
    backgroundColor: '#c874b250',
  },
  button: {
    alignItems: 'center',
    margin: 5,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 10,
    width: '100%',
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  clearBtn: {
    borderWidth: 1,
    borderColor: 'darkgrey',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 8,
    zIndex: 1,
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
