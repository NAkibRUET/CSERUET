import React from 'react';
import {Link} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'mdbootstrap/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import './header.css'

import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
        };
    this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }
    render() {
        return (
          <div>
                <Navbar color="" dark expand="md" scrolling style={{background:"#006400"}} sticky="top">
                  <div className="container">
                    <NavbarBrand href="/">
                        <strong>RUET CSE FAMILY</strong>
                    </NavbarBrand>
                    { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                    <Collapse isOpen = { this.state.collapse } navbar>
                        <NavbarNav right>
                          <NavItem >
                              <NavLink to="/">Home</NavLink>
                          </NavItem>
                        
                          <NavItem>
                        
                            <Dropdown>
                                <NavLink to=""><DropdownToggle nav caret color="danger" style={{padding:"0"}}>Contests</DropdownToggle></NavLink>
                                <DropdownMenu style={{minWidth:"250px"}}>
                                    <NavLink to="/" className="dropitem">Idea Contests</NavLink>
                                    <NavLink to="/" className="dropitem">Technical Photography Contests</NavLink>
                                    <NavLink to="/" className="dropitem">Graphics Designing Contests</NavLink>
                                    <NavLink to="/" className="dropitem">Drawing Contests</NavLink>
                                </DropdownMenu>
                            </Dropdown>
                          </NavItem>
                          <NavItem>
                              <NavLink to="/blog">Blog</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="/societies">Societies</NavLink>
                          </NavItem>
                          <NavItem>
                            <Dropdown>
                                <NavLink to=""><DropdownToggle nav caret color="danger" style={{padding:"0"}}>Galary</DropdownToggle></NavLink>
                                <DropdownMenu style={{minWidth:"250px"}} right>
                                    <NavLink to="/" className="dropitem">Photography Galary</NavLink>
                                    <NavLink to="/" className="dropitem">Graphics Design Galary</NavLink>
                                    <NavLink to="/" className="dropitem">Drawing Galary</NavLink>
                                </DropdownMenu>
                            </Dropdown>
                          </NavItem>
                          </NavbarNav>
                        <NavbarNav right>
                          <NavItem>
                              <NavLink to="/login">Login</NavLink>
                          </NavItem>
                        </NavbarNav>
                    </Collapse>
                    </div>
                </Navbar>
            </div>
        );
    }
}
export default Header;