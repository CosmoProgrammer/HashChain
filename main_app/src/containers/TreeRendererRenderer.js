import React from 'react'
import { useParams } from 'react-router-dom'
import TreeRenderer from './TreeRenderer'

function TreeRendererRenderer(props){
    let { id } = useParams()
    console.log(id)
    return(<TreeRenderer id={id} />)
}

export default TreeRendererRenderer