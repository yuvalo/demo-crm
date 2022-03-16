import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import axios from "axios";


const LatestNews = () => {

  const router = useRouter()
  const { company } = router.query


  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await axios.get('/api/news?company=' + company);
      console.log(data.data[0].articles)
      setNews(data.data[0].articles)
    }
    fetchNews()
  }, []);

  const renderedNews = news.map((article) => {
    return (
      <div key={article.url} className="card w-96 w-px-300 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            {article.title}
          </h2>
          <p className="text-amber-600">{article.description}</p>
          <a className="btn" href={article.url}>Contiue Reading...</a>
        </div>
      </div>

    )
  });

  return (<div>
    <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 mb-10" >Latest news on {company}</h1>
    <hr className="mb-10"></hr>
    <div className="flex flex-wrap gap-20">

      {renderedNews}
    </div>
  </div>

  )
}

export default LatestNews;