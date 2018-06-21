import React, { Component } from 'react';
import './Post.css';
import dummyData from '../../dummy-data';
import SearchContainer from '../SearchBar/SearchContainer';
import PostList from './PostList';
class PostPage extends Component {
    constructor() {
        super();
        this.state = {
            instaData: [],
            username: '',
        };
        this.searchPost = this.searchPost.bind(this);

    }


    componentDidMount() {
        this.setState({ instaData: dummyData });
    }

    changeComment = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }



    addComment = (e, index) => {
        const comment = e.target.value;
        if (comment === '') {
            return;
        }
        //If the state comment property does not exist then create a new one
        const state = Object.assign({}, this.state);

        if (state[`comment${index}`] === undefined) {
            state[`comment${index}`] = '';
        }

        const instaDataItem = Object.assign({}, this.state.instaData[index]); //
        instaDataItem.comments.push({ username: 'skid', text: comment });
        e.target.value = '';
        this.setState({ instaDataItem });
    }



    addLike = (e, index) => {

        const instaData = this.state.instaData.slice();

        if (e.target.classList.contains('heart--active')) {
            instaData[index].likes--;
            this.setState({ instaData });

            return;
        }
        instaData[index].likes++;
        this.setState({ instaData });
    }

    searchPost = (e) => {
        let instaData = dummyData.slice();
        console.log('search');
        instaData = instaData.filter(dataItem => {
            if (dataItem.username.indexOf(e.target.value) === 0) {
                return true;
            }
            return false;
        });
        this.setState({ instaData });
    }

    render() {
        return (
            <div className="App">
                <SearchContainer searchHandler={this.searchPost} />
                <PostList instaData={this.state.instaData}
                    changeCommentHandler={this.changeComment}
                    addCommentHandler={this.addComment}
                    addLikeHandler={this.addLike} />
            </div>
        );
    }
}


export default PostPage;