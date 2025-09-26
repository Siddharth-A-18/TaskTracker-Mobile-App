import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getTaskDetails,deleteTask,updateTask  } from '../components/SqliteFunctions'; // Adjust path

const EditTask = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params || {};

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const getCurrentFormattedDateTime = () => {
  const dt = new Date();
  const pad = (n) => (n < 10 ? '0' + n : n);

  const day = pad(dt.getDate());
  const month = pad(dt.getMonth() + 1);
  const year = dt.getFullYear();

  const hours = pad(dt.getHours());
  const minutes = pad(dt.getMinutes());
  const seconds = pad(dt.getSeconds());

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};


  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const results = await getTaskDetails(id);
        if (results && results.length > 0) {
          const task = results[0];
          setTitle(task.title ?? 'Not available');
          setDescription(task.description ?? 'Not available');
          setIsEditing(false);
        } else {
          setTitle('Not available');
          setDescription('Not available');
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true); 
  };

  const handleUpdate = async () => {
    const updatedAt = getCurrentFormattedDateTime();
    try {
      await updateTask(id, { title, description, updatedAt });
      setIsEditing(false); // Disable editing after update
      console.log("Update successful");
      navigation.navigate('TaskList');
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleDelete = async () => {
  try {
    await deleteTask(id);
    console.log(`Task with id ${id} deleted successfully`);
    navigation.navigate('TaskList');
  } catch (error) {
    Alert.alert('Error', 'Failed to delete task.');
    console.error('Delete error:', error);
  }
};


  return (
    <View className="flex-col mx-4">
      <View className="flex-row justify-center items-center mt-5 mb-10">
        <Text className="text-xl">Edit Task</Text>
      </View>

      <View className="flex-col space-y-4">
        <View className="mb-8">
          <Text className="text-lg mb-2">Title</Text>
          <TextInput
            className={`${isEditing ? 'bg-white' : 'bg-gray-200'} border rounded-[10px] w-[303px] h-[44px] px-[15px] py-[13px] text-black border-black`}
            value={title}
            onChangeText={setTitle}
             editable={isEditing}
          />
        </View>

        <View>
          <Text className="text-lg">Description</Text>
          <TextInput
            multiline
            textAlignVertical="top"
            className={`${isEditing ? 'bg-white' : 'bg-gray-200'} border rounded-[10px] w-[303px] h-[150px] px-[15px] py-[13px] text-black border-black`}
            value={description}
            onChangeText={setDescription}
             editable={isEditing}
          />
        </View>
      </View>

      <View className="flex-row justify-center items-center mt-36 space-x-4">
        <TouchableOpacity
          className="rounded-[14px] w-[100px] h-[50px] items-center justify-center border bg-[#F2F2F2]"
          onPress={handleEdit}
        >
          <Text className="text-lg">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-[14px] w-[100px] h-[50px] items-center justify-center border bg-[#F2F2F2]"
          onPress={handleUpdate}
          disabled={!isEditing}
        >
          <Text className="text-lg">Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-[14px] w-[100px] h-[50px] items-center justify-center border bg-[#F2F2F2]"
          onPress={handleDelete}
        >
          <Text className="text-lg">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditTask;
