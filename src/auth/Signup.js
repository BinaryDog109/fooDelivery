import React, { useRef, useState } from "react"
import {Form, Button, Card, Alert, Image} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.css';
import { useAuth } from "./AuthContext"
import { Link, useNavigate  } from "react-router-dom"
import { db } from "../firebase/firebase"
import "firebase/storage";
import {storage} from "../firebase/firebase";
import empty_portrait from "../images/portrait.png"

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const firstnameRef = useRef()
    const lastnameRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate ()

    // store image to storage **************************************
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const handleChange = e =>{
        if (e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }
    const handleUpload = () => {
      const uploadTask = storage.ref(`test/${image.name}`).put(image);
      uploadTask.on(
          "state_changed",
          snapshot => {const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
              setProgress(progress);},
          error => {console.log(error);},
          () => {storage.ref("test").child(image.name).getDownloadURL().then(url=>{
              // console.log(url)
              setUrl(url);
          });}
      );
    };

    console.log("image:", image)
    // **************************************************************

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            const user = await signup(emailRef.current.value, passwordRef.current.value)

            const DocRef = db.collection("Users").doc(user.uid);
            const pushData = await DocRef.set(
                {
                    firstname: firstnameRef.current.value,
                    lastname: lastnameRef.current.value,
                    email: emailRef.current.value,
                    // id: user.uid,
                    role: "customer",
                    address: ["","",""]
                },
                { merge: true }
            );
            console.log("Document set in FireStore", pushData);
            navigate("/")
        } catch {
            setError("Failed to create an account")
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {/*image**************************************** */}
                    <progress value={progress} max={100}/>
                    <input type= "file" onChange={handleChange} />
                    <Image src={url || empty_portrait} alt="image" style={{ maxWidth: '150px' }}/>
                    <Button className={"w-100 text-center mt-2 mb-2"} onClick={handleUpload}>Upload Portrait</Button>
                    {/*image**************************************** */}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="firstname">
                            <Form.Label>Firstname</Form.Label>
                            <Form.Control  ref={firstnameRef} required />
                        </Form.Group>
                        <Form.Group id="lastname">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control  ref={lastnameRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}
