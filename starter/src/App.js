import React from "react";
import { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";



function App() {

  const [info, setInfo] = useState("")
  const [man, setMan] = useState(false)
  const [start, setStart] = useState(false)
  const [click, setClick] = useState("")
  const [tag, setTag] = useState("")
  const{list,setList}=useState(false)

  const url = "https://randomuser.me/api/";
  const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
  
  const getUser = async () => {
    try {
      const { data: { results } } = await axios(url)
      console.log(results[0])
                  const {
                picture: {large},
                name: {title, first, last},
                email,
                cell,gender,
                location: {state, country},
                    dob: { date, age },
                login:{password}
                  } = results[0]
            
              setInfo({
                large,
                title,
                first, last,
                email,cell,state,country,date,age,gender,password,
              })
      
                if (gender === "female") {
                setMan(true)
                  }
                else if (gender === "male") {
                  setMan(false)
                }
              
      setStart(true);
      setTag("name");
      setClick(info?.first)
      
  
      
      
  
  }
    catch (error) {
      console.log(error)
    }
   
  }
  
  useEffect(() => {
    getUser()
  },[])

 
  const getInfo = (e) => {
    console.log(e.target.alt)
    if (e.target.alt === "user") {
      setClick(info.first+" "+info.last)
      setTag("name")
    }
    if (e.target.alt === "mail") {
      setClick(info.email)
      setTag("e-mail")
    }
    if (e.target.alt === "age") {
      setClick(info.age)
      setTag("age")
    }
    if (e.target.alt === "map") {
      setClick(info.state+"/"+info.country)
      setTag("adress")
    }
    if (e.target.alt === "phone") {
      setClick(info.cell)
      setTag("phone")
    }
    if (e.target.alt === "lock") {
      setClick(info.password)
      setTag("password")
    }

}
  
  const addUser = () => {
    setList(true);
  }
 



  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={start? info?.large : defaultImage } alt="random user" className="user-img" />
          <p className="user-title">My {tag} is</p>
          <p className="user-value">{click}</p>
          <div className="values-list">
            <button className="icon" data-label="name">
              <img src={man? womanSvg : manSvg} alt="user" id="iconImg" onClick={getInfo}  />
            </button>
            <button className="icon" data-label="email">
              <img src={mailSvg} alt="mail" id="iconImg" onClick={getInfo}/>
            </button>
            <button className="icon" data-label="age">
              <img src={man? womanAgeSvg : manAgeSvg} alt="age" id="iconImg" onClick={getInfo} />
            </button>
            <button className="icon" data-label="street">
              <img src={mapSvg} alt="map" id="iconImg" onClick={getInfo} />
            </button>
            <button className="icon" data-label="phone">
              <img src={phoneSvg} alt="phone" id="iconImg" onClick={getInfo} />
            </button>
            <button className="icon" data-label="password">
              <img src={padlockSvg} alt="lock" id="iconImg"  onClick={getInfo}/>
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={()=>getUser()}>
              new user
            </button>
            <button className="btn" type="button" onClick={addUser}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
                 
              </tr>
            </thead>
            <tbody>
              {list && <tr className="body-tr">
                <th>{info?.first}</th>
                <th>{ info?.email}</th>
                <th>{ info?.cell}</th>
                <th>{info?.age}</th>
              </tr>}
              
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
)
}
export default App;
