import React from "react";
import "./style.css";

export class Book extends React.Component{
    constructor(){
        super()
        console.log("Book constructor")
        this.state = {deleted: false}
    }

    componentDidMount(){
        console.log("Book did mount")
    }

    componentDidUpdate(){
        console.log("Book did update")
    }

    showBook(){
        alert(" Title: " + this.props.book.title + 
        "\n Author: " + this.props.book.author + 
        "\n Summary: " + this.props.book.summary)
    }

    handleOnSubmitEdit(event){
        event.preventDefault()
        alert("Book edited, please refresh")
        fetch(this.props.book._links.self.href,{
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.newTitle,
                author: this.state.newAuthor,
                summary: this.state.newSummary
            })
        })
        .then((response) => response.json)
        .catch((error) => console.log(error))
    }

    handleTitleChange(event){
        this.setState({newTitle: event.target.value})
    }

    handleAuthorChange(event){
        this.setState({newAuthor: event.target.value})
    }

    handleSummaryChange(event){
        this.setState({newSummary: event.target.value})
    }

    deleteBook(uri){
        console.log("DELETE" + uri)

        fetch(uri,{
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            headers:{
                'Accept': 'application/json'
            }
        })
        .then((response) => this.setState({deleted: true}))
        .catch((error) => console.log(error))
    }

    render(){
        console.log("render")
        let bookItem = ""
        if (!this.state.deleted){
            bookItem = 
            <li>
                <h3>{this.props.book.title}</h3>
                <br></br> 
                <button onClick={() => this.showBook(this.props.book._links.self.href)}>View Details</button>
                <button onClick={() => this.deleteBook(this.props.book._links.self.href)}>Delete</button>

                <h4>Edit This Book:</h4>
                <form onSubmit={(event) => this.handleOnSubmitEdit(event)}>
                    Book Title: <input type="text" name="newTitle" value={this.state.newTitle} onChange={(event) => this.handleTitleChange(event)}/>
                    Author: <input type="text" name="newAuthor" value={this.state.newAuthor} onChange={(event) => this.handleAuthorChange(event)}/>
                    Summary: <input type="text" name="newSummary" value={this.state.newSummary} onChange={(event) => this.handleSummaryChange(event)}/>
                    <input type="submit" value="save"/>
                </form>
                <hr></hr>
            </li>
        }

        return(
            bookItem
        );
    }
}