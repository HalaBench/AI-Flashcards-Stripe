'use client';

import { useState } from 'react';
import { Button, TextField, IconButton, Card, CardContent, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '@/app/Components/Header';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Footer from '@/app/Components/Footer';
import saveFlashcards from '@/utils/saveFlashcards';
import CardComponent from '@/app/Components/CardComponent';

export default function Generate() {
  const [topic, setTopic] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);


  const handleGenerate = async () => {
    console.log("handling generate");
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
      setFlashcards(result || []);

    } catch (error) {
      console.error('Error:', error);
      setError('Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    await saveFlashcards(flashcards);
    alert('Flashcards saved successfully!');
  };

  const handleDiscard = () => {
    setFlashcards([]);
    alert('Flashcards discarded.');
  };





  const goBack = () => {
    setSelectedOption(null);
  };

  return (
    <div>
      <Header />
      <div className="my-20 flex flex-col items-center justify-center pb-12" style={{ height: "auto" }}>

        <h1 className="text-3xl font-bold mt-6 mb-6">Generate Flashcards Below!</h1>
        <section className="bg-white flex flex-col items-center pb-8 pt-4" style={{ width: "550px", borderRadius: "10px" }}>
          <div className="w-full items-left pl-8 pb-1">
            {selectedOption && (
              <IconButton
                onClick={goBack}
                style={{ justifyContent: 'left', borderRadius: 0 }}
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
                  className='border-2 border-solid border-darkgreen bg-darkgreen hover:text-black text-white w-full md:w-auto mb-2'
                  onClick={() => setSelectedOption('text')}
                >
                  Text Generation
                </Button>
                <Button
                  className='border-2 border-solid border-darkgreen bg-darkgreen hover:text-black text-white w-full md:w-auto mb-2'
                  onClick={() => setSelectedOption('pdf')}
                >
                  PDF Upload
                </Button>
                <Button
                  className='border-2 border-solid border-darkgreen bg-darkgreen hover:text-black text-white w-full md:w-auto mb-2'
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
                type="button"
                onClick={handleGenerate}
                className="w-full bg-blue-500 text-white py-3 rounded hover:bg-green-500 border-2 border-solid border-darkgreen bg-darkgreen text-white"
                disabled={!topic}
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
              <Button type="button"
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
                type="button"
                onClick={handleGenerate}
                className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
                disabled={!topic} // You can disable based on URL logic as well
                style={!topic ? { opacity: 0.5 } : {}}
              >
                {loading ? 'Generating...' : 'Generate Flashcards'}
              </Button>
            </div>
          )}
        </section>
        {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}
        {flashcards.length > 0 && (
          <div className="mt-8 w-full">
            <div className="mt-8 w-full bg-lightgreen p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-28 text-center">Generated Flashcards</h2>
              <div className="grid grid-cols-1 justify-center items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto gap-4">
                {flashcards.map((card, index) => (
                  <CardComponent
                    key={index}
                    front={card.front}
                    back={card.back}
                  />
                ))}
              </div>
              <div className="flex justify-end items-center mt-20 gap-10 mb-8">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-darkgreen text-white rounded hover:bg-green-500"
                >
                  Save Flashcards
                </button>
                <button
                  onClick={handleDiscard}
                  className="px-6 py-2 bg-logocolor text-white rounded hover:bg-orange-500"
                >
                  Discard Flashcards
                </button>
              </div>
            </div>
          </div>
        )}



      </div>
      <section className="p-8 items-center bg-lightgreen">
        <h2 className="text-2xl font-bold mb-6 text-center pb-4">Instructions for Each Generation Option</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Card className="w-full radius-5 p-4">
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

          <Card className="w-full  radius-5 p-4">
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

          <Card className="w-full  radius-5 p-4 ">
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
      <Footer />
    </div>
  );
}
