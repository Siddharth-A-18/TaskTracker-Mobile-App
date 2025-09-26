// import React,{useState} from 'react';
// import {View, Text, TouchableOpacity, TextInput} from 'react-native';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import {insertTask} from '../components/SqliteFunctions';

// const AddTask = () => {
//   const navigation = useNavigation();
//   const route = useRoute();

//   const [title,setTitle] = useState('');
//   const [description,setDescription] = useState('');

//   const handleAdd = ()=>{
//     navigation.navigate('TaskList');
//   }

//   return (
//     <View className="flex-col mx-4">
//       <View className="flex-row justify-center items-center mt-5 mb-10">
//         <Text className="text-xl">Add Task</Text>
//       </View>

//       <View className="flex-col space-y-4">
//         <View className="mb-8">
//           <Text className="text-lg mb-2">Title</Text>
//           <TextInput 
//           className="bg-white border rounded-[10px] w-[303px] h-[44px] px-[15px] py-[13px] text-black border-black" 
          
//           />
//         </View>

//         <View>
//           <Text className="text-lg">Description</Text>
//           <TextInput
//             multiline
//             textAlignVertical="top"
//             className="bg-white border rounded-[10px] w-[303px] h-[150px] px-[15px] py-[13px] text-black border-black"
//           />
//         </View>
//       </View>

//       <View className='flex justify-center items-center mt-36'>
//         <TouchableOpacity className='rounded-[14px] w-[205px] h-[50px] items-center justify-center border bg-[#F2F2F2]' onPress={handleAdd}>
//             <Text className='text-lg'>Add</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default AddTask;


import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { insertTask } from '../components/SqliteFunctions';

const AddTask = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Function to get current datetime formatted as "DD/MM/YYYY HH:MM:SS"
  const getCurrentFormattedDateTime = () => {
    const dt = new Date();
    const pad = (n) => (n < 10 ? '0' + n : n);

    const day = pad(dt.getDate());
    const month = pad(dt.getMonth() + 1); // Months are zero indexed
    const year = dt.getFullYear();

    const hours = pad(dt.getHours());
    const minutes = pad(dt.getMinutes());
    const seconds = pad(dt.getSeconds());

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleAdd = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Title is required.');
      return;
    }

    const updatedAt = getCurrentFormattedDateTime();

    try {
      await insertTask({ title, description, updatedAt });
      navigation.navigate('TaskList');
    } catch (error) {
      Alert.alert('Error', 'Failed to add task. Please try again.');
    }
  };

  return (
    <View className="flex-col mx-4">
      <View className="flex-row justify-center items-center mt-5 mb-10">
        <Text className="text-xl">Add Task</Text>
      </View>

      <View className="flex-col space-y-4">
        <View className="mb-8">
          <Text className="text-lg mb-2">Title</Text>
          <TextInput
            className="bg-white border rounded-[10px] w-[303px] h-[44px] px-[15px] py-[13px] text-black border-black"
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
          />
        </View>

        <View>
          <Text className="text-lg">Description</Text>
          <TextInput
            multiline
            textAlignVertical="top"
            className="bg-white border rounded-[10px] w-[303px] h-[150px] px-[15px] py-[13px] text-black border-black"
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
          />
        </View>
      </View>

      <View className="flex justify-center items-center mt-36">
        <TouchableOpacity
          className="rounded-[14px] w-[205px] h-[50px] items-center justify-center border bg-[#F2F2F2]"
          onPress={handleAdd}
        >
          <Text className="text-lg">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTask;
