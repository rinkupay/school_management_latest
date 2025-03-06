const generateRandomId = () => {
    const randomNumber = Math.floor(Math.random() * 100000); // Generate a random number between 0 and 9999
    return `WES${randomNumber.toString().padStart(4, '0')}`; // Add prefix and pad the number with leading zeros
  };
  
module.exports = generateRandomId