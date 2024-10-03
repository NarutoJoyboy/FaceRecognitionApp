import '@tensorflow/tfjs-react-native'; // Required to use TensorFlow.js in React Native
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

// Initialize TensorFlow model
const loadModel = async () => {
  try{
    await tf.ready();
    
    const model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh
    )
    console.log('Model loaded successfully');
    return model;
  } catch (error) {
    console.error("Error loading face landmarks detection model:", error);
  }


};


// Function to process and mark attendance
export const markAttendance = async (imageUri) => {
  const model = await loadModel();

  const imageTensor = await decodeImageToTensor(imageUri); // Convert image to tensor

  const predictions = await model.estimateFaces({
    input: imageTensor,
    returnTensors: false, 
  });

  if (predictions.length > 0) {
    const newFace = predictions[0];
    const isMatched = compareFaces(newFace, storedFacesArray); 

    return isMatched;
  } else {
    return false;
  }
};

// Helper function to decode image into tensor
const decodeImageToTensor = async (imagePath) => {
  // Implement the logic to convert imagePath to tensor
};

// Function to compare face landmarks
const compareFaces = (newFace, storedFaces) => {
  const threshold = 0.6; 
  for (let storedFace of storedFaces) {
    let distance = calculateEuclideanDistance(newFace.landmarks, storedFace.landmarks);
    if (distance < threshold) {
      return true; 
    }
  }
  return false; 
};

const calculateEuclideanDistance = (landmarks1, landmarks2) => {
  let distance = 0;
  for (let i = 0; i < landmarks1.length; i++) {
    const dx = landmarks1[i].x - landmarks2[i].x;
    const dy = landmarks1[i].y - landmarks2[i].y;
    distance += Math.sqrt(dx * dx + dy * dy);
  }
  return distance;
};
