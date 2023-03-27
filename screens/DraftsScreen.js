// import React, { useState, useEffect } from "react";
// import { View, Text, Button } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// function DraftsScreen({ navigation }) {
//   const [drafts, setDrafts] = useState([]);

//   useEffect(() => {
//     async function getDrafts() {
//       try {
//         const savedDrafts = await AsyncStorage.getItem("drafts");
//         if (savedDrafts !== null) {
//           setDrafts(JSON.parse(savedDrafts));
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getDrafts();
//   }, []);

//   return (
//     <View>
//       <Text>List of Drafts</Text>
//       <Button
//         title="New Draft"
//         onPress={() => navigation.navigate("NewDraft")}
//       />
//       {drafts.map((draft, index) => (
//         <Text key={index}>{draft}</Text>
//       ))}
//     </View>
//   );
// }

// export default DraftsScreen;
