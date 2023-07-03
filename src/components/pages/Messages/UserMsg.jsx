import { useEffect, useRef, useState } from 'react';
import {
  getFirestore,
  addDoc,
  collection,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase';
import Message from './Message';
import msg from './message.module.css';
import { BsEmojiSmile } from 'react-icons/bs';
import { BiMicrophone } from 'react-icons/bi';
import { AiOutlineSend, AiOutlineFileAdd } from 'react-icons/ai';
import Picker from 'emoji-picker-react';
import { BiChevronRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function UserMsg() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photo, setPhoto] = useState('');

  const inputRef = useRef(null);
  

  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const fileInputRef = useRef(null);

  const db = getFirestore(app);
  const storage = getStorage(app);
  const divForScroll = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (message === '' && !recordedAudio && !selectedFile) {
        return; // Don't submit empty message, audio, or file
      }

      let audioURL = null;
      if (recordedAudio) {
        audioURL = await uploadRecordedAudio();
      }

      let fileURL = null;
      if (selectedFile) {
        fileURL = await uploadFile();
      }

      setMessage('');
      setRecordedAudio(null);
      setSelectedFile(null);

      await addDoc(collection(db, 'Messages'), {
        text: message,
        audioURL,
        fileURL,
        createdAt: serverTimestamp(),
      });

      setIsTyping(false);
      divForScroll.current.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error adding message: ', error);
    }
  };

  const uploadRecordedAudio = async () => {
    try {
      const audioBlob = new Blob(chunks.current, { type: 'audio/webm' });
      const storageRef = ref(storage, 'recordings/' + Date.now() + '.webm');
      const snapshot = await uploadBytes(storageRef, audioBlob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      chunks.current = [];
      return downloadURL;
    } catch (error) {
      console.error('Error uploading audio: ', error);
      return null;
    }
  };

  const uploadFile = async () => {
    try {
      const storageRef = ref(storage, 'files/' + Date.now() + selectedFile.name);
      const snapshot = await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file: ', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!db) {
          console.error('Firestore database instance not available.');
          return;
        }

        const q = query(collection(db, 'Messages'), orderBy('createdAt', 'asc'));
        const unsubscribe = onSnapshot(q, (snap) => {
          setMessages(
            snap.docs.map((item) => {
              const id = item.id;
              return { id, ...item.data() };
            })
          );
        });
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error('Error fetching messages: ', error);
      }
    };

    fetchMessages();
  }, [db]);

  const handleTyping = (e) => {
    e.preventDefault();
    const text = e.target.value;
    setIsTyping(text.length > 0 || message.length > 0);
    setMessage(text);
  };

  const onEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setMessage((prevMessage) => prevMessage + emoji);
    setIsTyping(true);
    inputRef.current.focus(); // Focus on the input field after clicking the emoji
  };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.addEventListener('dataavailable', handleDataAvailable);
        mediaRecorder.current.start();
        setIsRecording(true);
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setIsRecording(false);
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      chunks.current.push(event.data);
    }
  };

  const downloadRecording = () => {
    const blob = new Blob(chunks.current, { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recording.webm';
    a.click();
    chunks.current = [];
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    try {
      if (file) {
        setSelectedFile(file);
      }
    } catch (error) {
      console.error('Error handling file upload: ', error);
    }
  };

  return (
    <div>
      <div className={msg.messageNav}>
        <Link to='/dashboard'>Home</Link>
        <BiChevronRight className={msg.icon} />
        <Link to='/messages'>All messages</Link>
        <BiChevronRight className={msg.icon} />
        <Link to='#'>Message</Link>
      </div>
      <div className={msg.message__container}>
        <div className={msg.message__container1}>
          {messages.map((item) => (
            <Message key={item.id} text={item.text} audioURL={item.audioURL} fileURL={item.fileURL} />
          ))}
          <div ref={divForScroll}></div>
        </div>
        <div>
          <form className={msg.user_Msg}>
            <input
              ref={inputRef}
              value={message}
              onChange={handleTyping}
              placeholder='Enter a Message...'
              className={msg.user_Msg_input}
            />
            {!isTyping ? (
              isRecording ? (
                <BiMicrophone
                  className={msg.user_Msg_input_icon}
                  onClick={stopRecording}
                  style={{ color: 'green' }}
                />
              ) : (
                <BiMicrophone className={msg.user_Msg_input_icon} onClick={startRecording} />
              )
            ) : (
              <AiOutlineSend
                onClick={async (e) => {
                  e.preventDefault();

                  try {
                    if (message === '' && !recordedAudio && !selectedFile) {
                      return; // Don't submit empty message, audio, or file
                    }

                    let audioURL = null;
                    if (recordedAudio) {
                      audioURL = await uploadRecordedAudio();
                    }

                    let fileURL = null;
                    if (selectedFile) {
                      fileURL = await uploadFile();
                    }

                    setMessage('');
                    setRecordedAudio(null);
                    setSelectedFile(null);

                    await addDoc(collection(db, 'Messages'), {
                      text: message,
                      audioURL,
                      fileURL,
                      createdAt: serverTimestamp(),
                    });

                    setIsTyping(false);
                    divForScroll.current.scrollIntoView({ behavior: 'smooth' });
                  } catch (error) {
                    console.error('Error adding message: ', error);
                  }
                }}
                className={`${msg.user_Msg_input_icon} ${msg.user_Msg_input_icon1}`}
              />
            )}
            <div className={msg.user_Msg_input_icons}>
            <BsEmojiSmile
            onClick={() => {
              setShowPicker((val) => !val);
              // setIsTyping(true); 
            }}
          />
              
              {showPicker && (
                <div className={msg.emojiPickerContainer}>
                  <Picker onEmojiClick={onEmojiClick} />
                </div>
              )}
              <label htmlFor='fileInput'>
                <AiOutlineFileAdd />
                <input
                  type='file'
                  accept='*'
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                  id='fileInput'
                />
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserMsg;
