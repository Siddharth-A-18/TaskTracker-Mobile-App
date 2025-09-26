import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {getAllTasks} from '../components/SqliteFunctions';

const TaskList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [tasks, setTasks] = useState([]);

  const handlePlus = () => {
    navigation.navigate('AddTask');
  };

  const handleTaskDetails = (taskId) => {
  navigation.navigate('EditTask', { id: taskId });
};


  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchTasks = async () => {
        const allTasks = await getAllTasks();
        console.log("Complete Data",allTasks);
        if (isActive) {
          setTasks(allTasks || []);
        }
      };
      fetchTasks();
      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <View className="flex-col">
      <View className="flex-row items-center mt-5 justify-between px-4 mb-10">
        <View className="w-10" />
        <Text className="text-center flex-1 text-xl">Task List</Text>
        <TouchableOpacity
          className="flex w-10 h-10 p-2.5 justify-center items-center flex-shrink-0 rounded-[30px] bg-[#08ea1e]"
          onPress={handlePlus}>
          <Image
            source={require('../plus.png')}
            className="w-[10px] h-[10px]"
          />
        </TouchableOpacity>
      </View>

      {/* Template to render tasks */}
      <View className="flex-col space-y-2">
        {tasks.length === 0 ? (
          <Text className="text-center text-gray-500 mt-10">
            No tasks are available
          </Text>
        ) : (
          tasks.map(task => (
            <TouchableOpacity
              key={task.id}
              onPress={() => handleTaskDetails(task.id)}>
              <View className="flex-row items-center justify-start space-x-4 ml-4 py-2 border-b border-gray-200">
                <Text className="text-md flex-1">{task.title}</Text>
                <Text className="text-md w-40">{task.updatedAt}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
};

export default TaskList;
