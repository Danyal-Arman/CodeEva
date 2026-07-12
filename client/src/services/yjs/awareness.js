import { generateUserColor } from "../../utils/generateUserColor";

export const initializeAwareness = (provider, username, userId, ) => {
    const awareness = provider.awareness;
    const states = Array.from(awareness.getStates().values());
    // console.log("Current awareness states:", states);
    awareness.setLocalStateField("user", {
        name: username,
        color: generateUserColor(userId, "cursor"),
        
    });

//     provider.awareness.on("update", () => {
//   console.log(
//     "All awareness states:",
//     Array.from(provider.awareness.getStates().values())
//   );
  
// });
    

};