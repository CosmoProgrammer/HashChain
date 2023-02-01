import React from 'react'
import { useParams } from 'react-router-dom'

function TreeRendererRenderer(props){
    let { id } = useParams()
    console.log(id)
    return(<></>)
}

export default TreeRendererRenderer