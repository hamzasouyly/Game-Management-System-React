import React from 'react'
import { Link } from "react-router-dom";
function Slider() {
  return (
    <div>
        {/* Main Sidebar Container */}
<aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <a href="index3.html" className="brand-link">
    <img src="https://upload.wikimedia.org/wikipedia/fr/3/3d/Dofus_Logo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">Metaverse</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src="https://img2.freepng.es/20190209/hxi/kisspng-logo-dofus-arena-aryane-index-of-uploadsdofusdwssummer-2-18-5c5f5e479cc713.4059915315497539276422.jpg" className="img-circle elevation-2" alt="User imagee" />
      </div>
      <div className="info">
        <a href="/" className="d-block">Admin</a>
      </div>
    </div>
    {/* SidebarSearch Form */}
    <div className="form-inline">
      <div className="input-group" data-widget="sidebar-search">
        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-sidebar">
            <i className="fas fa-search fa-fw" />
          </button>
        </div>
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
        <li className="nav-item menu-open">
          <a href="!#" className="nav-link active">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              Dashboard
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
            <Link to="/">
              <a href="!" className="nav-link">
                <span className='mr-3'>-</span>
                <p>Dashboard</p>
              </a>
            </Link>
            </li>
          </ul>
        </li>
        
        <li className="nav-item">
          <a href="!#" className="nav-link">
            <i className="nav-icon fas fa-chart-pie" />
            <p>
              NFT
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
            <Link to="classes">
            <a href="!" className="nav-link">
                <span className='mr-3'>-</span>
                <p>Classes</p>
              </a>
            </Link>
              
            </li>
            <li className="nav-item">
            <Link to="/CreateClass">
              <a href="!" className="nav-link">
                <span className='mr-3'>-</span>
                <p>Create Class</p>
              </a>
            </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a href="!#" className="nav-link">
            <i className="nav-icon fas fa-chart-pie" />
            <p>
              SPELLS
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
            <Link to="/spells">
            <a href="/spells" className="nav-link">
                <span className='mr-3'>-</span>
                <p>All Spells</p>
              </a>
            </Link>
              
            </li>
            <li className="nav-item">
            <Link to="/CreateSpell">
              <a href="/CreateSpell" className="nav-link">
                <span className='mr-3'>-</span>
                <p>Create Spell</p>
              </a>
            </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a href="!#" className="nav-link">
            <i className="nav-icon fas fa-chart-pie" />
            <p>
            SPECIALISATION
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
            <Link to="specialisations">
            <a href="!" className="nav-link">
                <span className='mr-3'>-</span>
                <p>All Specialisation</p>
              </a>
            </Link>
              
            </li>
            <li className="nav-item">
            <Link to="/CreateSpecialisation">
              <a href="!" className="nav-link">
                <span className='mr-3'>-</span>
                <p>Create Specialisation</p>
              </a>
            </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a href="!#" className="nav-link">
            <i className="nav-icon fas fa-chart-pie" />
            <p>
              ROLES
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
            <Link to="roles">
            <a href="!" className="nav-link">
                <span className='mr-3'>-</span>
                <p>All Roles</p>
              </a>
            </Link>
              
            </li>
            <li className="nav-item">
            <Link to="/CreateRole">
              <a href="!" className="nav-link">
                <span className='mr-3'>-</span>
                <p>Create Roles</p>
              </a>
            </Link>
            </li>
          </ul>
        </li>
    
        <li className="nav-header">EQUIPMENT</li>

         <li className="nav-item">
          <a href="!#" className="nav-link">
            <i className="nav-icon fas fa-chart-pie" />
            <p>
              SHIPS
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
            <Link to="classes">
            <a href="!" className="nav-link">
                <span className='mr-3'>-</span>
                <p>All Ships</p>
              </a>
            </Link>
              
            </li>
            <li className="nav-item">
            <Link to="/CreateClass">
              <a href="!" className="nav-link">
                <span className='mr-3'>-</span>
                <p>Create Ship</p>
              </a>
            </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a href="!#" className="nav-link">
            <i className="nav-icon fas fa-chart-pie" />
            <p>
              LANDS
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
            <Link to="classes">
            <a href="!" className="nav-link">
                <span className='mr-3'>-</span>
                <p>All Lands</p>
              </a>
            </Link>
              
            </li>
            <li className="nav-item">
            <Link to="/CreateClass">
              <a href="!" className="nav-link">
                <span className='mr-3'>-</span>
                <p>Create Land</p>
              </a>
            </Link>
            </li>
          </ul>
        </li>
        
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>

    </div>
  )
}

export default Slider