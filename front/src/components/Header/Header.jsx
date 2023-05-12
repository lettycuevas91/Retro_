import React from 'react'
import './Header.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {
  return (
    <header>
      <h1> <i>RetroIO </i></h1>
      <div class="container">
      <div class="input-group rounded">
  <input type="search" class="form-control py-2 rounded-pill mr-1 pr-5" placeholder="filter your cards" aria-label="Search" aria-describedby="search-addon" />
</div>
  
    </div>
    </header>
  )
}

export default Header