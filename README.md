Image to Text Converter with OCR
This project is a simple web application built with React and Tesseract.js that allows users to upload an image, convert it to grayscale, and extract text from the image using Optical Character Recognition (OCR).

Features
Image Upload: Upload an image from your device.
Grayscale Conversion: Automatically converts the uploaded image to grayscale for improved OCR accuracy.
Text Extraction: Extracts and displays text from the grayscale image.
Progress Tracking: Displays the progress of the OCR process.
Confidence Score: Shows the confidence level of the extracted text.
Technologies Used
React: A JavaScript library for building user interfaces.
Tesseract.js: A JavaScript library that provides OCR capabilities.
HTML5 Canvas: Used for image processing and conversion to grayscale.
CSS3: For responsive design and styling.
Getting Started
Prerequisites
Ensure you have the following installed:

Node.js: v14 or later
npm: Node package manager
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/Ahmer-rehman/improved-waddle.git
cd ocr-image-to-text
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
Open your browser and navigate to http://localhost:3000.

Usage
Upload an Image: Click the "Choose File" button and select an image from your device.
Convert and Extract Text: After uploading, click the "Convert to Text" button to start the OCR process.
View Extracted Text: Once processing is complete, the extracted text will be displayed along with the confidence level.
File Structure
src/
App.js: Main application component.
App.css: Styles for the application.
index.js: Entry point for the React application.
public/: Static files.
Code Explanation
Image Upload and Grayscale Conversion:

The uploaded image is displayed as a preview after being converted to grayscale using the HTML5 Canvas API.
OCR Processing:

Tesseract.js is used to recognize text from the grayscale image. The progress of the OCR is displayed in real-time.
Styling:

The application is styled to be responsive, ensuring usability across various devices and screen sizes.
Example Screenshots
You can add screenshots here showing the application in use, including the uploaded image and the extracted text.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Tesseract.js: The OCR engine used in this project.
React: The framework used to build this application.
