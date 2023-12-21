import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// Redux actions and reducer
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { text },
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id },
});

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.todos.length + 1,
            text: action.payload.text,
            completed: false,
          },
        ],
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    default:
      return state;
  }
};

// Redux store
const store = createStore(todoReducer);

// React component
const TodoApp = ({ todos, dispatch }) => {
  const [todoText, setTodoText] = useState('');

  const handleAddTodo = () => {
    if (todoText.trim() !== '') {
      dispatch(addTodo(todoText));
      setTodoText('');
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>To-Do App</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your to-do"
          value={todoText}
          onChangeText={(text) => setTodoText(text)}
        />
        <Button
          title="Add"
          onPress={handleAddTodo}
          // Applying buttonStyles
          style={styles.addButton}
          color="#4CAF50"
        />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text
              style={[styles.todoText, item.completed && styles.completedTodoText]}
              onPress={() => handleToggleTodo(item.id)}
            >
              {item.text}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const ConnectedTodoApp = connect(mapStateToProps)(TodoApp);

// Additional styles
const buttonStyles = StyleSheet.create({
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 4,
  },
});

const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: '#333',
    padding: 15,
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

// Updated styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  todoItem: {
    marginBottom: 8,
  },
  todoText: {
    fontSize: 16,
  },
  completedTodoText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  // Applying buttonStyles
  addButton: {
    ...buttonStyles.addButton,
  },
  // Applying headerStyles
  header: {
    ...headerStyles.header,
  },
  headerText: {
    ...headerStyles.headerText,
  },
});

const App = () => (
  <Provider store={store}>
    <ConnectedTodoApp />
  </Provider>
);

export default App;