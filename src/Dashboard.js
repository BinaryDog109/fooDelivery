import React, {useEffect, useState} from "react"
import {Card, Button, Alert, Image} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.css';
import { useAuth } from "./auth/AuthContext"
import { Link, useNavigate  } from "react-router-dom"
import {auth, db} from "./firebase/firebase"
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";

export default function Dashboard() {
    const [error, setError] = useState("")
    const {logout} = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            navigate("/login")
        } catch {
            setError("Failed to log out")
        }
    }


    // read image ***************************************************


    // const ref = firebase.firestore().collection("Restaurants").doc("Mbsj4jfzNKIfoT2KKPPJ")
    //     .collection("Food").doc("3GQaq7ruH33VPvbKewZL");
    // Start the fetch operation as soon as
    // the page loads


        // db.collection("Restaurants").doc("Mbsj4jfzNKIfoT2KKPPJ")
        //     .collection("Food").doc("3GQaq7ruH33VPvbKewZL").get().then((querySnapshot) => {


    // const Getimageurl = () => {
        // const [url, setPosts] = useState([]);

        // useEffect( () => {
        //     async function fetchData() {
        //         // try {
        //             let url="";
        //             const docRef = db.collection("Restaurants").doc("Mbsj4jfzNKIfoT2KKPPJ")
        //                 .collection("Food").doc("3GQaq7ruH33VPvbKewZL");
        //             const doc = await docRef.get();
        //             if (!doc.exists) {
        //                 console.log('No such document!');
        //             } else {
        //                 url = doc.data()["image token"];
        //                 console.log(url);
        //             }
                // } catch (err) {
                //     console.log(err);
                // }
            // }
            // fetchData().then(url =>{
            //     console.log(url);
            //     return <Image src={url} alt="image" style={{ maxWidth: '150px' }}/>
            // });
        // }, []);
    //     return fetchData().then(url =>{
    //         return <Image src={url} alt="image" style={{ maxWidth: '150px' }}/>
    //     });
    // }

    const [user, setUser] = useState({})
    const email = auth.currentUser.email
    const userDocRef = db.collection("Restaurants").doc("Mbsj4jfzNKIfoT2KKPPJ")
        .collection("Food").doc("3GQaq7ruH33VPvbKewZL")

    useEffect(() => {
        const getUser = async () => {
            const snap = await getDoc(userDocRef)
            setUser({email, ...snap.data()})
        }
        getUser()
    },[])


    // **************************************************************
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {/*<strong>Email:</strong> {currentUser.email}*/}
                    <Image src={user.imagetoken} alt="image" style={{ maxWidth: '150px' }}/>
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
        </>
    )
}
