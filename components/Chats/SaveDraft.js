// import AsyncStorage from "@react-native-async-storage/async-storage";

// async function saveDraft(message) {
//   try {
//     const drafts = await AsyncStorage.getItem("drafts");
//     if (drafts === null) {
//       const newDrafts = [message];
//       await AsyncStorage.setItem("drafts", JSON.stringify(newDrafts));
//     } else {
//       const parsedDrafts = JSON.parse(drafts);
//       const updatedDrafts = [...parsedDrafts, message];
//       await AsyncStorage.setItem("drafts", JSON.stringify(updatedDrafts));
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
