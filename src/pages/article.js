import React, {useEffect, useState} from "react";
import '../styles/article.css'
import '../fonts/BoosterNextFY-Bold.woff'
import Loader from '../assets/loader.svg'


function Article() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responce = await fetch('https://proovitoo.twn.ee/api/list/972d2b8a')
                if (!responce.ok) {
                    throw new Error('Midagi läks valesti')
                }
                const result = await responce.json()
                setData(result) 
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [])

    if (loading) return <div style={{height:"100vh"}}><img style={{width: "100%", height:"100px"}} src={Loader}/></div> 
    if (error) return <div style={{height:"100vh"}}><h1 style={{width: "100%", textAlign:"center", fontFamily:"BoosterNextFY, sans-serif", color:"white"}}>Midagi läks valesti...</h1></div>

    const paragraphs = data.body.split(/<\/p>/).map((paragraph, index) => (
        <p style={{margin: "40px 0px"}} key={index} dangerouslySetInnerHTML={{__html: paragraph + "</p>"}}/>
    ))


    return(
        <>
        {data &&
        <div className="article-content">
            <h1 className="article-h1">{data.title}</h1>

            <div className="article-intro" dangerouslySetInnerHTML={{__html: data.intro}}/>

            <div className="image-container">
                <div className="blurred-background" style={{ backgroundImage: `url(${data.image.large})`}}>

                </div>
                <img className="main-image" src={data.image.large} alt={data.image.alt}/>
                <div className="text-overlay">
                    <p className="overlay-text">{data.image.title}</p>
                </div>
            </div>

            <div className="article-p">
                {paragraphs}
            </div>

            <div className="tags">
                {data.tags.map((tag, index) => (
                    <span className="tag" key={index}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
        }
        </> 
    )
    
}

export default Article