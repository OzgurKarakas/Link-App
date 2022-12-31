import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    title: '',
    url: ''
  })

  const saveItem = () => {
    if (form.title === '' || form.url === '') {
      alert('Tüm alanları doldurunuz'); 
       return;
    }
    
    data.push({
      ...form
    });

    localStorage.setItem('data',JSON.stringify(data));
    
    setForm({
      title:'',
      url:''
    })

  };

  useEffect(()=>{
    getItem();
  },[]);

  const getItem = () => {
    const localData = localStorage.getItem('data') ?? [];
    setData(Array.isArray(localData) ? [] : JSON.parse(localData));
  };

  const removeItem = (item,index)=>{
    //const xData = data.findIndex((xItem)=>xItem.url == item.url);
    data.splice(index,1);
    localStorage.setItem('data', JSON.stringify(data));
    setData([...data]);
  };


  return (
    <div className="App">

      <div className='inputs'>
        <input onChange={(e) => setForm({ ...form, title: e.target.value })} value={form.title} className='input' placeholder='Bağlantı başlığı' />
        <input onChange={(e) => setForm({ ...form, url: e.target.value })} value={form.url} className='input' placeholder='Bağlantı adresi' />
        <button onClick={saveItem} className='button'>Ekle</button>
      </div>

      <div>
        {data.map((item,index) => (
          <div className='content-item'>
            <a target="_blank" href={item.url}>{item.title}</a>
            <button className='removeItem' onClick={()=> removeItem(item,index)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
