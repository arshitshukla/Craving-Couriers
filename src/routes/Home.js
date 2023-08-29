import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import hero from '../images/hero.avif'
import { useEffect } from "react";
// import IntroImg from "../images/hero.avif";

const Home = () => {
  const[search,setSearch]=useState("");
  const[foodCat,setFoodCat]=useState([]);
  const[foodData,setFoodData]=useState([]);

  const loadData=async()=>{
    let response=await fetch("http://localhost:5000/api/foodData",{
      method:"GET"
    });
    response=await response.json();

    setFoodCat(response[1]);
    setFoodData(response[0]);
  }

  useEffect(()=>{
    loadData();
  },[]);

  return (
    <div>
      <div>
        <div className="row position-relative">
          <div className="col">
          <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" style={{"objectFit":"contain"}}>
          <div className="carousel-indicators display-1">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
              <div className="carousel-item active">
              <img src={hero} className="d-block w-100" style={{"height":"500px","filter":"brightness(80%)"}} alt="..."/>
              <div className="carousel-caption d-none d-md-block">
                  <h1>Upto 50% off on your first order*</h1>
                  <div className="d-flex justify-content-center" role="search" >
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                  </div>
              </div>
              </div>
              <div className="carousel-item">
              <img src={hero} className="d-block w-100" style={{"height":"500px"}}alt="..."/>
              <div className="carousel-caption d-none d-md-block">
                  <h1>Get top discount on top food</h1>
                  <div className="d-flex justify-content-center" role="search" >
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                  </div>
              </div>
              </div>
              <div className="carousel-item">
              <img src={hero} className="d-block w-100" style={{"height":"500px"}} alt="..."/>
              <div className="carousel-caption d-none d-md-block">
                  <h1>We courier your cravings to your home </h1>
                  <div className="d-flex justify-content-center" role="search" >
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                  </div>
              </div>
              </div>
          </div>
          </div>
          </div>
          <div className="col position-absolute"><Navbar/></div>
        </div>
      </div>
      <div>
        {
          (foodCat!==[])?foodCat.map((data)=>{
              return(
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {
                    (foodData!==[])?foodData.filter((item)=>(item.CategoryName===data.CategoryName)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map(filterItems=>{
                        return(
                          <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                            <Card 
                            foodItem={filterItems}
                            options={filterItems.options[0]} />
                          </div>
                        )
                    }):<div>No Data</div>
                  }
                </div>  
              )
          }):<div>No Data</div>
        }
      </div>
      <Footer/>
      {/* <img src={IntroImg} alt="Hero img" style={{ "height": "40%", "width": "100%" }}/> */}
    </div>
  );
};

export default Home;
