import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTasks} from '../Redux/taskSlice';

const TaskList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Get tasks and loading state from Redux store
  const tasks = useSelector(state => state.tasks.tasks);
  const loading = useSelector(state => state.tasks.loading);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch tasks on component mount
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handlePlus = () => {
    navigation.navigate('AddTask');
  };

  const handleTaskDetails = taskId => {
    navigation.navigate('EditTask', {id: taskId});
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return <Text className="text-center mt-10">Loading tasks...</Text>;
  }

  return (
    <View className="flex-col">
      <View className="flex-row items-center mt-5 justify-between px-4 mb-10">
        <View className="w-10" />
        <Text className="text-center flex-1 text-xl">Task List</Text>
        <TouchableOpacity
          className="flex w-10 h-10 p-2.5 justify-center items-center flex-shrink-0 rounded-[30px] bg-gray-200"
          onPress={handlePlus}>
          <Image
            source={require('../plus.png')}
            className="w-[20px] h-[20px]"
          />
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Search tasks by title"
        value={searchQuery}
        onChangeText={setSearchQuery}
        className="bg-white border rounded-[10px] w-[auto] h-[44px] px-[15px] py-[13px] text-black border-black mx-4 mb-8"
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />

      <View className="flex-col space-y-2">
        {tasks.length === 0 ? (
          <Text className="text-center text-lg text-black-500 mt-10">
            No tasks are available
          </Text>
        ) : (
          <FlatList
            data={filteredTasks} // use filteredTasks for the filtered display
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleTaskDetails(item.id)}>
                <View className="flex-row items-center justify-start space-x-4 ml-4 py-2 border-b border-gray-200">
                  <Text className="text-md flex-1">{item.title}</Text>
                  <Text className="text-md w-40">{item.updatedAt}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default TaskList;
