export const generateRoomID = (senderId, friendId) => {
    // Sort the IDs to ensure consistency regardless of the order they are passed in
    const sortedIds = [senderId, friendId].sort((a, b) => a - b);

    // Concatenate the sorted IDs to form the room ID
    const roomId = sortedIds.join("_");

    return roomId;
  };