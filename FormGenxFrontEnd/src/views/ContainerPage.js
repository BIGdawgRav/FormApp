/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// core components
import IndexNavbar from "../components/NavbarsBLK/IndexNavbar.js";
import PageHeader from "../components/PageHeader/PageHeader.js";
import Footer from "../components/FooterBLK/Footer.js";

// sections for this page/view
import Login from "./login/index"
import RegisterPage from "./RegisterPage/Registerpage"







const ContainerPage =() =>  {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  },[]);

  const handleClick = () => {
    window.scrollTo({
      top: 1000,
      behavior: 'smooth',
  });

  }



  return (
    <>
 
    
      <IndexNavbar />
      <div onClick = {handleClick}> 
        <PageHeader />
        </div>


          <div >
     
        
  

            <div  style = {{display:'flex', flexDirection : ' row'  ,  marginTop : 300,  marginBottom : 200}}>
    
  

                  <div   style = {{ width :  "40%", marginLeft : "5%" , margingRight : "5%"}  }>
                  <Login /> 
                  </div>


                  <div style = {{ width :  "40%" ,  marginLeft : '5%' ,  margingRight : "5%"} } >
                      <RegisterPage />
                  </div>
            
              </div>

          </div>

        

          
          


  
    
 

 

          
             


       
       

          {/* <Basics /> */}
          {/* <Navbars />
          <Tabs />
          <Pagination />
          <Notifications />
          <Typography />
          <NucleoIcons />
          <Signup />
          <Examples />
          <Download /> */}
        {/* </div> */}
        <Footer />
    
    </>
  );
}








export default ContainerPage

