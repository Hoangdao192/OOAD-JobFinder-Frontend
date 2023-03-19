// @ts-nocheck
// // @ts-nocheck
// export function Home() {
//   return <div className="text-3xl underline">



//   </div>;
// }


import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Home.css'

import HomeHeader from '../components/layouts/header/Header'
import BackgroudLayout from '../components/layouts/background/Layout'

export function Home() {
  const [dataSearch, setDataSearch] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setDataSearch(data.filter(user => user.name.toLowerCase().includes(filter.toLowerCase())));
      });
  }, [filter]);

  const handleSearchChange = (e) => {
    setFilter(e.target.value)
  }

  const handleClickChooseSearch = (filter) => {
    toast(filter);
  }

  return (
    <div className='my-container'>
      <HomeHeader />

      <BackgroudLayout>
        <div className='w-4/5 text-Poppins my-container container mx-auto py-0 px-2 flex items-center'>
          <label className='my-child mt-48 text-4xl text-center block text-white'>1+ Job posted last week</label>

          <div className="relative">
            <div style={{ top: '66px', left: '32px' }} className="absolute">
              <div className='h-56 w-80 flex flex-col overflow-y-auto scrollbar-hide'>
                {filter && dataSearch.map(user => (
                  <div onClick={() => handleClickChooseSearch(user.name)} key={user.id} className='flex bg-white p-2 hover:bg-gray-200'>{user.name}</div>
                ))}
              </div>
            </div>

            <div className='flex my-child space-x-10 bg-home_search_transparent_purple pt-3 pb-3 pl-8 pr-8 text-Poppins mt-2 text-normal text-center'>
              <input
                type="text"
                value={filter}
                onChange={handleSearchChange}
                autoFocus
                placeholder='What are you looking for?'
                className="border w-80 h-11 border-slate-200 focus:outline-none p-1.5"
              />

              <select className='w-32 h-11 flex items-center justify-center'>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>

              <button className="p-4 h-11 flex items-center justify-center bg-background_color hover:bg-background_color_hover">
                Search
              </button>
            </div>
          </div>


        </div>
      </BackgroudLayout>
    </div>
  );
}

export default Home;
