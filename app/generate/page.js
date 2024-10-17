'use client';

import { useState, useEffect } from 'react';
import { Button, TextField, IconButton, Card, CardContent, Typography, CssBaseline } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '@/app/Components/Header';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Footer from '@/app/Components/Footer';
import saveFlashcards from '@/utils/saveFlashcards';
import CardComponent from '@/app/Components/CardComponent';
import { useUser } from '@clerk/clerk-react';
import { blue } from '@mui/material/colors';
import axios from 'axios';



export default function Generate() {
  const [topic, setTopic] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [flashcards, setFlashcards] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  useEffect(() => {
    if (pdfFile) {
      console.log("Updated PDF File: ", pdfFile);
    }
  }, [pdfFile]);
  // const handleYTGen = async () => {
  //   console.log("handling yt gen")
  //   setLoading(true);
  //   setError('');
  //   try {
  //     // const loader = new YoutubeLoader({ url: youtubeUrl });
  //     const loader = new YoutubeLoader(
  //       "https://youtu.be/bZQun8Y4L2A",
  //       "en",
  //       true,
  //     );
  //     const docs = await loader.load();
  //   //   const loader = await YoutubeLoader.createFromUrl("https://youtu.be/bZQun8Y4L2A", {
  //   //     mode: 'no-cors',
  //   //     language: "en",
  //   //     addVideoInfo: true,
  //   // });
  //     // const transcript = await loader.load();
  //     console.log(docs)
  //   }
  //   catch {

  //   }

  // };
  // const handleYTGen = async () => {
  //   setLoading(true);
  //   setError('');
  //   try {
  //     const loader = await YoutubeLoader.createFromUrl("https://youtu.be/bZQun8Y4L2A", {
  //       language: "en",
  //       addVideoInfo: true,
  //     });
  //     const docs = await loader.load();
  //     console.log(docs);
  //   } catch (error) {
  //     console.error('Error loading YouTube video:', error);
  //     setError('Failed to load video');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  const { user } = useUser();

  const handleFileChange = (e) =>{
    setPdfFile(e.target.files[0])
    console.log("PDF FILE HERE< ", pdfFile)
  }

  const handleGenerate = async () => {
  
    console.log("handling generate", selectedOption, topic)
    setLoading(true);
    setError('');
    setExtractedText('');

    try {
      if (selectedOption == "pdf" && pdfFile){
        console.log("pdf selected bro")
        // try{
        //   const res1 = await axios.get("/api/health") 
        //   console.log(res1.data)
        // } catch (error){
        //   console.log("error ", error)
        // }
        const formData = new FormData();
        formData.append('pdf', pdfFile);
        console.log("formdata ", formData)

        try{
          const res1 = await axios.post("http://localhost:500/upload", formData, { headers: {'Content-Type': 'multipart/form-data',},})
          console.log("Flask server response: ", res1.data);
        } catch (error) {
          console.log("erro herr ", error)
        }

        try {
        const res = await fetch('/api/pdfExtract', {
          method: 'POST',
          body: formData,
        })
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        console.log("RESPONSE,  ", res)
        const data = await res.json();
        setTopic(data.text)
        console.log("data ", data.text);
        setExtractedText(data.text);
      } catch (error) {
        console.log("error uploading pdf ", error);
      }
      }
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedOption, topic }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result)
      setFlashcards(result || []);
      } catch (error) {
      console.error('Error:', error);
      setError('Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  

  const handleDiscard = () => {
    setFlashcards([]);
    alert('Flashcards discarded.');
  };


  

  const handleSave = async () => {
    
    console.log("saved")
    alert('Flashcards saved successfully!');
    await saveFlashcards(flashcards, user); // Pass the user object here
  };




  const goBack = () => {
    setSelectedOption(null);
  };

  return (
    <div>
      <CssBaseline />
      <Header />
      <div className="my-20 flex flex-col items-center justify-center pb-12" style={{ height: "auto" }}>
        
        <h1 className="text-3xl font-bold mt-6 mb-6">Generate Flashcards Below!</h1>
        <section className="bg-white flex flex-col items-center pb-8 pt-4" style={{ width: "550px", borderRadius: "10px" }}>
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
                className='border-2 border-solid border-darkgreen bg-darkgreen text-white w-full md:w-auto mb-2 hover:bg-green-700'
                onClick={() => setSelectedOption('text')}
                sx={{
                  backgroundColor: 'green',
                  border: '2px solid green',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'darkgreen',
                    border: '2px solid darkgreen',
                  },
                }}
              >
                Text Generation
              </Button>
              <Button
                className='border-2 border-solid border-darkgreen bg-darkgreen text-white w-full md:w-auto mb-2 hover:bg-green-700'
                onClick={() => setSelectedOption('pdf')}
                sx={{
                  backgroundColor: 'green',
                  border: '2px solid green',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'darkgreen',
                    border: '2px solid darkgreen',
                  },
                }}
              >
                PDF Upload
              </Button>
              <Button
                className='border-2 border-solid border-darkgreen bg-darkgreen text-white w-full md:w-auto mb-2 hover:bg-green-700'
                onClick={() => setSelectedOption('youtube')}
                sx={{
                  backgroundColor: 'green',
                  border: '2px solid green',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'darkgreen',
                    border: '2px solid darkgreen',
                  },
                }}
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
              className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 border-2 border-solid border-darkgreen bg-darkgreen text-white hover:bg-green-700"
              sx={{
                marginTop: '20px',
                backgroundColor: 'green',
                border: '2px solid green',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'darkgreen',
                  border: '2px solid darkgreen',
                },
              }}
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
              sx={{
                backgroundColor: 'green',
                border: '2px solid green',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'darkgreen',
                  border: '2px solid darkgreen',
                },
              }}
          
            >
              Upload PDF
              <input
                type="file"
                hidden
                accept=".pdf"
                onChange={handleFileChange}
              />
            </Button>

            {pdfFile && (
                <div className="text-center mb-4">
                  {/* <p>PDF NAME</p> */}
                  <p>{pdfFile.name}</p> 
                </div>
              )}

            <Button type="button" 
              className="w-full text-green py-3 rounded"
              onClick={handleGenerate}
              sx={{
                color: "green",
                '&:hover': {
                  backgroundColor: '#lightgray',
                },
              }}
              disabled={!pdfFile}
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
              onClick={handleYTGen}
              className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
              style={!topic ? { opacity: 0.5 } : {}}
              sx={{
                backgroundColor: 'green',
                border: '2px solid green',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'darkgreen',
                  border: '2px solid darkgreen',
                },
              }}
            >
        {loading ? 'Generating...' : 'Generae Flashcards'}
            </Button>
          </div>
        )}
        </section>
        {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}
        {flashcards.length > 0 && (
          <div className="mt-8 w-full">
            <div className="mt-8 w-full bg-lightgreen p-4 rounded-lg">
              <h2 className="text-3xl font-bold mb-20 text-center pt-8">Generated Flashcards</h2>
              <div className="text-black grid grid-cols-1 justify-center items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto gap-4">
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

