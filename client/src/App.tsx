import React from "react"
import InputFile from "./components/InputFile"
import Footer from "./components/Footer"

function App() {

  return (
    <div className="home">
      <h1 className="title">Shopper</h1>
      <InputFile type={'file'}/>
      <Footer></Footer>
    </div>
  )
}

export default App
