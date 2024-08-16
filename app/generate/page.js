'use client';

import { useState } from 'react';
import { Box, Button, TextField, IconButton, Card, CardContent, CardMedia, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '@/app/Components/Header';
import TextFieldsIcon from '@mui/icons-material/TextFields'; 
import UploadFileIcon from '@mui/icons-material/UploadFile'; 
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Generate() {
  const [topic, setTopic] = useState('');
  const [flashcards, setFlashcards] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError('');

    // The rest of your generate logic...
  };

  const goBack = () => {
    setSelectedOption(null);
  };

  return (
    <div>
      <Header />
      <div className="bg-lightgreen flex flex-col items-center justify-center" style={{ height: '500px' }}>
        
        <h1 className="text-3xl font-bold mb-6">Generate Flashcards Below!</h1>
        <section className="bg-white flex flex-col items-center pb-8 pt-4" style={{width:"550px", borderRadius:"10px"}}>
          <div className="w-full items-left pl-8 pb-1">
        {selectedOption && (
          <IconButton
            onClick={goBack}
            style={{ justifyContent:'left', borderRadius:0 }}
          >
            
            <ArrowBackIcon />
            <Typography className='pl-1'>Go Back</Typography>
          </IconButton>
        )}
        </div>
        {!selectedOption && (
          <>
            
            <div className="flex flex-col gap-4 w-full max-w-md">
              <Button
                className='border-2 border-solid border-darkgreen bg-darkgreen text-white w-full md:w-auto mb-2'
                onClick={() => setSelectedOption('text')}
              >
                Text Generation
              </Button>
              <Button
                className='border-2 border-solid border-darkgreen bg-darkgreen text-white w-full md:w-auto mb-2'
                onClick={() => setSelectedOption('pdf')}
              >
                PDF Upload
              </Button>
              <Button
                className='border-2 border-solid border-darkgreen bg-darkgreen text-white w-full md:w-auto mb-2'
                onClick={() => setSelectedOption('youtube')}
              >
                YouTube Video
              </Button>
            </div>
          </>
        )}

        {selectedOption === 'text' && (
          <div className="w-full max-w-md mt-4">
            <TextField
              fullWidth
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic"
              variant="outlined"
              className="mb-4"
            />
            <Button
              onClick={handleGenerate}
              className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
              disabled={!topic} // Disable button until input is provided
              style={!topic ? { opacity: 0.5 } : {}}
            >
              {loading ? 'Generating...' : 'Generate Flashcards'}
            </Button>
          </div>
        )}

        {selectedOption === 'pdf' && (
          <div className="w-full max-w-md mt-4">
            <Button
              variant="contained"
              component="label"
              className="w-full mb-4"
            >
              Upload PDF
              <input
                type="file"
                hidden
                accept=".pdf"
                // Handle PDF upload logic here
              />
            </Button>
            <Button
              className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
              // Add onClick for PDF generation logic
            >
              Submit
            </Button>
          </div>
        )}

        {selectedOption === 'youtube' && (
          <div className="w-full max-w-md mt-4">
            <TextField
              fullWidth
              placeholder="Enter YouTube URL"
              variant="outlined"
              className="mb-4"
              // Handle YouTube URL logic here
            />
            <Button
              onClick={handleGenerate}
              className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
              disabled={!topic} // You can disable based on URL logic as well
              style={!topic ? { opacity: 0.5 } : {}}
            >
        {loading ? 'Generating...' : 'Generate Flashcards'}
            </Button>
          </div>
        )}

        {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}
        {flashcards.length > 0 && (
      <div className="mt-8 w-full max-w-lg">
        
          <div>
            <h2 className="text-2xl font-bold mb-4">Generated Flashcards</h2>
            <ul className="space-y-4">
              {flashcards.map((card, index) => (
                <li
                  key={index}
                  className="bg-white p-4 border border-gray-200 rounded shadow-sm"
                >
                  <p className="font-semibold">Q: {card.front}</p>
                  <p className="mt-2">A: {card.back}</p>
                </li>
              ))}
            </ul>
          </div>
        
        </div>
        )}
        </section>
      </div>
      <section className="p-8 items-center">
        <h2 className="text-2xl font-bold mb-6 text-center pb-4">Instructions for Each Generation Option</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Card className="w-full bg-lightgreen radius-5 p-4">
            <TextFieldsIcon
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Text Generation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter a topic to generate flashcards based on text prompts.
              </Typography>
            </CardContent>
          </Card>

          <Card className="w-full bg-lightgreen radius-5 p-4">
            <UploadFileIcon
            />
            <CardContent>
              <Typography variant="h5" component="div">
                PDF Upload
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upload a PDF document to extract flashcards from the content.
              </Typography>
            </CardContent>
          </Card>

          <Card className="w-full bg-lightgreen radius-5 p-4 ">
            <YouTubeIcon className="items-right"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                YouTube Video
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter a YouTube video URL to generate flashcards from the video content.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
