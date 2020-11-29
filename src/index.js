import * as $ from 'jquery'
import Post from '@models/Post'
import './styles/vars.sass'
import './styles/styles.css'
import json from './assets/json'
import logo from '@/assets/img/logo.svg'
import './babel'

const post = new Post('Webpack blabla', logo)

$('pre').addClass('code').html(post.toString())

console.log('JSON: ', json)