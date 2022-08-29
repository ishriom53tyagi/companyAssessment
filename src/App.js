// Import React
import React from "react";
  
// Import Bootstrap
import { Nav, Navbar, Container, Row, Col } 
        from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
  
// Import Custom CSS
import "./App.css";
  
// Import from react-router-dom
import { BrowserRouter as Router, Routes,
    Route, Link } from "react-router-dom";
  
// Import other React Component
import { CompanyList } from  "./Components/company-list.component"
import { Company } from "./Components/company.component"

// App Component
const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/company"} 
                  className="nav-link">
                  Company Assesment
                </Link>
              </Navbar.Brand>
  
              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/company"} 
                    className="nav-link">
                    Add Company
                  </Link>
                </Nav>
  
                <Nav>
                  <Link to={"/company/list"} 
                    className="nav-link">
                    Company List
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  <Route path="/" element = { <Company/>} />
                  <Route path="/company/list" element = { <CompanyList/>} />
                  <Route path="/company" element = { <Company/>} />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
};
  
export default App;