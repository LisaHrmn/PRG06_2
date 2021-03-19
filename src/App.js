import React from "react";
import "./style.css";
import {Book} from "./Book"

const uri = "http://145.24.222.15:8000/api/books/"

export class App extends React.Component{
    constructor(){
        super()
        console.log("constructor")
        this.state = {books: {items: []}, title: "", author: "", summary: ""}
    }

    loadCollection(){
        fetch(uri,{
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers:{
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => { console.log(data); this.setState({books: data})})
        .catch((error) => console.log(error))
    }

    componentDidMount(){
        console.log("did mount")
        this.loadCollection();
    }

    componentDidUpdate(){
        console.log("did update")
    }

    handleOnTitleChange(event){
        this.setState({title: event.target.value})
    }

    handleOnAuthorChange(event){
        this.setState({author: event.target.value})
    }

    handleOnSummaryChange(event){
        this.setState({summary: event.target.value})
    }

    handleOnSubmit(event){
        event.preventDefault()
        alert("Book saved, please refresh")
        fetch(uri,{
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                author: this.state.author,
                summary: this.state.summary
            })
        })
        .then((response) => response.json)
        .catch((error) => console.log(error))

        this.setState({
            title: '',
            author: '',
            summary: ''
        });
    }

    render(){
        console.log("render")
        let books = this.state.books.items.map((book, i) => <Book key={i} book={book}/>)

        return(
            <div className="app">
                <h3>Submit a New Book</h3>
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    Book Title: <input type="text" onChange={(event) => this.handleOnTitleChange(event)}/>
                    Author: <input type="text" onChange={(event) => this.handleOnAuthorChange(event)}/>
                    Summary: <input type="text" onChange={(event) => this.handleOnSummaryChange(event)}/>
                    <input type="submit" value="save"/>
                </form>
                <h2>Books</h2>
                <ul>
                    {books}
                </ul>
            </div>
        );
    }
}