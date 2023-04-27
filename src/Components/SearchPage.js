import {useState, useEffect} from 'react';
import axios from 'axios';

import classes from '../Styles/SearchPage.module.scss';

const baseUrl = 'http://localhost:4400/';

function SearchPage() {

    const [data, setData] = useState();
    const [type, setType] = useState();
    const [searchText, setSearchText] = useState();

    useEffect(()=>{
        axios.get(`${baseUrl}data`).then(response => {
            setData(response.data.ads);
            setType(response.data.type);
        })
    },[])

    useEffect(()=>{
        if(searchText ===undefined || searchText === '') {
            axios.get(`${baseUrl}data`).then(response => {
                setData(response.data.ads);
                setType(response.data.type);
            })
        } else {
            axios.get(`${baseUrl}search?text=${searchText}`).then(response => {
                setData(response.data.ads);
                setType(response.data.type);
            })
        }
    },[searchText])

    console.log(searchText);
    console.log(data);

    

  return (
    <div className={classes.SearchPage}>
      <nav>
        Deepak Saini
        <input 
        type='search' 
        placeholder='Search ads...'
        onChange={(e)=>{setSearchText(e.target.value)}}
        ></input>
      </nav>
      <section>
        {data && data.map(ads => {
            // ads.companyInfo[0] && console.log(ads.companyInfo[0].imageUrl);
            return <div>
                {ads.companyInfo[0] && <img 
                src={type ? ads.companyInfo[0].imageUrl : ads.imageUrl}></img>}
                <div>
                    <h2><a href={type? ads.companyUrl : ads.companyInfo[0].companyUrl} target='blank' title='Click to visit'>{type? ads.companyName:ads.companyInfo[0].companyName}</a></h2>
                    <p>{type ? ads.companyInfo[0] && ads.companyInfo[0].headline : ads.headline}</p>
                    <p>{type ? ads.companyInfo[0] && ads.companyInfo[0].primaryText : ads.primaryText}</p>
                    <p>{type ? ads.companyInfo[0] && ads.companyInfo[0].description:ads.description}</p>
                </div>
            </div>
        })}
        <main 
        style={data && data.length === 0 ?{'display':'block'} : {'display':'none'}}
        >No Ads Found</main>
      </section>
      <footer>
        Search ads Page
      </footer>
    </div>
  );
}

export default SearchPage;
