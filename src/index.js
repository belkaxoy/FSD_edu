import * as $ from 'jquery'
import Post from '@models/Post'
import './styles/styles.css'
import json from './assets/json'
import logo from '@/assets/img/logo.svg'

const post = new Post('Webpack blabla', logo)

$('pre').html(post.toString())

console.log('JSON: ', json)